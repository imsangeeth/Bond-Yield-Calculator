import { Body, Controller, Post } from '@nestjs/common';
import { BondService } from './bond.service';
import { BondInputDto } from './dto/bond-input.dto';
import { BondResult } from './interfaces/bond-result.interface';

@Controller('bond')
export class BondController {
  constructor(private readonly bondService: BondService) {}

  @Post('calculate')
  calculate(@Body() input: BondInputDto): BondResult {
    return this.bondService.calculate(input);
  }
}

