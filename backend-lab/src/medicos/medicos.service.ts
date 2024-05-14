import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MedicosEntity } from "./entities/medicos.entity";
import { Repository } from "typeorm";
import { crearMedicoDto } from "./dto/crearMedico.dto"; 
import { modificarMedicoDto } from "./dto/modificarMedico.dto";


@Injectable()
export class MedicosService {

    constructor (@InjectRepository (MedicosEntity) private medicoRepository:Repository<MedicosEntity>){}

    async crearMedico(nuevoMedico: crearMedicoDto): Promise<{ mensaje: string, medico: MedicosEntity }> {
        const medicoFound = await this.medicoRepository.findOne({
            where: {
                matricula: nuevoMedico.matricula
            }
            })

        if (medicoFound) {
          
            throw new HttpException('Ya hay un médico con esa matrícula', HttpStatus.BAD_REQUEST);

        }
    
        const nuevoMedicoEntity = this.medicoRepository.create(nuevoMedico);
        await this.medicoRepository.save(nuevoMedicoEntity);
    
        return { mensaje: 'Médico guardado con éxito', medico: nuevoMedicoEntity };
    }
     
    
    obtenerListadoMedicos() {
        return this.medicoRepository.find()
    }


    obtenerMedico(id:number){
        return this.medicoRepository.findOne({
            where: {
                id
            }
        })
    }

    async modificarMedico(id: number, medicoDto: modificarMedicoDto): Promise<MedicosEntity | undefined> {
        const medicoExistente = await this.medicoRepository.findOne({
            where: {
                id
            }
        })
    
        if (!medicoExistente) {
            return undefined;
        }
    
        Object.assign(medicoExistente, medicoDto);
    
        return await this.medicoRepository.save(medicoExistente);
    }

}