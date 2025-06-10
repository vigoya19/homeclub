import { IApartmentRepository } from 'src/domain/apartment/apartment.repository';
import { ITariffRepository } from 'src/domain/tariff/tariff.repository';
import { IApartmentMetadataRepository } from 'src/domain/apartmentMetadata/apartmentMetadata.repository';
import { SearchApartmentsDto } from 'src/application/dto/apartment/searchApartments.dto';
import { ListedApartmentDto } from 'src/application/dto/apartment/listedApartment.dto';
import { ApartmentEntity } from 'src/domain/apartment/apartment.entity';
import { Tariff } from 'src/domain/tariff/tariff.entity';
import { ApartmentType } from 'src/domain/apartment/apartment.type';
import { haversine } from 'src/utils/location';



type ApartmentWithTariffAndDistance = {
  apartment: ApartmentEntity;
  tariff: Tariff;
  distance: number;
};

export class SearchApartmentsUseCase {
  constructor(
    private readonly apartmentRepo: IApartmentRepository,
    private readonly tariffRepo: ITariffRepository,
    private readonly metadataRepo: IApartmentMetadataRepository,
  ) {}

  async execute(dto: SearchApartmentsDto): Promise<{ data: ListedApartmentDto[], total: number }> {
    const today = new Date();

    let apartments = await this.apartmentRepo.findAllActive();
    console.log(apartments, "apartments");
    if (dto.type && dto.type.length > 0) {
      apartments = apartments.filter(ap => 
        dto.type!.includes(ap.type as ApartmentType)
      );
    }

    const apartmentIds = apartments.map(ap => ap.id);
    const tariffs = await this.tariffRepo.findCurrentByProperties(apartmentIds, today);
    console.log(tariffs, "tariffs")
    let joined = apartments
      .map(ap => {
        const tariff = tariffs.find(t => t.apartmentId === ap.id);
        return { apartment: ap, tariff };
      })
      .filter(
        (item): item is { apartment: ApartmentEntity; tariff: Tariff } =>
          !!item.tariff &&
          (dto.minPrice == null || item.tariff.amount >= dto.minPrice) &&
          (dto.maxPrice == null || item.tariff.amount <= dto.maxPrice)
      );

    const joinedWithDistance: ApartmentWithTariffAndDistance[] = joined.map(item => ({
      ...item,
      distance: haversine(
        dto.latitude,
        dto.longitude,
        item.apartment.latitude,
        item.apartment.longitude
      ),
    }));

    joinedWithDistance.sort((a, b) => a.distance - b.distance);

    const page = dto.page && dto.page > 0 ? dto.page : 1;
    const pageSize = dto.pageSize && dto.pageSize > 0 ? dto.pageSize : 10;
    const paginated = joinedWithDistance.slice((page - 1) * pageSize, page * pageSize);

    const codes = paginated.map(item => item.apartment.id);
    const allMetadata = await this.metadataRepo.findByCodes(codes);

    const data: ListedApartmentDto[] = paginated.map(item => {
      const metadata = allMetadata.find(m => m.code === item.apartment.id);
      return {
        code: item.apartment.id,
        name: item.apartment.name,
        latitude: item.apartment.latitude,
        longitude: item.apartment.longitude,
        currentRate: item.tariff.amount,
        type: item.apartment.type,
        description: metadata?.description ?? '',
        imageUrl: metadata?.imageUrl ?? '',
        distance: item.distance,
      };
    });

    return { data, total: joinedWithDistance.length };
  }
}
