import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ApartmentOrmEntity } from '../../infraestructure/db/apartment/apartment.ormEntity';
import { TariffOrmEntity } from 'src/infraestructure/db/tariff/tariff.ormEntity';

export const db1Config: TypeOrmModuleOptions = {
  name: 'db1',
  type: 'mysql',
  host: 'sql10.freesqldatabase.com',
  port: 3306,
  username: 'sql10783732',
  password: 'GAP2YXrK1a',
  database: 'sql10783732',
  entities: [ApartmentOrmEntity, TariffOrmEntity],
  synchronize: true,
};
