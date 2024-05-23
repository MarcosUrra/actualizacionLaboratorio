import { Column } from 'typeorm/decorator/columns/Column';
import { PrimaryGeneratedColumn } from 'typeorm/decorator/columns/PrimaryGeneratedColumn';
import { Entity } from 'typeorm/decorator/entity/Entity';

@Entity('usuarios')
export class UsuariosEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column({ type: 'boolean', default: true })
  estado: boolean;

  @Column({ type: 'varchar', length: 100, name: 'apellido', nullable: false })
  apellido: string;

  @Column({ type: 'varchar', length: 100, name: 'nombre', nullable: false })
  nombre: string;

  @Column({ type: 'varchar', length: 30, name: 'usuario' })
  username: string;

  @Column({ type: 'varchar', length: 100, name: 'contraseña', nullable: false })
  password: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ nullable: false })
  role: string;
}
