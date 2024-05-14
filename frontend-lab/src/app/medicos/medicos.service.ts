import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';




@Injectable({
  providedIn: 'root'
})
export class MedicosService {

  
  constructor(private http: HttpClient) { }

  crearMedico(nuevoMedico: any): Observable<any> {
    return this.http.post(`${environment.baseUrl}/medicos`, nuevoMedico);
  }

  obtenerListadoMedicos(): Observable<any> {
    return this.http.get(`${environment.baseUrl}/medicos/listadoMedicos`);
  }

  obtenerMedico(id: number): Observable<any> {
    return this.http.get(`${environment.baseUrl}/medicos/id/${id}`);
  }

  modificarMedico(id: number, medico: any): Observable<any> {
    return this.http.patch(`${environment.baseUrl}/medicos/${id}`, medico);
  }


  verificarMatriculaExistente(matricula: string): Observable<boolean> {
    return this.http.get<boolean>(`${environment.baseUrl}/verificar-matricula/${matricula}`);
  }

}
