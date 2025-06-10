export enum ApartmentType {
  CORPORATIVO = 'corporativo',
  TURISTICO = 'turistico'
}

export type ApartmentStatus = 'active' | 'inactive';

export interface CreateApartmentInput {
    name: string;
    address: string;
    city: string;
    country: string;
    latitude: number;
    longitude: number;
    type: ApartmentType;
  }