import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ApartmentOrmEntity } from '../../infraestructure/db/apartment/apartment.ormEntity';
import { TariffOrmEntity } from 'src/infraestructure/db/tariff/tariff.ormEntity';

export const db1Config = (): TypeOrmModuleOptions => ({
  name: 'db1',
  type: 'mysql',
  host: process.env.DB1_HOST,
  port: Number(process.env.DB1_PORT),
  username: process.env.DB1_USER,
  password: process.env.DB1_PASS,
  database: process.env.DB1_NAME,
  entities: [ApartmentOrmEntity, TariffOrmEntity],
  synchronize: true,
});
