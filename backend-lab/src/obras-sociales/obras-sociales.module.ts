import { obrasSocialesService } from './obras-sociales.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { obrasSocialesController } from './obras-sociales.controller';
import { obrasSocialesEntity } from './entities/obras-sociales.entity';

@Module({
  imports: [TypeOrmModule.forFeature([obrasSocialesEntity])],
  controllers: [obrasSocialesController],
  providers: [obrasSocialesService],
})
export class obrasSocialesModule {}
