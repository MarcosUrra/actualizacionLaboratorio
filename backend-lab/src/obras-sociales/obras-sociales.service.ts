import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { obrasSocialesEntity } from './entities/obras-sociales.entity';
import { obrasSociales } from './entities/obras-sociales.interface';
import { CreateObraSocialDto } from './dto/create-obras-sociales.dto';
import { validate } from 'class-validator';
import { updateObraSocialDto } from './dto/update-obras-sociales.dto';

@Injectable()
export class obrasSocialesService {
  constructor(
    @InjectRepository(obrasSocialesEntity)
    private obrasSocialesRepository: Repository<obrasSocialesEntity>,
  ) {}
  obrasSocialesDatabase: obrasSocialesEntity[] = [];

  public async obtenerListadoObrasSociales() {
    return await this.obrasSocialesRepository
      .createQueryBuilder('obrasSociales')
      .select()
      .getMany();
  }

  public async obtenerObraSocialPorId(id: any) {
    return await this.obrasSocialesRepository
      .findOne({
        where: {
          id: id,
        },
      })
      .then((respuesta) => {
        if (respuesta == null) {
          return {
            statusCode: 404,
            msg: 'No existe la obra social solicitada.',
          };
        } else {
          return respuesta;
        }
      });
  }

  public async obtenerObraSocialPorNombre(nombreObraSocial: any) {
    return await this.obrasSocialesRepository
      .findOne({
        where: {
          nombreObraSocial: nombreObraSocial,
        },
      })
      .then((respuesta) => {
        if (respuesta == null) {
          return {
            statusCode: 404,
            msg: 'No existe la obra social solicitada.',
          };
        } else {
          return respuesta;
        }
      });
  }

  async createObraSocial(
    nuevaObraSocial: CreateObraSocialDto,
  ): Promise<{ mensaje: string; obraSocial: obrasSocialesEntity }> {
    const obraSocialFound = await this.obrasSocialesRepository.findOne({
      where: {
        nombreObraSocial: nuevaObraSocial.nombreObraSocial,
      },
    });

    if (obraSocialFound) {
      throw new HttpException(
        'Ya existe esa obra social',
        HttpStatus.BAD_REQUEST,
      );
    }

    const newObraSocialEntity =
      this.obrasSocialesRepository.create(nuevaObraSocial);
    await this.obrasSocialesRepository.save(newObraSocialEntity);

    return {
      mensaje: 'Obra social creada con éxito',
      obraSocial: newObraSocialEntity,
    };
  }

  async updateObraSocial(
    id: number,
    obraSocialDto: updateObraSocialDto,
  ): Promise<obrasSocialesEntity | undefined> {
    const obraSocialExistente = await this.obrasSocialesRepository.findOne({
      where: {
        id,
      },
    });

    if (!obraSocialExistente) {
      return undefined;
    }

    Object.assign(obraSocialExistente, obraSocialDto);

    return await this.obrasSocialesRepository.save(obraSocialExistente);
  }
}
