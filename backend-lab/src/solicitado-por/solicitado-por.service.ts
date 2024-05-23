import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SolicitadoPorEntity } from './entities/solicitado-por.entity';
import { CreateSolicitadoPorDto } from './dto/create-solicitado-por.dto';
import { updateSolicitadoPorDto } from './dto/update-solicitado-por.dto';

@Injectable()
export class SolicitadoPorService {
  constructor(
    @InjectRepository(SolicitadoPorEntity)
    private solicitadoPorRepository: Repository<SolicitadoPorEntity>,
  ) {}

  async create(
    createSolicitadoPorDto: CreateSolicitadoPorDto,
  ): Promise<{ mensaje: string; solicitadoPor: SolicitadoPorEntity }> {
    const solicitadoPorFound = await this.solicitadoPorRepository.findOne({
      where: {
        nombreArea: createSolicitadoPorDto.nombreSolicitadoPor,
      },
    });

    if (solicitadoPorFound) {
      throw new HttpException(
        'Ya existe esa area solicitante',
        HttpStatus.BAD_REQUEST,
      );
    }

    const newSolicitadoPorEntity = this.solicitadoPorRepository.create(
      createSolicitadoPorDto,
    );
    await this.solicitadoPorRepository.save(newSolicitadoPorEntity);

    return {
      mensaje: 'Area solicitante creada con éxito',
      solicitadoPor: newSolicitadoPorEntity,
    };
  }

  obtenerListadoSolicitantes() {
    return this.solicitadoPorRepository.find();
  }

  obtenerSolicitante(id: number) {
    return this.solicitadoPorRepository.findOne({
      where: {
        id,
      },
    });
  }

  async updateSolicitadoPor(
    id: number,
    solicitadoPorDto: updateSolicitadoPorDto,
  ): Promise<SolicitadoPorEntity | undefined> {
    const areaSolicitanteExistente = await this.solicitadoPorRepository.findOne(
      {
        where: {
          id,
        },
      },
    );

    if (!areaSolicitanteExistente) {
      return undefined;
    }

    Object.assign(areaSolicitanteExistente, solicitadoPorDto);

    return await this.solicitadoPorRepository.save(areaSolicitanteExistente);
  }
}
