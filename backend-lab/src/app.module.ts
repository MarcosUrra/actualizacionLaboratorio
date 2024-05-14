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

@Module({
  imports: [
     PacientesModule, AnalisisModule, MedicosModule, GruposAnalisisModule, UsuariosModule, NuevaOrdenModule,LaboratoristasModule,ResultadosModule, 
 
     TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'laboratoriohospital',
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      synchronize: true,
    }),
    ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

