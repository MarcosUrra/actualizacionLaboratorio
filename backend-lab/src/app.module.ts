import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { PacientesModule } from './pacientes/pacientes.module';
import { MedicosModule } from './medicos/medicos.module';
import { AnalisisModule } from './analisis/analisis.module';
import { GruposAnalisisModule } from './grupos de analisis/grupos_analisis.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { NuevaOrdenModule } from './nueva-orden/nueva-orden.module';
import { LaboratoristasModule } from './laboratoristas/laboratoristas.module';
import { ResultadosModule } from './resultados/resultados.module';
import { SolicitadoPorModule } from './solicitado-por/solicitado-por.module';
import { SubcategoriaEntity } from './analisis/entities/SubcategoriaEntity';

@Module({
  imports: [
    PacientesModule,
    AnalisisModule,
    MedicosModule,
    GruposAnalisisModule,
    UsuariosModule,
    NuevaOrdenModule,
    LaboratoristasModule,
    ResultadosModule,
    SolicitadoPorModule,

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'LOCALHOST',
      port: 3306,
      username: 'root',
      password: '',
      database: 'laboratoriohospital',
      entities: [SubcategoriaEntity, join(__dirname, '**', '*.entity.{ts,js}')],
      synchronize: true,
    }),
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
