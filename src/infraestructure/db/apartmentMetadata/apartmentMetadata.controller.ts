import { Body, Controller, Post, Put, Get, Param, Delete } from '@nestjs/common';
import { CreateApartmentMetadataDto } from 'src/application/dto/apartmentMetadata/createApartmentMetadata.dto';
import { DeleteApartmentMetadataDto } from 'src/application/dto/apartmentMetadata/deleteApartmentMetadata.dto';
import { FindByCodigoApartmentMetadataDto } from 'src/application/dto/apartmentMetadata/findByCodigoApartmentMetadata.dto';
import { UpdateApartmentMetadataDto } from 'src/application/dto/apartmentMetadata/updateApartmentMetadata.dto';
import { CreateApartmentMetadataUseCase } from 'src/application/useCases/apartmentMetadata/createApartmentMetadata.useCase';
import { DeleteApartmentMetadataUseCase } from 'src/application/useCases/apartmentMetadata/deleteApartmentMetadata.useCase';
import { GetApartmentMetadataUseCase } from 'src/application/useCases/apartmentMetadata/getApartmentMetadata.useCase';
import { UpdateApartmentMetadataUseCase } from 'src/application/useCases/apartmentMetadata/updateApartmentMetadata.useCase';


@Controller('apartment-metadata')
export class ApartmentMetadataController {
    constructor(
        private readonly createUseCase: CreateApartmentMetadataUseCase,
        private readonly updateUseCase: UpdateApartmentMetadataUseCase,
        private readonly deleteUseCase: DeleteApartmentMetadataUseCase,
        private readonly getUseCase: GetApartmentMetadataUseCase,
    ) { }

    @Post()
    async create(@Body() dto: CreateApartmentMetadataDto) {
        console.log(dto, "dto");

        const metadata = await this.createUseCase.execute(dto);
        console.log(metadata, "metadata");

        return { success: true, data: metadata };
    }

    @Put(':code')
    async update(@Param('code') code: number, @Body() dto: UpdateApartmentMetadataDto) {
        dto.code = +code;
        console.log(dto, "dto");
        const updated = await this.updateUseCase.execute(dto);
        return { success: true, data: updated };
    }

    @Delete(':code')
    async delete(@Param() params: DeleteApartmentMetadataDto) {
        await this.deleteUseCase.execute(params.code);
        return { success: true };
    }

    @Get(':code')
    async get(@Param() params: FindByCodigoApartmentMetadataDto) {
        const metadata = await this.getUseCase.execute(params.code);
        return { success: true, data: metadata };
    }
}
