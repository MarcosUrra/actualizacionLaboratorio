import { LaboratoristasService } from './laboratoristas.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LaboratoristasController } from './laboratoristas.controller';
import { LaboratoristasEntity } from './entities/laboratoristas.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LaboratoristasEntity])],
  controllers: [LaboratoristasController],
  providers: [LaboratoristasService],
})
export class LaboratoristasModule {}
