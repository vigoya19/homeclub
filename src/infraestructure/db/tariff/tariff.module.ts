import { Module } from '@nestjs/common';
import { TariffRepository } from './tariff.repository.impl';
import { ITariffRepository } from 'src/domain/tariff/tariff.repository';
import { ApartmentRepository } from '../apartment/apartment.repository.impl';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TariffOrmEntity } from './tariff.ormEntity';
import { ApartmentOrmEntity } from '../apartment/apartment.ormEntity';
import { TariffController } from './tariff.controller';
import { CreateTariffUseCase } from 'src/application/useCases/tariff/createTariff.useCase';

@Module({
  imports: [
    TypeOrmModule.forFeature([TariffOrmEntity], 'db1'),
    TypeOrmModule.forFeature([ApartmentOrmEntity], 'db1'),
  ],
  controllers: [TariffController],
  providers: [
    { provide: 'ITariffRepository', useClass: TariffRepository },
    { provide: 'IApartmentRepository', useClass: ApartmentRepository },
    {
      provide: CreateTariffUseCase,
      useFactory: (tariffRepo, apartmentRepo) =>
        new CreateTariffUseCase(tariffRepo, apartmentRepo),
      inject: ['ITariffRepository', 'IApartmentRepository'],
    },
  ],
  exports: [TypeOrmModule],
})
export class TariffModule {}
