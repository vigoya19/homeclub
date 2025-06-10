import { Body, Controller, Post } from '@nestjs/common';
import { CreateTariffDto } from 'src/application/dto/tariff/createTariff.dto';
import { CreateTariffUseCase } from 'src/application/useCases/tariff/createTariff.useCase';


@Controller('tariffs')
export class TariffController {
  constructor(private readonly createTariffUseCase: CreateTariffUseCase) {}

  @Post()
  async create(@Body() dto: CreateTariffDto) {
    const tariff = await this.createTariffUseCase.execute(dto);
    return { success: true, data: tariff };
  }
}
