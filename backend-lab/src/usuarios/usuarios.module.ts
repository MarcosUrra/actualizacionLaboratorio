import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';


import { Module } from '@nestjs/common';
import { UsuariosEntity } from './entities/usuarios.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([UsuariosEntity])],
    controllers: [
        UsuariosController,],
    providers: [
        UsuariosService,],
})
export class UsuariosModule { }