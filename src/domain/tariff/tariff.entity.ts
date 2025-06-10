export class Tariff {
    constructor(
      public readonly id: number,
      public readonly apartmentId: number,
      public readonly dateStart: Date,
      public readonly dateEnd: Date,
      public readonly amount: number,
      public readonly unit: 'mensual' | 'diaria',
    ) {}
  }
  