import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { NuevaOrden } from '../interfaces/nueva-orden';
import { environment } from 'src/environments/environment.development';
import { Analisis } from '../interfaces/analisis';
import { Subcategoria } from '../interfaces/subcategoria';

@Injectable({
  providedIn: 'root',
})
export class NuevaOrdenService {
  constructor(private http: HttpClient) {}

  crearNuevaOrden(unaNuevaOrden: any): Observable<any> {
    return this.http.post(
      `${environment.baseUrl}/nueva-orden/CrearOrden`,
      unaNuevaOrden
    );
  }

  ObtenerOrdenes(): Observable<any> {
    return this.http.get(`${environment.baseUrl}/nueva-orden/ObtenerOrdenes`);
  }
  ObtenerOrdenesPorFecha(
    fechaDesde: string,
    fechaHasta: string
  ): Observable<any> {
    return this.http.get(
      `${environment.baseUrl}/nueva-orden/ObtenerOrdenesPorFecha?fechaDesde=${fechaDesde}&fechaHasta=${fechaHasta}`
    );
  }
  filtrado(filtros: any): Observable<any> {
    let fechaDesde = filtros.fechaDesde;
    let fechaHasta = filtros.fechaHasta;
    let analisis = filtros.analisis;
    let nroOrden = filtros.nroOrden;
    let numeroDocumento = filtros.numeroDocumento;
    let nombreCompleto = filtros.nombreCompleto;
    return this.http.get(
      `${environment.baseUrl}/nueva-orden/filtrado?fechaDesde=${fechaDesde}&fechaHasta=${fechaHasta}&analisis=${analisis}&nroOrden=${nroOrden}&numeroDocumento=${numeroDocumento}&nombreCompleto=${nombreCompleto}`
    );
  }

  obtenerUnaNuevaOrden(id: number): Observable<any> {
    return this.http.get(`${environment.baseUrl}/nueva-orden/${id}`);
  }

  obtenerListadoAnalisis(): Observable<any> {
    return this.http.get(
      `${environment.baseUrl}/analisis/obtenerListadoAnalisis`
    );
  }

  obtenerListadoGruposAnalisis(): Observable<any> {
    return this.http.get(
      `${environment.baseUrl}/grupos_analisis/obtenerListadoGruposDeAnalisis`
    );
  }

  modificarOrden(id: number, nuevaOrden: NuevaOrden): Observable<any> {
    return this.http.patch(
      `${environment.baseUrl}/nueva-orden/${id}`,
      nuevaOrden
    );
  }

  obtenerUnAnalisis(id: number): Observable<any> {
    return this.http.get(
      `${environment.baseUrl}/analisis/obtenerAnalisis/${id}`
    );
  }

  obtenerResultadosPorOrden(idOrden: number): Observable<any> {
    return this.http.get(
      `${environment.baseUrl}/nueva-orden/obtenerResultados/${idOrden}`
    );
  }

  guardarResultados(idOrden: number, resultados: any): Observable<any> {
    return this.http
      .post(
        `${environment.baseUrl}/resultados/nuevoResultado/${idOrden}`,
        resultados
      )
      .pipe(
        catchError((error) => {
          console.error('Error en la solicitud:', error);
          return throwError('Error al guardar resultados');
        })
      );
  }

  eliminarResultado(id: number): Observable<any> {
    return this.http.delete(
      `${environment.baseUrl}/resultados/eliminarResultadoPorId/${id}`
    );
  }

  modificarResultado(
    id: number,
    nuevoResultado: any,
    idOrden: number
  ): Observable<any> {
    return this.http.put(
      `${environment.baseUrl}/resultados/actualizarResultadoPorId/${id}`,
      { nuevoResultado, idOrden }
    );
  }
  modificarResultadoSubcategorias(
    id: number,
    nuevoResultado: any,
    idAnalisis: number
  ): Observable<any> {
    return this.http.put(
      `${environment.baseUrl}/resultados/actualizarResultadoSubcategoriaPorId/${id}`,
      { nuevoResultado, idAnalisis }
    );
  }

  actualizarEstadoOrden(id: number): Observable<any> {
    return this.http.get(`${environment.baseUrl}/nueva-orden/impresa/${id}`);
  }

  // obtenerOrdenesReporteDiario(fecha: string): Observable<any[]> {
  //   const url = `${environment.baseUrl}/nueva-orden/ObtenerOrdenesReporteDiario?fecha=${fecha}`;
  //   return this.http.get<any[]>(url);
  // }
  obtenerOrdenesReporteDiario(fecha: string): Observable<any> {
    let fechaDesde = fecha;
    let fechaHasta = fecha;
    let analisis = '';
    let nroOrden = '';
    let numeroDocumento = '';
    let nombreCompleto = '';
    return this.http.get(
      `${environment.baseUrl}/nueva-orden/filtrado?fechaDesde=${fechaDesde}&fechaHasta=${fechaHasta}&analisis=${analisis}&nroOrden=${nroOrden}&numeroDocumento=${numeroDocumento}&nombreCompleto=${nombreCompleto}`
    );
  }

  obtenerAnalisisYSubcategorias(
    idOrden: number
  ): Observable<{ analisis: Analisis[]; subcategorias: Subcategoria[] }> {
    return this.http.get<{
      analisis: Analisis[];
      subcategorias: Subcategoria[];
    }>(
      `${environment.baseUrl}/ruta/para/obtener/analisis-y-subcategorias/${idOrden}`
    );
  }
}
