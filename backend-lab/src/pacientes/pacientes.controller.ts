import {
  Controller,
  Get,
  Param,
  Body,
  Post,
  Delete,
  Put,
  HttpException,
  HttpStatus,
  Patch,
} from '@nestjs/common';
import { PacientesService } from './pacientes.service';
import { PacientesEntity } from './entities/pacientes.entity';
import { validate } from 'class-validator';
import { CreatePacienteDto } from './dto/create-paciente.dto';

@Controller('pacientes')
export class PacientesController {
  constructor(private PacientesService: PacientesService) {}

  @Get('/obtenerListadoPacientes')
  obtenerListadoPacientes() {
    return this.PacientesService.obtenerListadoPacientes();
  }

  @Get('/obtenerPacientePorDocumento/:id')
  obtenerPacientePorDocumento(@Param('id') id) {
    return this.PacientesService.obtenerPacientePorId(id);
  }

  @Get('/obtenerPacientePorDni/:numeroDocumento')
  obtenerPacientePorDni(@Param('numeroDocumento') numeroDocumento) {
    return this.PacientesService.obtenerPacientePorDni(numeroDocumento);
  }

  @Post('/nuevoPaciente')
  async nuevoPaciente(@Body() nuevoPaciente: CreatePacienteDto): Promise<any> {
    const paciente = new PacientesEntity();
    Object.assign(paciente, nuevoPaciente);

    const errors = await validate(paciente);

    if (errors.length > 0) {
      const errorMessage =
        'Error al intentar cargar un nuevo paciente, todos los campos obligatorios';
      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    }

    return this.PacientesService.nuevoPaciente(nuevoPaciente);
  }

  @Patch('/modificarPaciente/:id')
  modificarPaciente(@Param('id') id, @Body() Body) {
    return this.PacientesService.modificarPaciente(id, Body);
  }
}
