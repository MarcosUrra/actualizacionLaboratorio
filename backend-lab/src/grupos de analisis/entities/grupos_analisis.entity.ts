import { JoinTable, ManyToMany } from 'typeorm';
import { Column } from 'typeorm/decorator/columns/Column';
import { PrimaryGeneratedColumn } from 'typeorm/decorator/columns/PrimaryGeneratedColumn';
import { Entity } from 'typeorm/decorator/entity/Entity';
import { AnalisisEntity } from 'src/analisis/entities/analisis.entity';
import { NuevaOrden } from 'src/nueva-orden/nueva-orden.entity';

@Entity('grupos_analisis')
export class GruposAnalisisEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
    name: 'NombreDelGrupo',
    nullable: false,
  })
  nombreDelGrupo: string;

  @Column({
    type: 'varchar',
    length: 50,
    name: 'NombreInforme',
    nullable: true,
    default: '',
  })
  nombreInforme: string;

  @ManyToMany(() => AnalisisEntity, (analisis) => analisis.grupos_analisis)
  @JoinTable({
    name: 'analisis_por_grupo',
    joinColumn: {
      name: 'grupo_analisis_id',
    },
    inverseJoinColumn: {
      name: 'analisis_id',
    },
  })
  listado_de_analisis: AnalisisEntity[];

  @ManyToMany(() => NuevaOrden, (nuevaOrden) => nuevaOrden.grupos_analisis)
  ordenes: NuevaOrden[];

  nombreDelGrupo_analisis: any;
  analisis_id: any;
  analisis_por_grupo: AnalisisEntity;
}
