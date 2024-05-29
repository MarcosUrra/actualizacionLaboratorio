// import { GruposAnalisisEntity } from 'src/grupos de analisis/entities/grupos_analisis.entity';
// import { NuevaOrden } from 'src/nueva-orden/nueva-orden.entity';
// import { ManyToMany, OneToMany } from 'typeorm';
// import { Column } from 'typeorm/decorator/columns/Column';
// import { PrimaryGeneratedColumn } from 'typeorm/decorator/columns/PrimaryGeneratedColumn';
// import { Entity } from 'typeorm/decorator/entity/Entity';
// import { SubcategoriaEntity } from './SubcategoriaEntity';

// @Entity('analisis')
// export class AnalisisEntity {
//   @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
//   id: number;

//   @Column({ type: 'varchar', length: 50, name: 'codigo', nullable: false })
//   codigo: string;

//   @Column({ type: 'varchar', length: 200, name: 'nombre', nullable: false })
//   nombre: string;

//   @Column({ type: 'varchar', length: 200, name: 'valores', nullable: true })
//   valores: string;

//   @Column({ type: 'varchar', length: 200, name: 'unidades', nullable: true })
//   unidades: string;

//   @ManyToMany(
//     () => GruposAnalisisEntity,
//     (gruposanalisis) => gruposanalisis.listado_de_analisis,
//   )
//   grupos_analisis: GruposAnalisisEntity[];

//   @ManyToMany(() => NuevaOrden, (nuevaOrden) => nuevaOrden.analisis)
//   ordenes: NuevaOrden[];

//   // Relación con subcategorías
//   @OneToMany(() => SubcategoriaEntity, (subcategoria) => subcategoria.analisis)
//   subcategorias: SubcategoriaEntity[];
// }

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { GruposAnalisisEntity } from 'src/grupos de analisis/entities/grupos_analisis.entity';
import { NuevaOrden } from 'src/nueva-orden/nueva-orden.entity';
import { SubcategoriaEntity } from './SubcategoriaEntity';
import { ResultadosEntity } from 'src/resultados/resultados.entity';

@Entity('analisis')
export class AnalisisEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column({ type: 'varchar', length: 50, name: 'codigo', nullable: false })
  codigo: string;

  @Column({ type: 'varchar', length: 200, name: 'nombre', nullable: false })
  nombre: string;

  @Column({ type: 'varchar', length: 200, name: 'valores', nullable: true })
  valores: string;

  @Column({ type: 'varchar', length: 200, name: 'unidades', nullable: true })
  unidades: string;

  @Column()
  id_orden: number;

  

  @ManyToMany(
    () => GruposAnalisisEntity,
    (gruposanalisis) => gruposanalisis.listado_de_analisis,
  )
  grupos_analisis: GruposAnalisisEntity[];

  @ManyToMany(() => NuevaOrden, (nuevaOrden) => nuevaOrden.analisis)
  ordenes: NuevaOrden[];

  @OneToMany(() => SubcategoriaEntity, (subcategoria) => subcategoria.analisis)
  subcategorias: SubcategoriaEntity[];

  // @OneToMany(() => ResultadosEntity, (resultado) => resultado.analisis)
  // resultados: ResultadosEntity[];
}
