import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ApartmentOrmEntity } from '../apartment/apartment.ormEntity';

@Entity({ name: 'tarifas' })
export class TariffOrmEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @ManyToOne(() => ApartmentOrmEntity, { nullable: false })
  @JoinColumn({ name: 'apartamento_id' })
  apartment: ApartmentOrmEntity;

  @Column({ name: 'fecha_inicio', type: 'date' })
  dateStart: Date;

  @Column({ name: 'fecha_fin', type: 'date' })
  dateEnd: Date;

  @Column({ name: 'monto', type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ name: 'unidad' })
  unit: 'mensual' | 'diaria';
}
