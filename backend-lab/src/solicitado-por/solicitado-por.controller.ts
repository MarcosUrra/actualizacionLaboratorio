import { Body, Controller, Post, Get, Param, Delete, Patch, ValidationPipe} from "@nestjs/common";
import { SolicitadoPorEntity } from "./entities/solicitado-por.entity";
import { SolicitadoPorService } from './solicitado-por.service';
import { CreateSolicitadoPorDto } from './dto/create-solicitado-por.dto';
import { updateSolicitadoPorDto } from './dto/update-solicitado-por.dto';


@Controller ('solicitado-por')
export class SolicitadoPorController {
   solicitadoPorRepository: any;
    constructor(private solicitadoPorService: SolicitadoPorService) {}

    @Post() // ruta para thunderC: http://localhost:3000/solicitado-por/listadoSolicitantes
    async createSolicitadoPOr(@Body(new ValidationPipe()) nuevoSolicitante: CreateSolicitadoPorDto): Promise<{ mensaje: string, solicitadoPor: SolicitadoPorEntity }> {
        return this.solicitadoPorService.create(nuevoSolicitante);
    }


    @Get('listadoSolicitantes') //ruta para thunderC: http://localhost:3000/solicitado-por/listadoSolicitantes
    obtenerListadoSolicitantes(): Promise<SolicitadoPorEntity[]> {
        return this.solicitadoPorService.obtenerListadoSolicitantes()
    }


    @Get(':id') 
    obtenerSolicitante(@Param('id') id: number): Promise<SolicitadoPorEntity> {
        return this.solicitadoPorService.obtenerSolicitante(id);
    }


    
    @Patch(':id')
    modificarSolicitante(@Param('id') id: number, @Body() solicitadoPorDto: updateSolicitadoPorDto) {
    return this.solicitadoPorService.updateSolicitadoPor(id, solicitadoPorDto);
}


}










