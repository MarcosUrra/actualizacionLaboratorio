import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicosService {

  private baseUrl = 'http://localhost:3000';


  constructor(private http: HttpClient) { }

  crearMedico(nuevoMedico: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/medicos`, nuevoMedico);
  }

  obtenerListadoMedicos(): Observable<any> {
    return this.http.get(`${this.baseUrl}/medicos/listadoMedicos`);
  }

  obtenerMedico(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/medicos/id/${id}`);
  }

  modificarMedico(id: number, medico: any): Observable<any> {
    return this.http.patch(`${this.baseUrl}/medicos/${id}`, medico);
  }


  verificarMatriculaExistente(matricula: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/verificar-matricula/${matricula}`);
  }

}
