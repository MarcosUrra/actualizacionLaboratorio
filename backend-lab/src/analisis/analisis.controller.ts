import {
  Controller,
  Get,
  Param,
  Body,
  Post,
  Put,
  HttpException,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { AnalisisService } from './analisis.service';
import { CrearAnalisisDto } from './dto/crearAnalisis.dto';

@Controller('analisis')
export class AnalisisController {
  constructor(private readonly analisisService: AnalisisService) {}

  @Get('/obtenerListadoAnalisis')
  async obtenerListadoAnalisis() {
    return await this.analisisService.obtenerListadoAnalisis();
  }

  @Get('/obtenerAnalisis/:id')
  async obtenerUnAnalisis(@Param('id') id: number) {
    try {
      return await this.analisisService.obtenerUnAnalisis(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Get('/obtenerAnalisisPorNombre/:nombre')
  async obtenerAnalisisPorNombre(@Param('nombre') nombre: string) {
    try {
      return await this.analisisService.obtenerAnalisisPorNombre(nombre);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Post('/crearAnalisis')
  async crearAnalisis(@Body() nuevoAnalisis: CrearAnalisisDto): Promise<any> {
    try {
      return await this.analisisService.crearAnalisis(nuevoAnalisis);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put('/modificarAnalisis/:id')
  async modificarAnalisis(
    @Param('id') id: number,
    @Body() actualizarAnalisis: CrearAnalisisDto,
  ): Promise<any> {
    try {
      return await this.analisisService.modificarAnalisis(
        id,
        actualizarAnalisis,
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('obtenerSubcategoriasPorAnalisisId/:id')
  async obtenerSubcategoriasPorAnalisisId(
    @Param('id', ParseIntPipe) id: number,
  ) {
    try {
      const subcategorias =
        await this.analisisService.obtenerSubcategoriasPorAnalisisId(id);
      return subcategorias;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Get('analisisYSubcategoriasPorOrden/:idOrden')
  async obtenerAnalisisYSubcategoriasPorOrden(
    @Param('idOrden', ParseIntPipe) idOrden: number,
  ): Promise<any> {
    try {
      return await this.analisisService.AnalisisYSubcategoriasPorOrden(idOrden);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
