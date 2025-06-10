import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity({ name: 'apartamento_metadata' })
export class ApartmentMetadataOrmEntity {
  @PrimaryColumn({ name: 'codigo_apartamento' })
  code: number;

  @Column({ name: 'descripcion' })
  description: string;

  @Column({ name: 'imagen_url' })
  imageUrl: string;
}
