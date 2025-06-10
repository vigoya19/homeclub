import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { db1Config } from './application/config/ormconfig-db1';
import { db2Config } from './application/config/ormconfig-db2';

import { ApartmentModule } from './infraestructure/db/apartment/apartment.module';
import { TariffModule } from './infraestructure/db/tariff/tariff.module';
import { ApartmentMetadataModule } from './infraestructure/db/apartmentMetadata/apartmentMetadata.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(db1Config),
    TypeOrmModule.forRoot(db2Config),
    ApartmentModule,
    TariffModule,
    ApartmentMetadataModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}