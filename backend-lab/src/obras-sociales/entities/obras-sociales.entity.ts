import { OneToMany } from 'typeorm';
import { Column } from 'typeorm/decorator/columns/Column';
import { PrimaryGeneratedColumn } from 'typeorm/decorator/columns/PrimaryGeneratedColumn';
import { Entity } from 'typeorm/decorator/entity/Entity';
import { IsNumber } from 'class-validator';
import { NuevaOrden } from 'src/nueva-orden/nueva-orden.entity';
import { PacientesEntity } from 'src/pacientes/entities/pacientes.entity';

@Entity('obra social')
export class obrasSocialesEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column({ type: 'boolean', default: true })
  estado: boolean;

  @Column({ type: 'varchar', length: 200, name: 'nombre', nullable: false })
  nombreObraSocial: string;

  @Column({ type: 'varchar', length: 200, name: 'CUIT', nullable: false })
  CUIT: string;

  @Column({ type: 'varchar', length: 200, name: 'direccion', nullable: false })
  direccion: string;

  @Column({ type: 'varchar', length: 200, name: 'telefono', nullable: false })
  @IsNumber()
  telefono: string;

  @Column({ type: 'varchar', length: 200, name: 'email', nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 200, name: 'web', nullable: false })
  web: string;

  @OneToMany(() => NuevaOrden, (nuevaOrden) => nuevaOrden.obraSocial)
  ordenes: NuevaOrden[];

  @OneToMany(() => PacientesEntity, (paciente) => paciente.obraSocial)
  pacientes: PacientesEntity[];
  paciente: any;
}
