"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BondService = void 0;
const common_1 = require("@nestjs/common");
let BondService = class BondService {
    calculate(input) {
        const { faceValue, annualCouponRate, marketPrice, yearsToMaturity, couponFrequency } = input;
        const periods = yearsToMaturity * couponFrequency;
        const couponPerPeriod = (faceValue * (annualCouponRate / 100)) / couponFrequency;
        const currentYield = this.calculateCurrentYield(faceValue, annualCouponRate, marketPrice);
        const yieldToMaturity = this.calculateYieldToMaturityBinarySearch(faceValue, couponPerPeriod, marketPrice, periods, couponFrequency);
        const totalInterestEarned = this.calculateTotalInterest(couponPerPeriod, periods);
        const premiumOrDiscount = this.classifyPremiumOrDiscount(faceValue, marketPrice);
        const cashFlowSchedule = this.buildCashFlowSchedule(faceValue, couponPerPeriod, periods, couponFrequency);
        return {
            currentYield,
            yieldToMaturity,
            totalInterestEarned,
            premiumOrDiscount,
            cashFlowSchedule
        };
    }
    calculateCurrentYield(faceValue, annualCouponRate, marketPrice) {
        const annualCoupon = (faceValue * annualCouponRate) / 100;
        return annualCoupon / marketPrice;
    }
    calculateTotalInterest(couponPerPeriod, periods) {
        return couponPerPeriod * periods;
    }
    classifyPremiumOrDiscount(faceValue, marketPrice) {
        if (marketPrice > faceValue) {
            return 'Premium';
        }
        if (marketPrice < faceValue) {
            return 'Discount';
        }
        return 'Par';
    }
    buildCashFlowSchedule(faceValue, couponPerPeriod, periods, couponFrequency) {
        const schedule = [];
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
    calculateYieldToMaturityBinarySearch(faceValue, couponPerPeriod, marketPrice, periods, couponFrequency) {
        const tolerance = 0.000001;
        const maxIterations = 10000;
        let low = 0;
        let high = 1;
        const priceForRate = (ratePerPeriod) => {
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
            if (priceAtMid > marketPrice) {
                low = mid;
            }
            else {
                high = mid;
            }
            iteration += 1;
        }
        const annualizedYtm = mid * couponFrequency;
        return annualizedYtm;
    }
    roundToTwoDecimals(value) {
        return Math.round(value * 100) / 100;
    }
};
exports.BondService = BondService;
exports.BondService = BondService = __decorate([
    (0, common_1.Injectable)()
], BondService);
//# sourceMappingURL=bond.service.js.map