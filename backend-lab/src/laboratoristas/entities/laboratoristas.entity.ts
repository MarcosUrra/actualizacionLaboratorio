import { Column } from 'typeorm/decorator/columns/Column';
import { PrimaryGeneratedColumn } from 'typeorm/decorator/columns/PrimaryGeneratedColumn';
import { Entity } from 'typeorm/decorator/entity/Entity';
import { IsNumber } from 'class-validator';

@Entity({ name: 'laboratoristas' })
export class LaboratoristasEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column({ type: 'boolean', default: true })
  estado: boolean;

  @Column({ type: 'varchar', length: 100, name: 'apellido', nullable: false })
  apellido: string;

  @Column({ type: 'varchar', length: 100, name: 'nombre', nullable: false })
  nombre: string;

  @Column({
    unique: true,
    type: 'varchar',
    length: 10,
    name: 'matricula',
    nullable: false,
  })
  matricula: string;

  @Column({
    type: 'varchar',
    length: 20,
    name: 'especialidad',
    nullable: false,
  })
  especialidad: string;

  @Column({
    type: 'varchar',
    length: 20,
    name: 'tipo de documento',
    nullable: true,
  })
  tipoDocumento: string;

  @Column({
    type: 'varchar',
    length: 20,
    name: 'numero de documento',
    nullable: true,
  })
  @IsNumber()
  numeroDocumento: string;

  @Column({ type: 'varchar', length: 30, name: 'telefono', nullable: true })
  @IsNumber()
  telefono: string;

  apellido_laboratorista: any;
  nombre_laboratorista: any;
  matricula_laboratorista: any;
  especialidad_laboratorista: any;
  tipoDocumento_laboratorista: any;
  numeroDocumento_laboratorista: any;
  telefono_laboratorista: any;
  ordenes: any;
}
