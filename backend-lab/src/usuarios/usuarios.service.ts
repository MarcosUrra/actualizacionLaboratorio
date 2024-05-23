import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuariosEntity } from './entities/usuarios.entity';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { LoginDto } from './dto/LoginDto.dto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(UsuariosEntity)
    private usuarioRepository: Repository<UsuariosEntity>,
  ) {}
  async createUsuario(usuario: CreateUsuarioDto) {
    const usuariofound = await this.usuarioRepository.findOne({
      where: { username: usuario.username },
    });
    if (usuariofound) {
      throw new HttpException('El usuario ya existe', HttpStatus.CONFLICT);
    }
    const nuevousuario = this.usuarioRepository.create(usuario);
    return this.usuarioRepository.save(nuevousuario);
  }

  getUsuarios() {
    return this.usuarioRepository.find();
  }

  async getUsuario(id: number) {
    const usuariofound = await this.usuarioRepository.findOne({
      where: { id },
    });
    if (!usuariofound) {
      throw new HttpException(
        'No se encontro el usuario',
        HttpStatus.NOT_FOUND,
      );
    }
    return usuariofound;
  }

  async updateUsuario(
    id: number,
    usuario: UpdateUsuarioDto,
  ): Promise<UsuariosEntity | undefined> {
    const usuariofound = await this.usuarioRepository.findOne({
      where: { id },
    });
    if (!usuariofound) {
      return undefined;
    }
    const updateUsuario = Object.assign(usuariofound, usuario);
    return this.usuarioRepository.save(updateUsuario);
  }

  async login(loginData: LoginDto) {
    const { username, password, role } = loginData;

    const user = await this.validateUser(username, password, role);

    if (user) {
      return { message: 'Inicio de sesión exitoso', role: user.role };
    } else {
      throw new HttpException('', HttpStatus.UNAUTHORIZED);
    }
  }
  async validateUser(
    username: string,
    password: string,
    role: string,
  ): Promise<UsuariosEntity | null> {
    const user = await this.usuarioRepository.findOne({
      where: {
        username,
        password,
        role,
      },
    });

    return user || null;
  }
}
