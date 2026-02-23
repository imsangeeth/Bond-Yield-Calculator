import { BondService } from './bond.service';
import { BondInputDto } from './dto/bond-input.dto';
import { BondResult } from './interfaces/bond-result.interface';
export declare class BondController {
    private readonly bondService;
    constructor(bondService: BondService);
    calculate(input: BondInputDto): BondResult;
}
