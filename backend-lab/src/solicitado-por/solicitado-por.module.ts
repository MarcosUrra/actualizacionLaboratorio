import { Module } from '@nestjs/common';
import { SolicitadoPorService } from './solicitado-por.service';
import { SolicitadoPorController } from './solicitado-por.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SolicitadoPorEntity } from './entities/solicitado-por.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SolicitadoPorEntity])],
  controllers: [SolicitadoPorController],
  providers: [SolicitadoPorService]
})
export class SolicitadoPorModule {}
