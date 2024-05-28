import {
  BadRequestException,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { AnalisisEntity } from './entities/analisis.entity';
import { CrearAnalisisDto, SubcategoriaDto } from './dto/crearAnalisis.dto';
import { SubcategoriaEntity } from './entities/SubcategoriaEntity';

@Injectable()
export class AnalisisService {
  constructor(
    @InjectRepository(AnalisisEntity)
    private readonly analisisRepository: Repository<AnalisisEntity>,
    @InjectRepository(SubcategoriaEntity)
    private readonly subcategoriaRepository: Repository<SubcategoriaEntity>,
  ) {}

  public async obtenerListadoAnalisis() {
    return await this.analisisRepository.find({ relations: ['subcategorias'] });
  }

  public async obtenerUnAnalisis(id: number) {
    const analisis = await this.analisisRepository.findOne({
      where: { id },
      relations: ['subcategorias'],
    });
    if (!analisis) {
      throw new HttpException(
        'No existe el análisis solicitado.',
        HttpStatus.NOT_FOUND,
      );
    }
    return analisis;
  }

  public async obtenerAnalisisPorNombre(nombre: string) {
    const analisis = await this.analisisRepository.findOne({
      where: { nombre },
      relations: ['subcategorias'],
    });
    if (!analisis) {
      throw new HttpException(
        'No existe el análisis solicitado.',
        HttpStatus.NOT_FOUND,
      );
    }
    return analisis;
  }

  public async crearAnalisis(nuevoAnalisis: CrearAnalisisDto) {
    const analisisFound = await this.analisisRepository.findOne({
      where: { nombre: nuevoAnalisis.nombre },
    });
    if (analisisFound) {
      throw new HttpException('El análisis ya existe', HttpStatus.CONFLICT);
    }

    // Crear subcategorías
    const subcategorias = await Promise.all(
      nuevoAnalisis.subcategorias.map(async (subcategoriaDto) => {
        const subcategoria = this.subcategoriaRepository.create(
          subcategoriaDto as unknown as DeepPartial<SubcategoriaEntity>,
        );
        return await this.subcategoriaRepository.save(subcategoria);
      }),
    );

    // Crear análisis
    const analisis = this.analisisRepository.create({
      ...nuevoAnalisis,
      subcategorias,
    });

    try {
      const analisisGuardado = await this.analisisRepository.save(analisis);
      return {
        statusCode: 200,
        msg: 'Análisis guardado correctamente',
        data: analisisGuardado,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  public async modificarAnalisis(
    id: number,
    informacionNueva: CrearAnalisisDto,
  ) {
    const analisis = await this.obtenerUnAnalisis(id);
    if (!analisis) {
      throw new HttpException(
        'No existe el análisis solicitado.',
        HttpStatus.NOT_FOUND,
      );
    }

    // Modificar los campos básicos del análisis
    analisis.codigo = informacionNueva.codigo;
    analisis.nombre = informacionNueva.nombre;
    analisis.valores = informacionNueva.valores;
    analisis.unidades = informacionNueva.unidades;

    // Actualizar subcategorías
    const subcategorias = await Promise.all(
      informacionNueva.subcategorias.map(async (subcategoriaDto) => {
        let subcategoria: SubcategoriaEntity;
        if (subcategoriaDto.id) {
          subcategoria = await this.subcategoriaRepository.findOne({
            where: { id: subcategoriaDto.id },
          });
          if (subcategoria) {
            // Actualizar campos de la subcategoría
            //subcategoria.codigo = subcategoriaDto.codigo;
            subcategoria.nombre = subcategoriaDto.nombre;
            subcategoria.valores = subcategoriaDto.valores;
            subcategoria.unidades = subcategoriaDto.unidades;
          } else {
            subcategoria = this.subcategoriaRepository.create(
              subcategoriaDto as unknown as DeepPartial<SubcategoriaEntity>,
            );
          }
        } else {
          subcategoria = this.subcategoriaRepository.create(
            subcategoriaDto as unknown as DeepPartial<SubcategoriaEntity>,
          );
        }
        return await this.subcategoriaRepository.save(subcategoria);
      }),
    );

    analisis.subcategorias = subcategorias;

    try {
      const analisisModificado = await this.analisisRepository.save(analisis);
      return {
        statusCode: 200,
        msg: 'Información del análisis editada correctamente',
        data: analisisModificado,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  public async obtenerSubcategoriasPorAnalisisId(id: number) {
    const analisis = await this.analisisRepository.findOne({
      where: { id },
      relations: ['subcategorias'],
    });
    if (!analisis) {
      throw new HttpException(
        'No existe el análisis solicitado.',
        HttpStatus.NOT_FOUND,
      );
    }
    return analisis.subcategorias;
  }

  async AnalisisYSubcategoriasPorOrden(idOrden: number): Promise<any> {
    const analisis = await this.analisisRepository.find({
      where: { id_orden: idOrden },
      relations: ['subcategorias'],
    });

    if (analisis.length === 0) {
      throw new HttpException('No results found', HttpStatus.NOT_FOUND);
    }

    return analisis.map((analisis) => ({
      id: analisis.id,
      subcategorias: analisis.subcategorias,
    }));
  }
}
