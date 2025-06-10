import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApartmentMetadataController } from './apartmentMetadata.controller';
import { ApartmentMetadataRepository } from './apartmentMetadata.repository.impl';
import { ApartmentMetadataOrmEntity } from './apartmentMetadata.ormEntity';
import { CreateApartmentMetadataUseCase } from 'src/application/useCases/apartmentMetadata/createApartmentMetadata.useCase';
import { UpdateApartmentMetadataUseCase } from 'src/application/useCases/apartmentMetadata/updateApartmentMetadata.useCase';
import { DeleteApartmentMetadataUseCase } from 'src/application/useCases/apartmentMetadata/deleteApartmentMetadata.useCase';
import { GetApartmentMetadataUseCase } from 'src/application/useCases/apartmentMetadata/getApartmentMetadata.useCase';

@Module({
  imports: [
    TypeOrmModule.forFeature([ApartmentMetadataOrmEntity], 'db2'),
  ],
  controllers: [ApartmentMetadataController],
  providers: [
    { provide: 'IPropertyMetadataRepository', useClass: ApartmentMetadataRepository },
    {
      provide: CreateApartmentMetadataUseCase,
      useFactory: (repo) => new CreateApartmentMetadataUseCase(repo),
      inject: ['IPropertyMetadataRepository'],
    },
    {
      provide: UpdateApartmentMetadataUseCase,
      useFactory: (repo) => new UpdateApartmentMetadataUseCase(repo),
      inject: ['IPropertyMetadataRepository'],
    },
    {
      provide: DeleteApartmentMetadataUseCase,
      useFactory: (repo) => new DeleteApartmentMetadataUseCase(repo),
      inject: ['IPropertyMetadataRepository'],
    },
    {
      provide: GetApartmentMetadataUseCase,
      useFactory: (repo) => new GetApartmentMetadataUseCase(repo),
      inject: ['IPropertyMetadataRepository'],
    },
  ],
  exports: [TypeOrmModule],
})
export class ApartmentMetadataModule { }
