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
  ValidationPipe,
} from '@nestjs/common';
import { obrasSocialesService } from './obras-sociales.service';
import { obrasSocialesEntity } from './entities/obras-sociales.entity';
import { validate } from 'class-validator';
import { CreateObraSocialDto } from './dto/create-obras-sociales.dto';
import { updateObraSocialDto } from './dto/update-obras-sociales.dto';

@Controller('obras-sociales')
export class obrasSocialesController {
  constructor(private obrasSocialesService: obrasSocialesService) {}

  @Get('/obtenerListadoObrasSociales')
  obtenerListadoObrasSociales() {
    return this.obrasSocialesService.obtenerListadoObrasSociales();
  }

  @Get('/obtenerObraSocialPorId/:id')
  obtenerObraSocialPorId(@Param('id') id) {
    return this.obrasSocialesService.obtenerObraSocialPorId(id);
  }

  @Get('/obtenerObraSocialPorNombre/:id')
  obtenerObraSocialPorNombre(@Param('id') id) {
    return this.obrasSocialesService.obtenerObraSocialPorNombre(id);
  }

  @Post()
  async createObraSocial(
    @Body(new ValidationPipe()) nuevaObraSocial: CreateObraSocialDto,
  ): Promise<{ mensaje: string; obraSocial: obrasSocialesEntity }> {
    return this.obrasSocialesService.createObraSocial(nuevaObraSocial);
  }

  @Patch(':id')
  updateObraSocial(
    @Param('id') id: number,
    @Body() obraSocialDto: updateObraSocialDto,
  ) {
    return this.obrasSocialesService.updateObraSocial(id, obraSocialDto);
  }
}
