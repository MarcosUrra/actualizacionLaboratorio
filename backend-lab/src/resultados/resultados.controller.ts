import { Controller, Get, Param, Body, Post, Delete, Put, HttpException, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { ResultadosService } from './resultados.service';
import { ResultadosEntity } from './resultados.entity';

@Controller('resultados')
export class ResultadosController {
    constructor(private ResultadosService: ResultadosService) {}


  @Post('/nuevoResultado/:id')
  async nuevoResultado(@Body() data: any, @Param('id') id: number): Promise<any> {
    try {
      return await this.ResultadosService.nuevoResultado(data, id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }


  @Get('/obtenerResultados/:idOrden')
  async obtenerResultados(@Param('idOrden') idOrden: number): Promise<any> {
    try {
      return await this.ResultadosService.obtenerResultadosPorOrden(idOrden);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }


  @Get('obtenerResultadoPorId/:id')
  async obtenerResultadoPorId(@Param('id', ParseIntPipe) id: number): Promise<ResultadosEntity | undefined> {
    return this.ResultadosService.obtenerResultadoPorId(id);
  }


  @Put('actualizarResultadoPorId/:id')
  async actualizarResultadoPorId(
    @Param('id', ParseIntPipe) id: number,
    @Body() nuevosValores: any
  ): Promise<ResultadosEntity | undefined> {
    return this.ResultadosService.actualizarResultadoPorId(id, nuevosValores);
  }


  @Delete('eliminarResultadoPorId/:id')
  async eliminarResultadoPorId(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.ResultadosService.eliminarResultadoPorId(id);
  }

  
  @Delete('eliminarResultadoPorAnalisis/:idOrden/:idAnalisis')
  async eliminarResultadoPorAnalisis(
    @Param('idOrden', ParseIntPipe) idOrden: number,
    @Param('idAnalisis', ParseIntPipe) idAnalisis: number,
  ): Promise<string> {
    return this.ResultadosService.eliminarResultadoPorAnalisis(idOrden, idAnalisis);
  }

}

