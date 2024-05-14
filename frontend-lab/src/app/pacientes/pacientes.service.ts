import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pacientes } from '../interfaces/pacientes';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PacientesService {


  constructor(private http: HttpClient) { }

  crearPaciente(nuevoPaciente: any): Observable<any> {
    return this.http.post(`${environment.baseUrl}/pacientes/nuevoPaciente`, nuevoPaciente);
  }

  obtenerListadoPacientes(): Observable<any> {
    return this.http.get(`${environment.baseUrl}/pacientes/obtenerListadoPacientes`);
  }

  modificarPaciente(id: number, paciente: Pacientes): Observable<any> {
    return this.http.patch(`${environment.baseUrl}/pacientes/modificarPaciente/${id}`, paciente);
  }
}
