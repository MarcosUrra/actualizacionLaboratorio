import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { AnalisisEntity } from './analisis.entity';

@Entity('subcategorias')
export class SubcategoriaEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  // @Column({ type: 'varchar', length: 50, name: 'codigo', nullable: false })
  // codigo: string;

  @Column({ type: 'varchar', length: 200, name: 'nombre', nullable: false })
  nombre: string;

  @Column({ type: 'varchar', length: 200, name: 'valores', nullable: false })
  valores: string;

  @Column({ type: 'varchar', length: 200, name: 'unidades', nullable: false })
  unidades: string;

  @Column()
  id_orden: number;

  // Relación con analisis
  @ManyToOne(() => AnalisisEntity, (analisis) => analisis.subcategorias)
  analisis: AnalisisEntity;
}
