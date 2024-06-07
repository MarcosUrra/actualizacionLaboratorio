import { Injectable } from '@nestjs/common';
import { EditarOrdenCreateDto } from './nueva-orden.createDto';
import { NuevaOrden } from './nueva-orden.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MedicosEntity } from 'src/medicos/entities/medicos.entity';
import { PacientesEntity } from 'src/pacientes/entities/pacientes.entity';
import { AnalisisEntity } from 'src/analisis/entities/analisis.entity';
import { GruposAnalisisEntity } from 'src/grupos de analisis/entities/grupos_analisis.entity';
import { LaboratoristasEntity } from 'src/laboratoristas/entities/laboratoristas.entity';

@Injectable()
export class NuevaOrdenService {
  constructor(
    @InjectRepository(NuevaOrden)
    private nuevaOrdenRepository: Repository<NuevaOrden>,
    @InjectRepository(PacientesEntity)
    private pacienteRepository: Repository<PacientesEntity>,
    @InjectRepository(MedicosEntity)
    private medicoRepository: Repository<MedicosEntity>,
    @InjectRepository(LaboratoristasEntity)
    private laboratoristaRepository: Repository<LaboratoristasEntity>,
    @InjectRepository(AnalisisEntity)
    private analisisRepository: Repository<AnalisisEntity>,
    @InjectRepository(GruposAnalisisEntity)
    private gruposAnalisisRepository: Repository<GruposAnalisisEntity>,
  ) {}

  public async ObtenerOrdenes() {
    try {
      return await this.nuevaOrdenRepository
        .createQueryBuilder('NuevaOrden')
        .leftJoinAndSelect('NuevaOrden.medicos', 'MedicosEntity')
        .leftJoinAndSelect('NuevaOrden.analisis', 'AnalisisEntity')
        .leftJoinAndSelect('NuevaOrden.laboratorista', 'LaboratoristasEntity')
        .leftJoinAndSelect('NuevaOrden.grupos_analisis', 'GruposAnalisisEntity')
        .leftJoinAndSelect(
          'GruposAnalisisEntity.listado_de_analisis',
          'AnalisisGrupoEntity',
        )
        .leftJoinAndSelect('NuevaOrden.paciente', 'PacientesEntity')
        .leftJoinAndSelect('NuevaOrden.resultados', 'ResultadosEntity')
        .getMany();
    } catch (error) {
      console.error('Error al obtener órdenes:', error.message);
      throw new Error('Error al obtener órdenes.');
    }
  }

  public async ObtenerOrdenesPorFecha(fechaDesde: Date, fechaHasta: Date) {
    try {
      return await this.nuevaOrdenRepository
        .createQueryBuilder('NuevaOrden')
        .leftJoinAndSelect('NuevaOrden.medicos', 'MedicosEntity')
        .leftJoinAndSelect('NuevaOrden.analisis', 'AnalisisEntity')
        .leftJoinAndSelect('NuevaOrden.laboratorista', 'LaboratoristasEntity')
        .leftJoinAndSelect('NuevaOrden.grupos_analisis', 'GruposAnalisisEntity')
        .leftJoinAndSelect(
          'GruposAnalisisEntity.listado_de_analisis',
          'AnalisisGrupoEntity',
        )
        .leftJoinAndSelect('NuevaOrden.paciente', 'PacientesEntity')
        .leftJoinAndSelect('NuevaOrden.resultados', 'ResultadosEntity')
        .where('NuevaOrden.fecha >= :fechaDesde', { fechaDesde })
        .andWhere('NuevaOrden.fecha <= :fechaHasta', { fechaHasta })
        .getMany();
    } catch (error) {
      console.error('Error al obtener órdenes:', error.message);
      throw new Error('Error al obtener órdenes.');
    }
  }

  public async filtrado(
    fechaDesde: Date,
    fechaHasta: Date,
    analisis: string,
    nroOrden: string,
    numeroDocumento: string,
    nombreCompleto: string,
  ) {
    try {
      const query = await this.nuevaOrdenRepository
        .createQueryBuilder('NuevaOrden')
        .leftJoinAndSelect('NuevaOrden.medicos', 'MedicosEntity')
        .leftJoinAndSelect('NuevaOrden.analisis', 'AnalisisEntity')
        .leftJoinAndSelect('NuevaOrden.laboratorista', 'LaboratoristasEntity')
        .leftJoinAndSelect('NuevaOrden.grupos_analisis', 'GruposAnalisisEntity')
        .leftJoinAndSelect(
          'GruposAnalisisEntity.listado_de_analisis',
          'AnalisisGrupoEntity',
        )
        .leftJoinAndSelect('NuevaOrden.paciente', 'PacientesEntity')
        .leftJoinAndSelect('NuevaOrden.resultados', 'ResultadosEntity')
        .where('NuevaOrden.fecha >= :fechaDesde', { fechaDesde })
        .andWhere('NuevaOrden.fecha <= :fechaHasta', { fechaHasta })
        .getMany();

      let resultadosFiltrados = [];

      query.forEach((orden) => {
        const pacienteNombreCompleto = (
          orden.paciente.nombre +
          ' ' +
          orden.paciente.apellido
        ).toLowerCase();
        const palabrasNombreCompleto = nombreCompleto.split(' ');
        const analisisArray: any[] = [];
        orden.analisis.forEach((element: any) => {
          if (
            element &&
            !analisisArray.some((e) => e.nombre === element.nombre)
          ) {
            analisisArray.push(element);
          }
        });
        orden.grupos_analisis.forEach((element: any) => {
          element.listado_de_analisis.forEach((element: any) => {
            if (
              element &&
              !analisisArray.some((e) => e.nombre === element.nombre)
            ) {
              analisisArray.push(element);
            }
          });
        });

        if (
          (!analisis ||
            analisisArray.some((a) =>
              a.nombre.toLowerCase().includes(analisis.toLowerCase()),
            )) &&
          (!nroOrden ||
            orden.id.toString().includes(nroOrden.toString()) ||
            orden.id.toString().startsWith(nroOrden.toString())) &&
          (!numeroDocumento ||
            orden.paciente.numeroDocumento.includes(numeroDocumento)) &&
          (!nombreCompleto ||
            palabrasNombreCompleto.every((palabra) =>
              pacienteNombreCompleto.includes(palabra),
            ))
        ) {
          resultadosFiltrados.push(orden);
        } else {
          resultadosFiltrados = resultadosFiltrados.filter(
            (element) => element.id !== orden.id,
          );
        }
        if (
          !analisis &&
          !nroOrden &&
          !numeroDocumento &&
          !nombreCompleto &&
          fechaDesde &&
          fechaHasta
        ) {
          return this.nuevaOrdenRepository
            .createQueryBuilder('NuevaOrden')
            .leftJoinAndSelect('NuevaOrden.medicos', 'MedicosEntity')
            .leftJoinAndSelect('NuevaOrden.analisis', 'AnalisisEntity')
            .leftJoinAndSelect(
              'NuevaOrden.laboratorista',
              'LaboratoristasEntity',
            )
            .leftJoinAndSelect(
              'NuevaOrden.grupos_analisis',
              'GruposAnalisisEntity',
            )
            .leftJoinAndSelect(
              'GruposAnalisisEntity.listado_de_analisis',
              'AnalisisGrupoEntity',
            )
            .leftJoinAndSelect('NuevaOrden.paciente', 'PacientesEntity')
            .leftJoinAndSelect('NuevaOrden.resultados', 'ResultadosEntity')
            .where('NuevaOrden.fecha >= :fechaDesde', { fechaDesde })
            .andWhere('NuevaOrden.fecha <= :fechaHasta', { fechaHasta })
            .getMany();
        }
      });

      return resultadosFiltrados;
    } catch (error) {
      console.error('Error al obtener órdenes:', error.message);
      throw new Error('Error al obtener órdenes.');
    }
  }

  async obtenerNuevaOrden(id: number): Promise<NuevaOrden> {
    try {
      return await this.nuevaOrdenRepository
        .createQueryBuilder('NuevaOrden')
        .leftJoinAndSelect('NuevaOrden.medicos', 'MedicosEntity')
        .leftJoinAndSelect('NuevaOrden.analisis', 'AnalisisEntity')
        .leftJoinAndSelect('NuevaOrden.laboratorista', 'LaboratoristasEntity')
        .leftJoinAndSelect('NuevaOrden.grupos_analisis', 'GruposAnalisisEntity')
        .leftJoinAndSelect(
          'GruposAnalisisEntity.listado_de_analisis',
          'AnalisisGrupoEntity',
        )
        .leftJoinAndSelect('NuevaOrden.paciente', 'PacientesEntity')
        .where('NuevaOrden.id = :id', { id: id })
        .getOne();
    } catch (error) {
      console.error('Error al obtener la orden con relaciones:', error.message);
      throw new Error('Error al obtener la orden con relaciones.');
    }
  }

  public async CrearOrden(nuevaOrden: EditarOrdenCreateDto): Promise<any> {
    let analisisIds = [];
    nuevaOrden.analisis.forEach((element) => {
      analisisIds.push(element.id);
    });
    let gruposIds = [];
    nuevaOrden.grupos_analisis.forEach((element) => {
      gruposIds.push(element.id);
    });
    const nuevaOrdenModel = this.nuevaOrdenRepository.create();
    nuevaOrdenModel.fecha = new Date();
    nuevaOrdenModel.numeroOrdenDiario = nuevaOrden.numeroOrdenDiario;
    nuevaOrdenModel.observaciones = nuevaOrden.observaciones;
    nuevaOrdenModel.observacionesInternas = nuevaOrden.observacionesInternas;
    nuevaOrdenModel.numeroHistoriaClinica = nuevaOrden.numeroHistoriaClinica;
    nuevaOrdenModel.obraSocial = nuevaOrden.obraSocial;

    const paciente = await this.pacienteRepository.findOne({
      where: { id: nuevaOrden.paciente.id },
    });

    if (!paciente) {
      throw new Error('No se pudo encontrar al paciente');
    }

    let medico;
    if (nuevaOrden.medicos && nuevaOrden.medicos.id) {
      medico = await this.medicoRepository.findOne({
        where: { id: nuevaOrden.medicos.id },
      });
    }

    let laboratorista;
    if (nuevaOrden.laboratorista && nuevaOrden.laboratorista.id) {
      laboratorista = await this.laboratoristaRepository.findOne({
        where: { id: nuevaOrden.laboratorista.id },
      });
    }

    nuevaOrdenModel.paciente = paciente;
    nuevaOrdenModel.medicos = medico || null;
    nuevaOrdenModel.laboratorista = laboratorista || null;
    nuevaOrdenModel.solicitadoPor = nuevaOrden.solicitadoPor;

    nuevaOrdenModel.analisis = nuevaOrden.analisis
      ? analisisIds.map((id) => ({ id: Number(id) } as AnalisisEntity))
      : [];
    nuevaOrdenModel.grupos_analisis = nuevaOrden.grupos_analisis
      ? gruposIds.map((id) => ({ id: Number(id) } as GruposAnalisisEntity))
      : [];

    return await this.nuevaOrdenRepository.save(nuevaOrdenModel);
  }

  public async modificarOrden(
    id: any,
    informacionNueva: EditarOrdenCreateDto,
  ): Promise<any> {
    let analisisIds = [];
    informacionNueva.analisis.forEach((element) => {
      analisisIds.push(element.id);
    });
    let gruposIds = [];
    informacionNueva.grupos_analisis.forEach((element) => {
      gruposIds.push(element.id);
    });

    try {
      let ordenAntigua: any = await this.obtenerNuevaOrden(id);

      if (!ordenAntigua) {
        return {
          statusCode: 404,
          msg: 'No existe la orden solicitada.',
        };
      }

      ordenAntigua.numeroOrdenDiario = informacionNueva.numeroOrdenDiario;
      ordenAntigua.observaciones = informacionNueva.observaciones;
      ordenAntigua.observacionesInternas =
        informacionNueva.observacionesInternas;
      ordenAntigua.numeroHistoriaClinica =
        informacionNueva.numeroHistoriaClinica;
      ordenAntigua.obraSocial = informacionNueva.obraSocial;
      ordenAntigua.solicitadoPor = informacionNueva.solicitadoPor;

      ordenAntigua.paciente = await this.pacienteRepository.findOne({
        where: { id: informacionNueva.paciente.id },
      });
      ordenAntigua.medicos = await this.medicoRepository.findOne({
        where: { id: informacionNueva.medicos.id },
      });
      ordenAntigua.laboratorista = await this.laboratoristaRepository.findOne({
        where: { id: informacionNueva.laboratorista.id },
      });

      ordenAntigua.analisis = informacionNueva.analisis
        ? analisisIds.map((id) => ({ id: Number(id) } as AnalisisEntity))
        : [];
      ordenAntigua.grupos_analisis = informacionNueva.grupos_analisis
        ? gruposIds.map((id) => ({ id: Number(id) } as GruposAnalisisEntity))
        : [];
      const ordenActualizada = await this.nuevaOrdenRepository.save(
        ordenAntigua,
      );

      return {
        statusCode: 200,
        msg: 'Información de la orden editada correctamente',
        data: ordenActualizada,
      };
    } catch (error) {
      return error;
    }
  }

  public async actualizarEstadoOrden(id: number): Promise<any> {
    try {
      const orden = await this.nuevaOrdenRepository.findOne({
        where: { id: id },
      });

      if (!orden) {
        return {
          statusCode: 404,
          msg: 'No existe la orden solicitada.',
        };
      }

      orden.impresa = true;

      await this.nuevaOrdenRepository.save(orden);

      return {
        statusCode: 200,
        msg: 'Estado de la orden actualizado correctamente.',
        data: orden,
      };
    } catch (error) {
      return error;
    }
  }

  public async ObtenerOrdenesReporteDiario(fecha: Date) {
    try {
      return await this.nuevaOrdenRepository
        .createQueryBuilder('NuevaOrden')
        .leftJoinAndSelect('NuevaOrden.analisis', 'AnalisisEntity')
        .leftJoinAndSelect('NuevaOrden.grupos_analisis', 'GruposAnalisisEntity')
        .leftJoinAndSelect(
          'GruposAnalisisEntity.listado_de_analisis',
          'AnalisisGrupoEntity',
        )
        .leftJoinAndSelect('NuevaOrden.paciente', 'PacientesEntity')
        .where('NuevaOrden.fecha >= :fecha', { fecha })
        .andWhere('NuevaOrden.fecha <= :fecha', { fecha })
        .getMany();
    } catch (error) {
      console.error('Error al obtener órdenes:', error.message);
      throw new Error('Error al obtener órdenes.');
    }
  }
  // public async obtenerResultadosPorOrden(id: number): Promise<NuevaOrden> {
  //   try {
  //     return await this.nuevaOrdenRepository
  //       .createQueryBuilder('NuevaOrden')
  //       .leftJoinAndSelect('NuevaOrden.analisis', 'AnalisisEntity')
  //       .where('NuevaOrden.id = :id', { id: id })
  //       .getOne();
  //   } catch (error) {
  //     console.error('Error al obtener la orden con relaciones:', error.message);
  //     throw new Error('Error al obtener la orden con relaciones.');
  //   }
  // }
  public async obtenerResultadosPorOrden(id: number): Promise<NuevaOrden> {
    try {
      return await this.nuevaOrdenRepository
        .createQueryBuilder('NuevaOrden')
        .leftJoinAndSelect('NuevaOrden.analisis', 'AnalisisEntity')
        .where('NuevaOrden.id = :id', { id: id })
        .getOne();
    } catch (error) {
      console.error('Error al obtener la orden con relaciones:', error.message);
      throw new Error('Error al obtener la orden con relaciones.');
    }
  }
}
