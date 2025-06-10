import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'apartamentos' })
export class ApartmentOrmEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'nombre' })
  name: string;

  @Column({ name: 'direccion' })
  direction: string;

  @Column({ name: 'tipo' })
  type: 'corporativo' | 'turistico';

  @Column({ name: 'ciudad' })
  city: string;

  @Column({ name: 'pais' })
  country: string;

  @Column({ name: 'latitud', type: 'decimal', precision: 10, scale: 6 })
  latitude: number;

  @Column({ name: 'longitud', type: 'decimal', precision: 10, scale: 6 })
  longitude: number;

  @Column({ name: 'estado' })
  state: 'active' | 'inactive';
}
