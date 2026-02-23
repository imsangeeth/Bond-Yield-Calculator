export type PremiumOrDiscount = 'Premium' | 'Discount' | 'Par';

export interface BondInput {
  faceValue: number;
  annualCouponRate: number;
  marketPrice: number;
  yearsToMaturity: number;
  couponFrequency: 1 | 2;
}

export interface CashFlowItem {
  period: number;
  paymentDate: string;
  couponPayment: number;
  cumulativeInterest: number;
  remainingPrincipal: number;
}

export interface BondResult {
  currentYield: number;
  yieldToMaturity: number;
  totalInterestEarned: number;
  premiumOrDiscount: PremiumOrDiscount;
  cashFlowSchedule: CashFlowItem[];
}

