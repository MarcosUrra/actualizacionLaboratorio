import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { UsuariosEntity } from './entities/usuarios.entity';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { LoginDto } from './dto/LoginDto.dto';

@Controller('usuarios')
export class UsuariosController {
  constructor(private usuarioService: UsuariosService) {}

  @Get()
  getUsuarios(): Promise<UsuariosEntity[]> {
    return this.usuarioService.getUsuarios();
  }
  @Get(':id')
  getUsuario(@Param('id', ParseIntPipe) id: number) {
    return this.usuarioService.getUsuario(id);
  }

  @Post('login')
  async login(@Body() loginData: LoginDto) {
    return this.usuarioService.login(loginData);
  }

  @Post('/createUsuario')
  createUsuario(@Body() nuevoUsuario: CreateUsuarioDto) {
    return this.usuarioService.createUsuario(nuevoUsuario);
  }

  @Patch(':id')
  updateUsuario(
    @Param('id', ParseIntPipe) id: number,
    @Body() usuario: UpdateUsuarioDto,
  ) {
    return this.usuarioService.updateUsuario(id, usuario);
  }
}
