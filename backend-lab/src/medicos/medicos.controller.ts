import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Delete,
  Patch,
  ValidationPipe,
} from '@nestjs/common';
import { crearMedicoDto } from './dto/crearMedico.dto';
import { MedicosService } from './medicos.service';
import { MedicosEntity } from './entities/medicos.entity';
import { modificarMedicoDto } from './dto/modificarMedico.dto';

@Controller('medicos')
export class MedicosController {
  medicoRepository: any;
  constructor(private medicosService: MedicosService) {}

  @Post()
  async crearMedico(
    @Body(new ValidationPipe()) nuevoMedico: crearMedicoDto,
  ): Promise<{ mensaje: string; medico: MedicosEntity }> {
    return this.medicosService.crearMedico(nuevoMedico);
  }

  @Get('listadoMedicos')
  obtenerListadoMedicos(): Promise<MedicosEntity[]> {
    return this.medicosService.obtenerListadoMedicos();
  }

  @Get(':id')
  obtenerMedico(@Param('id') id: number): Promise<MedicosEntity> {
    return this.medicosService.obtenerMedico(id);
  }

  @Patch(':id')
  modificarMedico(
    @Param('id') id: number,
    @Body() medicoDto: modificarMedicoDto,
  ) {
    return this.medicosService.modificarMedico(id, medicoDto);
  }
}
