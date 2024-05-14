import { Module } from '@nestjs/common';
import { NuevaOrdenController } from './nueva-orden.controller';
import { NuevaOrdenService } from './nueva-orden.service';
import { NuevaOrden } from './nueva-orden.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PacientesEntity } from 'src/pacientes/entities/pacientes.entity';
import { MedicosEntity } from 'src/medicos/entities/medicos.entity';
import { AnalisisEntity } from 'src/analisis/entities/analisis.entity';
import { GruposAnalisisEntity } from 'src/grupos de analisis/entities/grupos_analisis.entity';
import { LaboratoristasEntity } from 'src/laboratoristas/entities/laboratoristas.entity';
import { ResultadosEntity } from 'src/resultados/resultados.entity';

@Module ({
  imports: [TypeOrmModule.forFeature([NuevaOrden,PacientesEntity,MedicosEntity,LaboratoristasEntity,AnalisisEntity,GruposAnalisisEntity,ResultadosEntity])],
  controllers: [NuevaOrdenController],
  providers: [NuevaOrdenService],
})
export class NuevaOrdenModule {}

