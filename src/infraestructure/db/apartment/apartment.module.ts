import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApartmentOrmEntity } from './apartment.ormEntity';
import { ApartmentController } from './apartment.controller';
import { ApartmentRepository } from './apartment.repository.impl';
import { TariffRepository } from '../tariff/tariff.repository.impl';
import { ApartmentMetadataRepository } from '../apartmentMetadata/apartmentMetadata.repository.impl';
import { CreateApartmentUseCase } from 'src/application/useCases/apartment/createApartment.useCase';
import { SearchApartmentsUseCase } from 'src/application/useCases/apartment/searchApartments.useCase';
import { TariffOrmEntity } from '../tariff/tariff.ormEntity';
import { ApartmentMetadataOrmEntity } from '../apartmentMetadata/apartmentMetadata.ormEntity';
import { UpdateApartmentUseCase } from 'src/application/useCases/apartment/updateApartment.useCase';

@Module({
  imports: [
    TypeOrmModule.forFeature([ApartmentOrmEntity], 'db1'),
    TypeOrmModule.forFeature([TariffOrmEntity], 'db1'), 
    TypeOrmModule.forFeature([ApartmentMetadataOrmEntity], 'db2'), 
  ],
  providers: [
    {
      provide: 'IApartmentRepository',
      useClass: ApartmentRepository,
    },
    {
      provide: 'ITariffRepository',
      useClass: TariffRepository,
    },
    {
      provide: 'IApartmentMetadataRepository',
      useClass: ApartmentMetadataRepository,
    },
    {
      provide: CreateApartmentUseCase,
      useFactory: (apartmentRepo) => new CreateApartmentUseCase(apartmentRepo),
      inject: ['IApartmentRepository'],
    },
    {
      provide: SearchApartmentsUseCase,
      useFactory: (
        apartmentRepo,
        tariffRepo,
        metadataRepo
      ) => new SearchApartmentsUseCase(apartmentRepo, tariffRepo, metadataRepo),
      inject: ['IApartmentRepository', 'ITariffRepository', 'IApartmentMetadataRepository'],
    },
    {
      provide: UpdateApartmentUseCase,
      useFactory: (apartmentRepo) => new UpdateApartmentUseCase(apartmentRepo),
      inject: ['IApartmentRepository'],
    },
  ],
  controllers: [ApartmentController],
  exports: [TypeOrmModule],
})
export class ApartmentModule {}
