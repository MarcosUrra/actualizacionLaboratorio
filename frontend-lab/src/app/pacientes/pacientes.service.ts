import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pacientes } from '../interfaces/pacientes';

@Injectable({
  providedIn: 'root'
})
export class PacientesService {

  private baseUrl = 'http://localhost:3000'; 

  constructor(private http: HttpClient) { }

  crearPaciente(nuevoPaciente: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/pacientes/nuevoPaciente`, nuevoPaciente);
  }

  obtenerListadoPacientes(): Observable<any> {
    return this.http.get(`${this.baseUrl}/pacientes/obtenerListadoPacientes`);
  }

  modificarPaciente(id: number, paciente: Pacientes): Observable<any> {
    return this.http.patch(`${this.baseUrl}/pacientes/modificarPaciente/${id}`, paciente);
  }
}
