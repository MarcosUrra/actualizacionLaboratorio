import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class LaboratoristasService {
  dialogoEliminarLaboratorista(laboratorista: Observable<any>) {
    throw new Error('Method not implemented.');
  }
 

  constructor(private http: HttpClient) { }

  crearLaboratorista(nuevoLaboratorista: any): Observable<any> {
    return this.http.post(`${environment.baseUrl}/laboratoristas`, nuevoLaboratorista);
  }

  obtenerListadoLaboratoristas(): Observable<any> {
    return this.http.get(`${environment.baseUrl}/laboratoristas/listadoLaboratoristas`);
  }
  
  obtenerLaboratorista(id: number): Observable<any> {
    return this.http.get(`${environment.baseUrl}/laboratoristas/id/${id}`);
  }

  modificarLaboratorista(id: number, laboratorista: any): Observable<any> {
    return this.http.patch(`${environment.baseUrl}/laboratoristas/${id}`, laboratorista);
  }


  verificarMatriculaExistente(matricula: string): Observable<boolean> {
    return this.http.get<boolean>(`${environment.baseUrl}/verificar-matricula/${matricula}`);
  }
}
