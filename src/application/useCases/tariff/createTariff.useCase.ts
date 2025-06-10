import { BadRequestException, NotFoundException } from '@nestjs/common';

import { ITariffRepository } from 'src/domain/tariff/tariff.repository';
import { IApartmentRepository } from 'src/domain/apartment/apartment.repository';
import { Tariff } from 'src/domain/tariff/tariff.entity';
import { CreateTariffDto } from 'src/application/dto/tariff/createTariff.dto';

export class CreateTariffUseCase {
  constructor(
    private readonly tariffRepository: ITariffRepository,
    private readonly apartmentRepository: IApartmentRepository,
  ) {}

  async execute(dto: CreateTariffDto): Promise<Tariff> {
    const apartment = await this.apartmentRepository.findById(dto.apartmentId);
    console.log(apartment, 'MUESTRA SI EXISTE');
    if (!apartment) throw new NotFoundException('Apartment not found');

    if (
      (apartment.type === 'corporativo' && dto.unit !== 'mensual') ||
      (apartment.type === 'turistico' && dto.unit !== 'diaria')
    ) {
      throw new NotFoundException('Tariff unit does not match apartment type');
    }

    const tarifas = await this.tariffRepository.findByProperty(dto.apartmentId);
    const start = new Date(dto.dateStart);
    const end = new Date(dto.dateEnd);
    
    const overlaps = tarifas.some((t) => {
      const existingStart = new Date(t.dateStart);
      const existingEnd = new Date(t.dateEnd);
      return start <= existingEnd && end >= existingStart;
    });
    
    if (overlaps) {
      throw new BadRequestException('Date range overlaps with existing tariff');
    }
    
    const tariff = new Tariff(
      0,
      dto.apartmentId,
      start,
      end,
      dto.amount,
      dto.unit,
    );
    return await this.tariffRepository.create(tariff);
  }
}
