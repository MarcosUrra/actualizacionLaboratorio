import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GruposAnalisisEntity } from './entities/grupos_analisis.entity';
import { GruposAnalisisController } from './grupos_analisis.controller';
import { GruposAnalisisService } from './grupos_analisis.service';
import { AnalisisEntity } from 'src/analisis/entities/analisis.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GruposAnalisisEntity, AnalisisEntity])],
  controllers: [GruposAnalisisController],
  providers: [GruposAnalisisService],
})
export class GruposAnalisisModule {}
