import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GruposAnalisisEntity } from './entities/grupos_analisis.entity';
import { AnalisisEntity } from 'src/analisis/entities/analisis.entity';


@Injectable()
export class GruposAnalisisService {

    constructor(
        @InjectRepository(GruposAnalisisEntity)
        private gruposAnalisisRepository: Repository<GruposAnalisisEntity>,
        @InjectRepository(AnalisisEntity)
        private analisisRepository: Repository<AnalisisEntity>
    ) {}
    
    public async obtenerListadoGruposAnalisis() {
        return await this.gruposAnalisisRepository
        .createQueryBuilder('GruposAnalisisEntity')
        .select()
        .getMany();
        }
   
    public async obtenerGrupoAnalisisPorNombre(nombre_GruposAnalisis: any) {
        return await this.gruposAnalisisRepository
        .findOne({
            where: {
            nombreDelGrupo: nombre_GruposAnalisis
            }
        })
        .then((respuesta) => {
            
            if (respuesta == null) {
                return {
                    statusCode: 404,
                    msg: 'No existe el Grupo de Analisis solicitado.',
                };
            } else {
                return respuesta;
            }
        });
    }
 
      public async obtenerGrupoAnalisisPorId(id: any) {
        return await this.gruposAnalisisRepository
        .createQueryBuilder("GruposAnalisis")
        .leftJoinAndSelect("GruposAnalisis.listado_de_analisis", "analisis")
        .where("GruposAnalisis.id = :id", { id: id })
        .getOne();
    }  
        
    async nuevoGrupoAnalisis(body: any) {
        try{
            const nuevoGrupo = new GruposAnalisisEntity();
            nuevoGrupo.nombreDelGrupo = body.nombreDelGrupo;
            nuevoGrupo.nombreInforme = body.nombreInforme;
            const listado_de_analisis = body.listado_de_analisis;
            const analisis = await this.analisisRepository.findByIds(listado_de_analisis);
            nuevoGrupo.listado_de_analisis = analisis;
            const resultado = await this.gruposAnalisisRepository.save(nuevoGrupo);
            return resultado;
        } catch (error) {
        console.error('Error en nuevoGrupoAnalisis:', error);
        throw new Error('Error al crear un nuevo grupo de análisis');
        }
    }


    async modificarGrupoAnalisis(id, body: any) {
        let grupoActualizado = await this.gruposAnalisisRepository.findOne({ where: { id } });
    
        if (!grupoActualizado) {
            throw new NotFoundException('No se encontró el grupo de analisis');
        }
    
        grupoActualizado.nombreDelGrupo = body.nombreDelGrupo;
        grupoActualizado.nombreInforme = body.nombreInforme;
        const listado_de_analisis = body.listado_de_analisis;
        const analisis = await this.analisisRepository.findByIds(listado_de_analisis);
    
        const analisisAEliminar = (grupoActualizado.listado_de_analisis || []).filter(
            x => !analisis.includes(x),
        );
        analisisAEliminar.forEach(analisis => {
            grupoActualizado.listado_de_analisis.splice(
                grupoActualizado.listado_de_analisis.indexOf(analisis),
                1,
            );
        });
    
        grupoActualizado.listado_de_analisis = analisis;
        return this.gruposAnalisisRepository.save(grupoActualizado);
    }

}

