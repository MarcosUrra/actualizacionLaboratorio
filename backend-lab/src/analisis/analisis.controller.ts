import { Controller, Get, Param, Body, Post, Delete, Put } from '@nestjs/common';
import { AnalisisService } from './analisis.service';


@Controller('analisis')
export class AnalisisController {
    constructor(private AnalisisService: AnalisisService) {}
    
    @Get("/obtenerListadoAnalisis")
    obtenerListadoAnalisis(){
        return this.AnalisisService.obtenerListadoAnalisis();
    }
    
    @Get('/obtenerAnalisis/:id')
    obtenerUnAnalisis(@Param('id')id) {
        return this.AnalisisService.obtenerUnAnalisis(id);
    }
    
    @Get('/obtenerAnalisisPorNombre/:nombre')
    obtenerAnalisisPorNombre(@Param('nombre')nombre) {
        return this.AnalisisService.obtenerAnalisisPorNombre(nombre);
    }
    
    @Post('/crearAnalisis')
    crearAnalisis(@Body() nuevoAnalisis): any {
        return this.AnalisisService.crearAnalisis(nuevoAnalisis);
    }
   
    @Put("/modificarAnalisis/:id")
    modificarAnalisis(@Param('id') id, @Body() Body){
        return this.AnalisisService.modificarAnalisis( id, Body);
    }
}

