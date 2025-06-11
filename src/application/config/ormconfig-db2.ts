import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ApartmentMetadataOrmEntity } from 'src/infraestructure/db/apartmentMetadata/apartmentMetadata.ormEntity';

export const db2Config = (): TypeOrmModuleOptions => ({
  name: 'db2',
  type: 'mysql',
  host:process.env.DB2_HOST,
  port: Number(process.env.DB2_PORT),
  username: process.env.DB2_USER,
  password: process.env.DB2_PASS,
  database: process.env.DB2_NAME,
  entities: [ApartmentMetadataOrmEntity],
  synchronize: true,
});
