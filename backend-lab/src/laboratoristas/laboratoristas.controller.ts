import { Body, Controller, Post, Get, Param, Delete, Patch, ValidationPipe} from "@nestjs/common";
import { LaboratoristasService } from "./laboratoristas.service";
import { LaboratoristasEntity } from "./entities/laboratoristas.entity"
import { crearLaboratoristaDto } from "./dto/crearLaboratorista.dto";
import { modificarLaboratoristaDto } from "./dto/modificarLaboratorista.dto";


@Controller ('laboratoristas')
export class LaboratoristasController {
   laboratoristaRepository: any;
    constructor(private laboratoristasService: LaboratoristasService) {}

    @Post() 
    async crearLaboratorista(@Body(new ValidationPipe()) nuevoLaboratorista: crearLaboratoristaDto): Promise<{ mensaje: string, laboratorista: LaboratoristasEntity }> {
        return this.laboratoristasService.crearLaboratorista(nuevoLaboratorista);
    }


    @Get('listadoLaboratoristas') 
    obtenerListadoLaboratoristas(): Promise<LaboratoristasEntity[]> {
        return this.laboratoristasService.obtenerListadoLaboratoristas()
    }


    @Get(':id') 
    obtenerLaboratorista(@Param('id') id: number): Promise<LaboratoristasEntity> {
        return this.laboratoristasService.obtenerLaboratorista(id);
    }


    
    @Patch(':id')
    modificarLaboratorista(@Param('id') id: number, @Body() laboratoristaDto: modificarLaboratoristaDto) {
    return this.laboratoristasService.modificarLaboratorista(id, laboratoristaDto);
}


}










