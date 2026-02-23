import { IsIn, IsNumber, IsPositive } from 'class-validator';

export class BondInputDto {
  @IsNumber()
  @IsPositive()
  faceValue!: number;

  // Annual coupon rate as a percentage, e.g. 5 = 5%
  @IsNumber()
  @IsPositive()
  annualCouponRate!: number;

  @IsNumber()
  @IsPositive()
  marketPrice!: number;

  @IsNumber()
  @IsPositive()
  yearsToMaturity!: number;

  // 1 = annual, 2 = semi-annual
  @IsNumber()
  @IsIn([1, 2])
  couponFrequency!: number;
}

