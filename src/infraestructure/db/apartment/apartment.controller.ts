import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateApartmentDto } from 'src/application/dto/apartment/createApartment.dto';
import { SearchApartmentsDto } from 'src/application/dto/apartment/searchApartments.dto';
import { UpdateApartmentDto } from 'src/application/dto/apartment/updateApartment.dto';
import { CreateApartmentUseCase } from 'src/application/useCases/apartment/createApartment.useCase';
import { SearchApartmentsUseCase } from 'src/application/useCases/apartment/searchApartments.useCase';
import { UpdateApartmentUseCase } from 'src/application/useCases/apartment/updateApartment.useCase';


@Controller('apartments')
export class ApartmentController {
  constructor(private readonly createApartmentUseCase: CreateApartmentUseCase,
              private readonly searchApartmentsUseCase: SearchApartmentsUseCase,
              private readonly updateApartmentUseCase: UpdateApartmentUseCase
  ) {}

  @Post()
  async create(@Body() dto: CreateApartmentDto) {
    const apartment = await this.createApartmentUseCase.execute(dto);
    return {
      success: true,
      data: apartment,
    };
  }

  @Get('search')
  async search(@Query() query: SearchApartmentsDto) {
    console.log(query, "Query");
    const result = await this.searchApartmentsUseCase.execute(query);
    return {
      success: true,
      ...result,
    };
  }
  
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateApartmentDto,
  ) {
    const updated = await this.updateApartmentUseCase.execute(+id, dto);
    return { success: true, data: updated };
  }
  



}


