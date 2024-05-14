import { BadRequestException, Injectable, HttpException,HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AnalisisEntity } from './entities/analisis.entity';
import { Analisis } from './entities/analisis.interface';


@Injectable()
export class AnalisisService {
    constructor(@InjectRepository(AnalisisEntity)
        private analisisRepository: Repository<AnalisisEntity>
    ) {}
    analisisDatabase: AnalisisEntity[]= [];
    
    public async obtenerListadoAnalisis() {
        return await this.analisisRepository
        .createQueryBuilder('analisis')
        .select()
        .getMany();
        }

    public async obtenerUnAnalisis (id:number) {
        return await this.analisisRepository
        .findOne({
            where: {
                id: id
            }
        })
        .then((respuesta) => {
            //universo
            if (respuesta == null) {
                return {
                    statusCode: 404,
                    msg: 'No existe el análisis solicitado.',
                };
            } else {
                return respuesta;
            }
        });
    }

    public async obtenerAnalisisPorNombre (nombre) {
        return await this.analisisRepository
        .findOne({
            where: {
                nombre: nombre
            }
        })
        .then((respuesta) => {
            //universo
            if (respuesta == null) {
                return {
                    statusCode: 404,
                    msg: 'No existe el análisis solicitado.',
                };
            } else {
                return respuesta;
            }
        });
    }
    
    

    public async crearAnalisis(nuevoAnalisis:AnalisisEntity){
        const analisisFound= await this.analisisRepository.findOne({
            where:{
                nombre:nuevoAnalisis.nombre
            }
        })
        if(analisisFound){
            return new HttpException('El usuario ya existe',HttpStatus.CONFLICT);
        }
        let informacionAGuardar: any = {};
        informacionAGuardar.codigo = nuevoAnalisis.codigo;
        informacionAGuardar.nombre = nuevoAnalisis.nombre;
        informacionAGuardar.valores = nuevoAnalisis.valores;
        informacionAGuardar.unidades = nuevoAnalisis.unidades;    
        try{
            const analisisGuardado = await this.analisisRepository.save(
                informacionAGuardar,
            );
            return{
                statusCode: 200,
                msg: 'Analisis guardado correctamente',
            };
        } catch (error) {
            return new BadRequestException (error)
        }
    }


    public async modificarAnalisis( id:number, informacionNueva: Analisis) {
        try {
            let analisisAntiguo: any = await this.obtenerUnAnalisis(id);
            analisisAntiguo.codigo = informacionNueva.codigo;
            analisisAntiguo.nombre = informacionNueva.nombre;
            analisisAntiguo.valores = informacionNueva.valores;
            analisisAntiguo.unidades = informacionNueva.unidades;
            
            return await this.analisisRepository
                .save(analisisAntiguo)
                .then(async (resp) => {
                    if (resp.statusCode == 404) {
                        return {
                          statusCode: 404,
                          msg: 'No existe el análisis solicitado.'
                        };
                    } else {
                        return {
                          statusCode: 200,
                          msg: 'Información del análisis editada correctamente',
                          data: await this.obtenerUnAnalisis(id)
                        };
                      }
                    });
                } catch (error) {
                  return error;
                }
    }
}

