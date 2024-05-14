import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LaboratoristasService {
  dialogoEliminarLaboratorista(laboratorista: Observable<any>) {
    throw new Error('Method not implemented.');
  }
  private baseUrl = 'http://localhost:3000'; 


  constructor(private http: HttpClient) { }

  crearLaboratorista(nuevoLaboratorista: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/laboratoristas`, nuevoLaboratorista);
  }

  obtenerListadoLaboratoristas(): Observable<any> {
    return this.http.get(`${this.baseUrl}/laboratoristas/listadoLaboratoristas`);
  }
  
  obtenerLaboratorista(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/laboratoristas/id/${id}`);
  }

  modificarLaboratorista(id: number, laboratorista: any): Observable<any> {
    return this.http.patch(`${this.baseUrl}/laboratoristas/${id}`, laboratorista);
  }


  verificarMatriculaExistente(matricula: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/verificar-matricula/${matricula}`);
  }
}
