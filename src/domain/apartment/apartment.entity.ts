
  export class ApartmentEntity {
    constructor(
      public  id: number,
      public  name: string,
      public  direction: string,
      public  type: 'corporativo' | 'turistico',
      public  city: string,
      public  country: string,
      public  latitude: number,
      public  longitude: number,
      public  state: 'active' | 'inactive',
      
    ) {}
  }