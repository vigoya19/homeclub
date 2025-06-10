import { Tariff } from "./tariff.entity";

export interface ITariffRepository {
    create(tarifa: Tariff): Promise<Tariff>;
    findById(id: number): Promise<Tariff | null>;
    update(Tariff: Tariff): Promise<Tariff>;
    delete(id: number): Promise<void>;
    findByProperty(propertyId: number): Promise<Tariff[]>;
    findCurrentTariffByDate(apartmentId: number, date: Date): Promise<Tariff | null>;
    findCurrentByProperties(apartmentIds: number[], date: Date): Promise<Tariff[]>

  }
  