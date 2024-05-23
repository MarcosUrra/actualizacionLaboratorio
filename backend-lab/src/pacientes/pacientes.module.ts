import { PacientesService } from './pacientes.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PacientesController } from './pacientes.controller';
import { PacientesEntity } from './entities/pacientes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PacientesEntity])],
  controllers: [PacientesController],
  providers: [PacientesService],
})
export class PacientesModule {}
