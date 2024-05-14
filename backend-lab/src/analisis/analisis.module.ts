import { AnalisisService } from './analisis.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnalisisController } from './analisis.controller';
import { AnalisisEntity } from './entities/analisis.entity';
import { GruposAnalisisEntity } from 'src/grupos de analisis/entities/grupos_analisis.entity';

@Module({
    imports: [TypeOrmModule.forFeature([AnalisisEntity,GruposAnalisisEntity])],
    controllers: [AnalisisController],
    providers: [AnalisisService]
})
export class AnalisisModule {}
