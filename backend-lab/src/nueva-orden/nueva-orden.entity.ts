import { AnalisisEntity } from 'src/analisis/entities/analisis.entity';
import { GruposAnalisisEntity } from 'src/grupos de analisis/entities/grupos_analisis.entity';
import { LaboratoristasEntity } from 'src/laboratoristas/entities/laboratoristas.entity';
import { MedicosEntity } from 'src/medicos/entities/medicos.entity';
import { PacientesEntity } from 'src/pacientes/entities/pacientes.entity';
import { ResultadosEntity } from 'src/resultados/resultados.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('ordenes_de_trabajo')
export class NuevaOrden {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;
  @Column({ type: 'bool', name: 'impresa', default: false })
  impresa: boolean;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  fecha: Date;

  @Column()
  numeroOrdenDiario: string;

  @Column()
  numeroHistoriaClinica: string;

  @Column()
  obraSocial: string;

  @ManyToOne(() => PacientesEntity, (paciente) => paciente.ordenes, {
    cascade: true,
  })
  @JoinColumn({ name: 'paciente_id' })
  paciente: PacientesEntity;

  @ManyToOne(() => MedicosEntity, (medicos) => medicos.ordenes, {
    cascade: true,
  })
  @JoinColumn({ name: 'medicos_id' })
  medicos: MedicosEntity;

  @ManyToOne(
    () => LaboratoristasEntity,
    (laboratorista) => laboratorista.ordenes,
    { cascade: true },
  )
  @JoinColumn({ name: 'laboratorista_id' })
  laboratorista: LaboratoristasEntity;

  @Column()
  solicitadoPor: string;

  @ManyToMany(() => AnalisisEntity, { cascade: true })
  @JoinTable({
    name: 'orden_analisis',
    joinColumn: { name: 'orden_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'analisis_id', referencedColumnName: 'id' },
  })
  analisis: AnalisisEntity[];

  @ManyToMany(() => GruposAnalisisEntity, { cascade: true })
  @JoinTable({
    name: 'orden_grupo_analisis',
    joinColumn: { name: 'orden_id', referencedColumnName: 'id' },
    inverseJoinColumn: {
      name: 'grupo_analisis_id',
      referencedColumnName: 'id',
    },
  })
  grupos_analisis: GruposAnalisisEntity[];

  @OneToMany(() => ResultadosEntity, (resultados) => resultados.orden)
  resultados: ResultadosEntity[];

  @Column()
  observaciones: string;

  @Column()
  observacionesInternas: string;

  pacienteId: any;
  medicosId: any;
  laboratoristaId: any;
  analisisIds: any;
  grupo_analisisIds: any;

  constructor() {}
}
