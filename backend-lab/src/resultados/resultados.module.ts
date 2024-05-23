import { Module } from '@nestjs/common';
import { ResultadosController } from './resultados.controller';
import { ResultadosService } from './resultados.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResultadosEntity } from './resultados.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ResultadosEntity])],
  controllers: [ResultadosController],
  providers: [ResultadosService],
})
export class ResultadosModule {}
