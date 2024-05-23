import {
  Controller,
  Get,
  Param,
  Body,
  Post,
  Delete,
  Put,
} from '@nestjs/common';
import { GruposAnalisisService } from './grupos_analisis.service';
import { GruposAnalisisEntity } from './entities/grupos_analisis.entity';

@Controller('grupos_analisis')
export class GruposAnalisisController {
  constructor(private gruposAnalisisService: GruposAnalisisService) {}

  @Get('/obtenerListadoGruposDeAnalisis')
  obtenerListadoGruposAnalisis() {
    return this.gruposAnalisisService.obtenerListadoGruposAnalisis();
  }

  @Get('/obtenerGrupoPorId/:id')
  obtenerGrupoPorId(@Param('id') id) {
    return this.gruposAnalisisService.obtenerGrupoAnalisisPorId(id);
  }

  @Get('/obtenerGrupoPorNombre/:nombreGrupo')
  obtenerGrupoPorNombre(@Param('nombreGrupo') nombreDelGrupo) {
    return this.gruposAnalisisService.obtenerGrupoAnalisisPorNombre(
      nombreDelGrupo,
    );
  }

  @Post('/nuevoGrupo')
  nuevoGrupo(
    @Body() grupo: { nombreDelGrupo: string; listado_de_analisis: number[] },
  ): Promise<GruposAnalisisEntity> {
    //GruposAnalisisEntity): Promise<GruposAnalisisEntity> {
    return this.gruposAnalisisService.nuevoGrupoAnalisis(grupo);
  }

  @Put('/modificarGrupo/:id')
  modificarGrupo(@Param('id') id: number, @Body() nuevosDatos: any) {
    return this.gruposAnalisisService.modificarGrupoAnalisis(id, nuevosDatos);
  }
}
