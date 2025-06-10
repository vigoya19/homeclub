
import { IApartmentRepository } from 'src/domain/apartment/apartment.repository';
import { ApartmentEntity } from 'src/domain/apartment/apartment.entity';
import { UpdateApartmentDto } from 'src/application/dto/apartment/updateApartment.dto';
import { NotFoundException } from '@nestjs/common';

export class UpdateApartmentUseCase {
  constructor(private readonly apartmentRepository: IApartmentRepository) {}

  async execute(id: number, dto: UpdateApartmentDto): Promise<ApartmentEntity> {
    const apartment = await this.apartmentRepository.findById(id);
    if (!apartment) {
      throw new NotFoundException('Apartment not found');
    }

    if (dto.name !== undefined) apartment.name = dto.name;
    if (dto.direction !== undefined) apartment.direction = dto.direction;
    if (dto.type !== undefined) apartment.type = dto.type;
    if (dto.city !== undefined) apartment.city = dto.city;
    if (dto.country !== undefined) apartment.country = dto.country;
    if (dto.latitude !== undefined) apartment.latitude = dto.latitude;
    if (dto.longitude !== undefined) apartment.longitude = dto.longitude;
    if (dto.state !== undefined) apartment.state = dto.state;

    return await this.apartmentRepository.save(apartment);
  }
}

