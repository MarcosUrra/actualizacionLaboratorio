import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { NuevaOrdenService } from './nueva-orden.service';
import { NuevaOrden } from './nueva-orden.entity';
import { EditarOrdenCreateDto } from './nueva-orden.createDto';

@Controller('nueva-orden')
export class NuevaOrdenController {
  constructor(private readonly nuevaOrdenService: NuevaOrdenService) {}

  @Get('/ObtenerOrdenes')
  ObtenerOrdenes(): Promise<NuevaOrden[]> {
    return this.nuevaOrdenService.ObtenerOrdenes();
  }

  @Get('/ObtenerOrdenesPorFecha')
  async ObtenerOrdenesPorFecha(
    @Query('fechaDesde') fechaDesde: string,
    @Query('fechaHasta') fechaHasta: string,
  ) {
    if (
      !fechaDesde ||
      fechaDesde.trim() === '' ||
      !fechaHasta ||
      fechaHasta.trim() === ''
    ) {
      const fechaActual = new Date();
      fechaDesde = `${fechaActual.getMonth() + 1}/${
        fechaActual.getDate() - 3
      }/${fechaActual.getFullYear()}`;
      fechaHasta = `${
        fechaActual.getMonth() + 1
      }/${fechaActual.getDate()}/${fechaActual.getFullYear()}`;
    }
    const [mesDesde, diaDesde, anioDesde] = fechaDesde.split('/');
    const [mesHasta, diaHasta, anioHasta] = fechaHasta.split('/');

    const fechaDesdeObj = new Date(
      Number(anioDesde),
      Number(mesDesde) - 1,
      Number(diaDesde),
      0,
      0,
      0,
    );
    const fechaHastaObj = new Date(
      Number(anioHasta),
      Number(mesHasta) - 1,
      Number(diaHasta),
      23,
      59,
      59,
    );

    try {
      const ordenes = await this.nuevaOrdenService.ObtenerOrdenesPorFecha(
        fechaDesdeObj,
        fechaHastaObj,
      );
      return ordenes;
    } catch (error) {
      console.error(
        'Error al obtener órdenes en el controlador:',
        error.message,
      );
      throw new Error('Error al obtener órdenes.');
    }
  }

  @Get('/filtrado')
  async filtrado(
    @Query('fechaDesde') fechaDesde: string,
    @Query('fechaHasta') fechaHasta: string,
    @Query('analisis') analisis: string,
    @Query('nroOrden') nroOrden: string,
    @Query('numeroDocumento') numeroDocumento: string,
    @Query('nombreCompleto') nombreCompleto: string,
  ) {
    if (
      !fechaDesde ||
      fechaDesde.trim() === '' ||
      !fechaHasta ||
      fechaHasta.trim() === ''
    ) {
      const fechaActual = new Date();
      fechaDesde = `${fechaActual.getMonth() + 1}/${
        fechaActual.getDate() - 3
      }/${fechaActual.getFullYear()}`;
      fechaHasta = `${
        fechaActual.getMonth() + 1
      }/${fechaActual.getDate()}/${fechaActual.getFullYear()}`;
    }
    const [mesDesde, diaDesde, anioDesde] = fechaDesde.split('/');
    const [mesHasta, diaHasta, anioHasta] = fechaHasta.split('/');

    const fechaDesdeObj = new Date(
      Number(anioDesde),
      Number(mesDesde) - 1,
      Number(diaDesde),
      0,
      0,
      0,
    );
    const fechaHastaObj = new Date(
      Number(anioHasta),
      Number(mesHasta) - 1,
      Number(diaHasta),
      23,
      59,
      59,
    );

    try {
      const ordenes = await this.nuevaOrdenService.filtrado(
        fechaDesdeObj,
        fechaHastaObj,
        analisis,
        nroOrden,
        numeroDocumento,
        nombreCompleto,
      );
      return ordenes;
    } catch (error) {
      console.error(
        'Error al obtener órdenes en el controlador:',
        error.message,
      );
      throw new Error('Error al obtener órdenes.');
    }
  }

  @Get('/ObtenerOrdenesReporteDiario')
  async ObtenerOrdenesReporteDiario(@Query('fecha') fecha: Date) {
    try {
      const ordenes = await this.nuevaOrdenService.ObtenerOrdenesReporteDiario(
        fecha,
      );
      return ordenes;
    } catch (error) {
      console.error(
        'Error al obtener órdenes en el controlador:',
        error.message,
      );
      throw new Error('Error al obtener órdenes.');
    }
  }

  @Get(':id')
  async obtenerNuevaOrden(@Param('id') id: number): Promise<NuevaOrden> {
    try {
      const orden = await this.nuevaOrdenService.obtenerNuevaOrden(id);
      return orden;
    } catch (error) {
      console.error('Error al obtener la orden:', error.message);
      throw new Error('Error al obtener la orden.');
    }
  }

  @Post('/CrearOrden')
  async CrearOrden(
    @Body() nuevaOrdenModel: EditarOrdenCreateDto,
  ): Promise<NuevaOrden> {
    return await this.nuevaOrdenService.CrearOrden(nuevaOrdenModel);
  }

  @Patch(':id')
  modificarOrden(@Param('id') id, @Body() Body) {
    return this.nuevaOrdenService.modificarOrden(id, Body);
  }

  @Get('/impresa/:id')
  actualizarEstadoOrden(@Param('id') id: number): Promise<any> {
    return this.nuevaOrdenService.actualizarEstadoOrden(id);
  }
  
  @Get('/obtenerResultados/:idOrden')
  async obtenerResultados(@Param('idOrden') idOrden: number): Promise<any> {
    try {
      return await this.nuevaOrdenService.obtenerResultadosPorOrden(idOrden);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
