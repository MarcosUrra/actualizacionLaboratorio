import { NuevaOrden } from 'src/nueva-orden/nueva-orden.entity';
import { obrasSocialesEntity } from 'src/obras-sociales/entities/obras-sociales.entity';
import { OneToMany } from 'typeorm';
import { Column } from 'typeorm/decorator/columns/Column';
import { PrimaryGeneratedColumn } from 'typeorm/decorator/columns/PrimaryGeneratedColumn';
import { Entity } from 'typeorm/decorator/entity/Entity';

@Entity('pacientes')
export class PacientesEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column({
    type: 'varchar',
    length: 30,
    name: 'TipoDocumento',
    nullable: false,
  })
  tipoDocumento: string;

  @Column({
    type: 'varchar',
    length: 20,
    name: 'NumeroDocumento',
    nullable: false,
    unique: true,
  })
  numeroDocumento: string;

  @Column({ type: 'varchar', length: 100, name: 'apellido', nullable: false })
  apellido: string;

  @Column({ type: 'varchar', length: 100, name: 'nombre', nullable: false })
  nombre: string;

  @Column({ type: 'varchar', name: 'fechaNacimiento', nullable: false })
  fechaNacimiento: string;

  @Column({ type: 'varchar', length: 20, name: 'sexo', nullable: false })
  sexo: string;

  @Column({ type: 'varchar', length: 150, name: 'direccion', nullable: false })
  direccion: string;

  @Column({ type: 'varchar', length: 150, name: 'localidad', nullable: false })
  localidad: string;

  @Column({ type: 'varchar', length: 100, name: 'provincia', nullable: false })
  provincia: string;

  @Column({ type: 'varchar', length: 30, name: 'telefono', nullable: false })
  telefono: string;

  @Column({ type: 'varchar', length: 100, name: 'e-mail', nullable: false })
  email: string;

  @OneToMany(() => NuevaOrden, (nuevaOrden) => nuevaOrden.paciente)
  ordenes: NuevaOrden[];

  @OneToMany(() => obrasSocialesEntity, (obraSocial) => obraSocial.paciente)
  obrasSociales: obrasSocialesEntity[];

  @Column({
    type: 'datetime',
    name: 'Fecha Alta Paciente',
    default: () => 'CURRENT_TIMESTAMP',
  })
  fechaAltaPaciente: Date;

  tipoDocumento_paciente: any;
  numeroDocumento_paciente: any;
  apellido_paciente: any;
  nombre_paciente: any;
  fechaNacimiento_paciente: any;
  edad_paciente: any;
  sexo_paciente: any;
  telefono_paciente: any;
  email_paciente: any;
  obraSocial: any;
}
