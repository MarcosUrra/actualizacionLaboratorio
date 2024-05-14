import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PacientesEntity } from './entities/pacientes.entity';
import { Paciente } from './entities/pacientes.interface';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { validate } from 'class-validator';


@Injectable()
export class PacientesService {

    constructor(@InjectRepository(PacientesEntity)
        private pacienteRepository: Repository<PacientesEntity>
    ) {}
    pacientesDatabase: PacientesEntity[]= [];
    
    public async obtenerListadoPacientes() {
        return await this.pacienteRepository
        .createQueryBuilder('pacientes')
        .select()
        .getMany();
        }

    public async obtenerPacientePorId(id: any) {
        return await this.pacienteRepository
        .findOne({
            where: {
                id: id
            }
        })
        .then((respuesta) => {
            if (respuesta == null) {
                return {
                    statusCode: 404,
                    msg: 'No existe el paciente solicitado.',
                };
            } else {
                return respuesta;
            }
        });
    }

    public async obtenerPacientePorDni(numeroDocumento: any) {
        return await this.pacienteRepository
        .findOne({
            where: {
                numeroDocumento: numeroDocumento
            }
        })
        .then((respuesta) => {
            if (respuesta == null) {
                return {
                    statusCode: 404,
                    msg: 'No existe el paciente solicitado.',
                };
            } else {
                return respuesta;
            }
        });
    }
    

    public async nuevoPaciente(nuevoPaciente: CreatePacienteDto): Promise<any> {
        const errors = await validate(nuevoPaciente);

        if (errors.length > 0) {
            const errorMessage = 'Error al intentar cargar un nuevo paciente: Por favor, complete todos los campos obligatorios';
            throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
        }
        if (!nuevoPaciente.numeroDocumento) {
            const errorMessage = 'Error al intentar cargar un nuevo paciente: hay campos obligatorios';
            throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
        }
    
        const existePaciente = await this.pacienteRepository.findOne({ 
            where:{
            numeroDocumento: nuevoPaciente.numeroDocumento,
            }
        });

        if (existePaciente) {
            const errorMessage = 'Error al intentar cargar un nuevo paciente: El paciente ya existe';
            throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
        }

        nuevoPaciente.email = nuevoPaciente.email.toLowerCase();

        return this.pacienteRepository.save(nuevoPaciente);
    }
 
    
    public async modificarPaciente( id: any, informacionNueva: Paciente) {
        try {
            let pacienteAntiguo: any = await this.obtenerPacientePorId(id);
            pacienteAntiguo = informacionNueva;

            pacienteAntiguo.email = pacienteAntiguo.email.toLowerCase();

            return await this.pacienteRepository
                .save(pacienteAntiguo)
                .then(async (resp) => {
                    if (resp.statusCode == 404) {
                        return {
                          statusCode: 404,
                          msg: 'No existe el paciente solicitado.'
                        };
                    } else {
                        return {
                          statusCode: 200,
                          msg: 'Información del paciente editada correctamente',
                          data: await this.obtenerPacientePorId(id),
                        };
                      }
                    });
                } catch (error) {
                  return error;
                }
    }
}

