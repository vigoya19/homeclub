import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ITariffRepository } from 'src/domain/tariff/tariff.repository';
import { Tariff } from 'src/domain/tariff/tariff.entity';
import { TariffOrmEntity } from './tariff.ormEntity';

@Injectable()
export class TariffRepository implements ITariffRepository {
  constructor(
    @InjectRepository(TariffOrmEntity, 'db1')
    private readonly repo: Repository<TariffOrmEntity>,
  ) {}
    findCurrentTariffByDate(apartmentId: number, date: Date): Promise<Tariff | null> {
        throw new Error('Method not implemented.');
    }

  async create(tariff: Tariff): Promise<Tariff> {
    const ormTariff = this.toOrmEntity(tariff);
    const saved = await this.repo.save(ormTariff);
    return this.toDomainEntity(saved);
  }

  async findById(id: number): Promise<Tariff | null> {
    const orm = await this.repo.findOne({ where: { id } });
    return orm ? this.toDomainEntity(orm) : null;
  }

  async update(tariff: Tariff): Promise<Tariff> {
    const ormTariff = this.toOrmEntity(tariff);
    const saved = await this.repo.save(ormTariff);
    return this.toDomainEntity(saved);
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }

  async findByProperty(propertyId: number): Promise<Tariff[]> {
    const ormTariffs = await this.repo.find({
      where: { apartment: { id: propertyId } },
      relations: ['apartment'], 
    });

    console.log('Tariffs:', ormTariffs);

    return ormTariffs.map(this.toDomainEntity);
  }


  async findCurrentByProperties(apartmentIds: number[], date: Date): Promise<Tariff[]> {
    if (apartmentIds.length === 0) return [];
    const ormTariffs = await this.repo.createQueryBuilder('tariff')
      .leftJoinAndSelect('tariff.apartment', 'apartment') 
      .where('apartment.id IN (:...apartmentIds)', { apartmentIds })
      .andWhere('tariff.dateStart <= :date', { date })
      .andWhere('tariff.dateEnd >= :date', { date })
      .getMany();
  
    return ormTariffs.map(this.toDomainEntity);
  }
  

  private toOrmEntity(entity: Tariff): TariffOrmEntity {
    const orm = new TariffOrmEntity();
    orm.id = entity.id;
    orm.apartment = { id: entity.apartmentId } as any;
    orm.dateStart = entity.dateStart;
    orm.dateEnd = entity.dateEnd;
    orm.amount = entity.amount;
    orm.unit = entity.unit;
    return orm;
  }

  private toDomainEntity = (orm: TariffOrmEntity): Tariff => {
    return new Tariff(
      orm.id,
      typeof orm.apartment === 'object' && orm.apartment
        ? orm.apartment.id
        : (orm as any).apartmentId ?? 0,
      orm.dateStart,
      orm.dateEnd,
      Number(orm.amount),
      orm.unit,
    );
  };
  
}
