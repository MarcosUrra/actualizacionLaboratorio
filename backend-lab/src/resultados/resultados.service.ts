// import {
//   BadRequestException,
//   HttpException,
//   HttpStatus,
//   Injectable,
// } from '@nestjs/common';
// import { ResultadosEntity } from './resultados.entity';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { validate } from 'class-validator';

// @Injectable()
// export class ResultadosService {
//   constructor(
//     @InjectRepository(ResultadosEntity)
//     private resultadoRepository: Repository<ResultadosEntity>,
//   ) {}

//   async nuevoResultado(data: any, id: number): Promise<any> {
//     for (const element of data.analisis) {
//       const resultado = new ResultadosEntity();
//       resultado.id_orden = id;
//       resultado.id_analisis = element.id;
//       resultado.resultados = element.resultado;

//       const errors = await validate(resultado);
//       if (errors.length > 0) {
//         throw new HttpException('Invalid request', HttpStatus.BAD_REQUEST);
//       }
//       try {
//         await this.resultadoRepository.save(resultado);
//       } catch (error) {
//         throw new HttpException(
//           'Database error',
//           HttpStatus.INTERNAL_SERVER_ERROR,
//         );
//       }
//     }
//   }

//   async obtenerResultadosPorOrden(
//     idOrden: number,
//   ): Promise<ResultadosEntity[]> {
//     const resultados = await this.resultadoRepository.find({
//       where: {
//         id_orden: idOrden,
//       },
//     });

//     if (resultados.length === 0) {
//       throw new HttpException('No results found', HttpStatus.NOT_FOUND);
//     }
//     return resultados;
//   }

//   async obtenerResultadoPorId(
//     id: number,
//   ): Promise<ResultadosEntity | undefined> {
//     return await this.resultadoRepository.findOne({
//       where: {
//         id: id,
//       },
//     });
//   }

//   async actualizarResultadoPorId(
//     id: number,
//     nuevosValores: any,
//   ): Promise<ResultadosEntity | undefined> {
//     const resultadoExistente = await this.resultadoRepository.findOne({
//       where: {
//         id: id,
//       },
//     });

//     if (resultadoExistente) {
//       if (nuevosValores.nuevoResultado !== undefined) {
//         resultadoExistente.resultados = nuevosValores.nuevoResultado;
//       } else {
//         throw new BadRequestException(
//           'Faltan datos necesarios para editar el registro',
//         );
//       }

//       return await this.resultadoRepository.save(resultadoExistente);
//     }

//     return undefined;
//   }

//   async eliminarResultadoPorId(id: number): Promise<any> {
//     const resultadoAEliminar = await this.resultadoRepository.findOne({
//       where: {
//         id: id,
//       },
//     });

//     if (!resultadoAEliminar) {
//       throw new HttpException('Resultado no encontrado', HttpStatus.NOT_FOUND);
//     }

//     await this.resultadoRepository.remove(resultadoAEliminar);
//     return 'Resultado eliminado exitosamente';
//   }

//   async eliminarResultadoPorAnalisis(
//     idOrden: number,
//     idAnalisis: number,
//   ): Promise<any> {
//     const resultado = await this.resultadoRepository.findOne({
//       where: {
//         id_orden: idOrden,
//         id_analisis: idAnalisis,
//       },
//     });

//     if (!resultado) {
//       throw new HttpException('Resultado no encontrado', HttpStatus.NOT_FOUND);
//     }

//     await this.resultadoRepository.remove(resultado);
//     return 'Resultado eliminado exitosamente';
//   }
// }

import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { ResultadosEntity } from './resultados.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { validate } from 'class-validator';

@Injectable()
export class ResultadosService {
  constructor(
    @InjectRepository(ResultadosEntity)
    private resultadoRepository: Repository<ResultadosEntity>,
  ) {}

  async nuevoResultado(data: any, id: number): Promise<any> {
    for (const element of data.analisis) {
      const resultado = new ResultadosEntity();
      resultado.id_orden = id;
      //resultado.id_analisis = element.id;
      resultado.resultados = element.resultado;

      const errors = await validate(resultado);
      if (errors.length > 0) {
        throw new HttpException('Invalid request', HttpStatus.BAD_REQUEST);
      }
      try {
        await this.resultadoRepository.save(resultado);
      } catch (error) {
        throw new HttpException(
          'Database error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async obtenerResultadosPorOrden(
    idOrden: number,
  ): Promise<ResultadosEntity[]> {
    const resultados = await this.resultadoRepository.find({
      where: { id_orden: idOrden },
      // relations: ['analisis'],
    });

    if (resultados.length === 0) {
      throw new HttpException('No results found', HttpStatus.NOT_FOUND);
    }
    return resultados;
  }
  

  async obtenerResultadoPorId(
    id: number,
  ): Promise<ResultadosEntity | undefined> {
    return await this.resultadoRepository.findOne({
      where: { id: id },
    });
  }

  async actualizarResultadoPorId(
    id: number,
    nuevosValores: any,
  ): Promise<ResultadosEntity | undefined> {
    const resultadoExistente = await this.resultadoRepository.findOne({
      where: { id: id },
    });

    if (resultadoExistente) {
      if (nuevosValores.nuevoResultado !== undefined) {
        resultadoExistente.resultados = nuevosValores.nuevoResultado;
      } else {
        throw new BadRequestException(
          'Faltan datos necesarios para editar el registro',
        );
      }

      return await this.resultadoRepository.save(resultadoExistente);
    }

    return undefined;
  }

  async eliminarResultadoPorId(id: number): Promise<any> {
    const resultadoAEliminar = await this.resultadoRepository.findOne({
      where: { id: id },
    });

    if (!resultadoAEliminar) {
      throw new HttpException('Resultado no encontrado', HttpStatus.NOT_FOUND);
    }

    await this.resultadoRepository.remove(resultadoAEliminar);
    return 'Resultado eliminado exitosamente';
  }

  async eliminarResultadoPorAnalisis(
    idOrden: number,
    idAnalisis: number,
  ): Promise<any> {
    const resultado = await this.resultadoRepository.findOne({
      where: {
        id_orden: idOrden,
        //id_analisis: idAnalisis,
      },
    });

    if (!resultado) {
      throw new HttpException('Resultado no encontrado', HttpStatus.NOT_FOUND);
    }

    await this.resultadoRepository.remove(resultado);
    return 'Resultado eliminado exitosamente';
  }

  // Nuevo método para obtener análisis y subcategorías por orden
  // async obtenerAnalisisYSubcategoriasPorOrden(idOrden: number): Promise<any> {
  //   const resultados = await this.resultadoRepository.find({
  //     where: { id_orden: idOrden },
  //     relations: ['analisis', 'analisis.subcategorias'],
  //   });

  //   if (resultados.length === 0) {
  //     throw new HttpException('No results found', HttpStatus.NOT_FOUND);
  //   }

  //   return resultados.map((resultado) => ({
  //     id: resultado.id,
  //     analisis: resultado.analisis,
  //     subcategorias: resultado.analisis.subcategorias,
  //   }));
  // }
}
