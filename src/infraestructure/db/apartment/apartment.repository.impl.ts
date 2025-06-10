import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { ApartmentOrmEntity } from './apartment.ormEntity';
import { IApartmentRepository } from 'src/domain/apartment/apartment.repository';
import { ApartmentEntity } from 'src/domain/apartment/apartment.entity';

@Injectable()
export class ApartmentRepository implements IApartmentRepository {
    constructor(
        @InjectRepository(ApartmentOrmEntity, 'db1')
        private readonly repo: Repository<ApartmentOrmEntity>,
    ) { }

    async findAllActive(): Promise<ApartmentEntity[]> {
        const apartments = await this.repo.find({
            where: { state: 'active' }
        });
        return apartments.map(this.toDomainEntity);
    }

    async save(apartment: ApartmentEntity): Promise<ApartmentEntity> {
        const ormApartment = this.toOrmEntity(apartment);

        const saved = await this.repo.save(ormApartment);
        return this.toDomainEntity(saved);
    }

    async update(apartment: ApartmentEntity): Promise<ApartmentEntity> {
        const ormApartment = this.toOrmEntity(apartment);
        const saved = await this.repo.save(ormApartment);
        return this.toDomainEntity(saved);
    }


    async findById(id: number): Promise<ApartmentEntity | null> {
        const ormApartment = await this.repo.findOne({ where: { id } });
        return ormApartment ? this.toDomainEntity(ormApartment) : null;
    }

    private toOrmEntity(entity: ApartmentEntity): ApartmentOrmEntity {
        const orm = new ApartmentOrmEntity();
        orm.id = entity.id;
        orm.name = entity.name;
        orm.direction = entity.direction;
        orm.type = entity.type;
        orm.city = entity.city;
        orm.country = entity.country;
        orm.latitude = entity.latitude;
        orm.longitude = entity.longitude;
        orm.state = entity.state;
        return orm;
    }

    private toDomainEntity(orm: ApartmentOrmEntity): ApartmentEntity {
        return new ApartmentEntity(
            orm.id,
            orm.name,
            orm.direction,
            orm.type,
            orm.city,
            orm.country,
            Number(orm.latitude),
            Number(orm.longitude),
            orm.state,
        );
    }
}
