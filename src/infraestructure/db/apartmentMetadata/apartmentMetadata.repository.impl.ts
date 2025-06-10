import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApartmentMetadata } from 'src/domain/apartmentMetadata/apartmentMetadata.entity';
import { IApartmentMetadataRepository } from 'src/domain/apartmentMetadata/apartmentMetadata.repository';
import { ApartmentMetadataOrmEntity } from './apartmentMetadata.ormEntity';
import { In } from 'typeorm';

@Injectable()
export class ApartmentMetadataRepository implements IApartmentMetadataRepository {
    constructor(
        @InjectRepository(ApartmentMetadataOrmEntity, 'db2')
        private readonly repo: Repository<ApartmentMetadataOrmEntity>,
    ) { }

    async create(metadata: ApartmentMetadata): Promise<ApartmentMetadata> {
        const orm = this.toOrmEntity(metadata);
        const saved = await this.repo.save(orm);
        return this.toDomainEntity(saved);
    }

    async findByCode(code: number): Promise<ApartmentMetadata | null> {
        const orm = await this.repo.findOne({ where: { code } });
        return orm ? this.toDomainEntity(orm) : null;
    }

    async findByCodes(codes: number[]): Promise<ApartmentMetadata[]> {
        if (codes.length === 0) return [];
        const rows = await this.repo.findBy({ code: In(codes) });
        return rows.map(this.toDomainEntity);
    }

    async update(metadata: ApartmentMetadata): Promise<ApartmentMetadata> {
        const orm = this.toOrmEntity(metadata);
        const saved = await this.repo.save(orm);
        return this.toDomainEntity(saved);
    }

    async delete(code: number): Promise<void> {
        await this.repo.delete({ code });
    }

    async findAll(): Promise<ApartmentMetadata[]> {
        const entities = await this.repo.find();
        return entities.map(this.toDomainEntity);
    }

    private toOrmEntity(entity: ApartmentMetadata): ApartmentMetadataOrmEntity {
        const orm = new ApartmentMetadataOrmEntity();
        orm.code = entity.code;
        orm.description = entity.description;
        orm.imageUrl = entity.imageUrl;
        return orm;
    }

    private toDomainEntity(orm: ApartmentMetadataOrmEntity): ApartmentMetadata {
        return new ApartmentMetadata(orm.code, orm.description, orm.imageUrl);
    }
}
