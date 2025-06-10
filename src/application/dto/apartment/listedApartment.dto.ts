export class ListedApartmentDto {
    code: number;
    name: string;
    latitude: number;
    longitude: number;
    currentRate: number;
    type: 'corporativo' | 'turistico';
    description: string;
    imageUrl: string;
    distance: number;
  }
  