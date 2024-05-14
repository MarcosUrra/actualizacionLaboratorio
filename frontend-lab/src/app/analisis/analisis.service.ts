import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Analisis } from '../interfaces/analisis';
import { environment } from 'src/environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class AnalisisService {
  DialogoEliminarAnalisis(analisis: Observable<any>) {
    throw new Error('Method not implemented.');
  }
   

  constructor(private http: HttpClient) { }

  crearAnalisis(nuevoAnalisis: any): Observable<any> {
    return this.http.post(`${environment.baseUrl}/analisis/crearAnalisis`, nuevoAnalisis);
  }

  obtenerListadoAnalisis(): Observable<any> {
    return this.http.get(`${environment.baseUrl}/analisis/obtenerListadoAnalisis`);
  }

  obtenerUnAnalisis(id: number): Observable<any> {
    return this.http.get(`${environment.baseUrl}/analisis/obtenerUnAnalisis/${id}`);
  }

  obtenerAnalisisPorNombre(nombre: string): Observable<any> {
    return this.http.get(`${environment.baseUrl}/analisis/nombre/${nombre}`);
  }

  modificarAnalisis(id: number, analisis: Analisis): Observable<any> {
    return this.http.put(`${environment.baseUrl}/analisis/modificarAnalisis/${id}`, analisis);
  }
}
