import { NuevaOrden } from 'src/nueva-orden/nueva-orden.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('resultados')
export class ResultadosEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column()
  id_orden: number;

  @Column()
  id_analisis: number;

  @Column()
  resultados: string;

  @ManyToOne(() => NuevaOrden, (orden) => orden.resultados)
  @JoinColumn({ name: 'id_orden' })
  orden: NuevaOrden;
}
