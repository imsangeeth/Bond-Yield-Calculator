import { BondInputDto } from './dto/bond-input.dto';
import { BondResult } from './interfaces/bond-result.interface';
export declare class BondService {
    calculate(input: BondInputDto): BondResult;
    private calculateCurrentYield;
    private calculateTotalInterest;
    private classifyPremiumOrDiscount;
    private buildCashFlowSchedule;
    private calculateYieldToMaturityBinarySearch;
    private roundToTwoDecimals;
}
