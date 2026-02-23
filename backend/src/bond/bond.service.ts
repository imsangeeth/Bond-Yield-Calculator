import { Injectable } from '@nestjs/common';
import { BondInputDto } from './dto/bond-input.dto';
import { BondResult, CashFlowItem, PremiumOrDiscount } from './interfaces/bond-result.interface';

@Injectable()
export class BondService {
  calculate(input: BondInputDto): BondResult {
    const {
      faceValue,
      annualCouponRate,
      marketPrice,
      yearsToMaturity,
      couponFrequency
    } = input;

    const periods = yearsToMaturity * couponFrequency;
    const couponPerPeriod = (faceValue * (annualCouponRate / 100)) / couponFrequency;

    const currentYield = this.calculateCurrentYield(faceValue, annualCouponRate, marketPrice);
    const yieldToMaturity = this.calculateYieldToMaturityBinarySearch(
      faceValue,
      couponPerPeriod,
      marketPrice,
      periods,
      couponFrequency
    );
    const totalInterestEarned = this.calculateTotalInterest(couponPerPeriod, periods);
    const premiumOrDiscount = this.classifyPremiumOrDiscount(faceValue, marketPrice);
    const cashFlowSchedule = this.buildCashFlowSchedule(
      faceValue,
      couponPerPeriod,
      periods,
      couponFrequency
    );

    return {
      currentYield,
      yieldToMaturity,
      totalInterestEarned,
      premiumOrDiscount,
      cashFlowSchedule
    };
  }

  private calculateCurrentYield(
    faceValue: number,
    annualCouponRate: number,
    marketPrice: number
  ): number {
    const annualCoupon = (faceValue * annualCouponRate) / 100;
    return annualCoupon / marketPrice;
  }

  private calculateTotalInterest(couponPerPeriod: number, periods: number): number {
    return couponPerPeriod * periods;
  }

  private classifyPremiumOrDiscount(faceValue: number, marketPrice: number): PremiumOrDiscount {
    if (marketPrice > faceValue) {
      return 'Premium';
    }

    if (marketPrice < faceValue) {
      return 'Discount';
    }

    return 'Par';
  }

  private buildCashFlowSchedule(
    faceValue: number,
    couponPerPeriod: number,
    periods: number,
    couponFrequency: number
  ): CashFlowItem[] {
    const schedule: CashFlowItem[] = [];
    const now = new Date();
    const monthsPerPeriod = 12 / couponFrequency;

    let cumulativeInterest = 0;

    for (let period = 1; period <= periods; period += 1) {
      cumulativeInterest += couponPerPeriod;
      const paymentDate = new Date(now);
      paymentDate.setMonth(paymentDate.getMonth() + period * monthsPerPeriod);

      const isFinalPeriod = period === periods;
      const remainingPrincipal = isFinalPeriod ? 0 : faceValue;

      schedule.push({
        period,
        paymentDate: paymentDate.toISOString(),
        couponPayment: this.roundToTwoDecimals(couponPerPeriod),
        cumulativeInterest: this.roundToTwoDecimals(cumulativeInterest),
        remainingPrincipal: this.roundToTwoDecimals(remainingPrincipal)
      });
    }

    return schedule;
  }

  // Binary search is appropriate here because the bond pricing function is
  // monotonically decreasing in the discount rate r: as r increases, the
  // present value of future cash flows strictly decreases. This guarantees
  // a single root (solution) within a reasonable range, so bisection will
  // deterministically converge to the YTM within the tolerance.
  private calculateYieldToMaturityBinarySearch(
    faceValue: number,
    couponPerPeriod: number,
    marketPrice: number,
    periods: number,
    couponFrequency: number
  ): number {
    const tolerance = 0.000001;
    const maxIterations = 10_000;

    // Work in periodic rate space, then convert back to annualized YTM.
    let low = 0;
    let high = 1; // 100% periodic rate upper bound is safely above normal markets

    const priceForRate = (ratePerPeriod: number): number => {
      let price = 0;
      for (let t = 1; t <= periods; t += 1) {
        const discountFactor = (1 + ratePerPeriod) ** t;
        price += couponPerPeriod / discountFactor;
      }
      price += faceValue / (1 + ratePerPeriod) ** periods;
      return price;
    };

    let iteration = 0;
    let mid = 0;

    while (iteration < maxIterations) {
      mid = (low + high) / 2;
      const priceAtMid = priceForRate(mid);
      const difference = priceAtMid - marketPrice;

      if (Math.abs(difference) < tolerance) {
        break;
      }

      // If price at mid is too high, the rate is too low: move low bound up.
      if (priceAtMid > marketPrice) {
        low = mid;
      } else {
        high = mid;
      }

      iteration += 1;
    }

    const annualizedYtm = mid * couponFrequency;
    return annualizedYtm;
  }

  private roundToTwoDecimals(value: number): number {
    return Math.round(value * 100) / 100;
  }
}

