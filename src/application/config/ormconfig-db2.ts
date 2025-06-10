import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ApartmentMetadataOrmEntity } from 'src/infraestructure/db/apartmentMetadata/apartmentMetadata.ormEntity';

export const db2Config: TypeOrmModuleOptions = {
  name: 'db2',
  type: 'mysql',
  host: 'sql10.freesqldatabase.com',
  port: 3306,
  username: 'sql10783730',
  password: 'Pa3LSBSUms',
  database: 'sql10783730',
  entities: [ApartmentMetadataOrmEntity],
  synchronize: true,
};
