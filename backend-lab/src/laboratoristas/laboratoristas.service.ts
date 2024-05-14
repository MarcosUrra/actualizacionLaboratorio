import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LaboratoristasEntity } from "./entities/laboratoristas.entity";
import { Repository } from "typeorm";
import { crearLaboratoristaDto } from "./dto/crearLaboratorista.dto"; 
import { modificarLaboratoristaDto } from "./dto/modificarLaboratorista.dto";


@Injectable()
export class LaboratoristasService {

    constructor (@InjectRepository (LaboratoristasEntity) private laboratoristaRepository:Repository<LaboratoristasEntity>){}

    async crearLaboratorista(nuevoLaboratorista: crearLaboratoristaDto): Promise<{ mensaje: string, laboratorista: LaboratoristasEntity }> {
        const laboratoristaFound = await this.laboratoristaRepository.findOne({
            where: {
                matricula: nuevoLaboratorista.matricula
            }
            })

        if (laboratoristaFound) {
            
            throw new HttpException('Ya hay un laboratorista con esa matrícula', HttpStatus.BAD_REQUEST);

        }
    
        const nuevoLaboratoristaEntity = this.laboratoristaRepository.create(nuevoLaboratorista);
        await this.laboratoristaRepository.save(nuevoLaboratoristaEntity);
    
        return { mensaje: 'Laboratorista guardado con éxito', laboratorista: nuevoLaboratoristaEntity };
    }
     
    
    obtenerListadoLaboratoristas() {
        return this.laboratoristaRepository.find()
    }


    obtenerLaboratorista(id:number){
        return this.laboratoristaRepository.findOne({
            where: {
                id
            }
        })
    }


    async modificarLaboratorista(id: number, laboratoristaDto: modificarLaboratoristaDto): Promise<LaboratoristasEntity | undefined> {
        const laboratoristaExistente = await this.laboratoristaRepository.findOne({
            where: {
                id
            }
        })
    
        if (!laboratoristaExistente) {
            return undefined;
        }
    
        Object.assign(laboratoristaExistente, laboratoristaDto);
    
        return await this.laboratoristaRepository.save(laboratoristaExistente);
    }
    

}
