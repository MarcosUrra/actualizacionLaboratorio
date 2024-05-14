import { MedicosService } from './medicos.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicosController } from './medicos.controller';
import { MedicosEntity } from './entities/medicos.entity';

@Module({
    imports: [TypeOrmModule.forFeature([MedicosEntity])],
    controllers: [MedicosController],
    providers: [MedicosService]
})
export class MedicosModule { }