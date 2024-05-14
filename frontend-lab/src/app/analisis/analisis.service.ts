import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Analisis } from '../interfaces/analisis';


@Injectable({
  providedIn: 'root'
})
export class AnalisisService {
  DialogoEliminarAnalisis(analisis: Observable<any>) {
    throw new Error('Method not implemented.');
  }
  private baseUrl = 'http://localhost:3000'; 


  constructor(private http: HttpClient) { }

  crearAnalisis(nuevoAnalisis: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/analisis/crearAnalisis`, nuevoAnalisis);
  }

  obtenerListadoAnalisis(): Observable<any> {
    return this.http.get(`${this.baseUrl}/analisis/obtenerListadoAnalisis`);
  }

  obtenerUnAnalisis(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/analisis/obtenerUnAnalisis/${id}`);
  }

  obtenerAnalisisPorNombre(nombre: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/analisis/nombre/${nombre}`);
  }

  modificarAnalisis(id: number, analisis: Analisis): Observable<any> {
    return this.http.put(`${this.baseUrl}/analisis/modificarAnalisis/${id}`, analisis);
  }
}
