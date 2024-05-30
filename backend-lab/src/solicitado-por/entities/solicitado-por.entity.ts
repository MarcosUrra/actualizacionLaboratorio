import { OneToMany } from 'typeorm';
import { Column } from 'typeorm/decorator/columns/Column';
import { PrimaryGeneratedColumn } from 'typeorm/decorator/columns/PrimaryGeneratedColumn';
import { Entity } from 'typeorm/decorator/entity/Entity';
import { IsNumber } from 'class-validator';
import { NuevaOrden } from 'src/nueva-orden/nueva-orden.entity';

@Entity('solicitado por')
export class SolicitadoPorEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column({ type: 'boolean', default: true })
  estado: boolean;

  @Column({ type: 'varchar', length: 200, name: 'nombre', nullable: false })
  nombreSolicitadoPor: string;

  @Column({ type: 'varchar', length: 200, name: 'direccion', nullable: false })
  direccion: string;

  @Column({ type: 'varchar', length: 200, name: 'provincia', nullable: false })
  provincia: string;

  @Column({ type: 'varchar', length: 200, name: 'ciudad', nullable: false })
  ciudad: string;

  @Column({ type: 'varchar', length: 200, name: 'email', nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 200, name: 'telefono', nullable: false })
  @IsNumber()
  telefono: string;

  @OneToMany(() => NuevaOrden, (nuevaOrden) => nuevaOrden.solicitadoPor)
  ordenes: NuevaOrden[];
}
