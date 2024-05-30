import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class solicitadoPorService {
  constructor(private http: HttpClient) {}

  createSolicitadoPor(nuevoSolicitadoPor: any): Observable<any> {
    return this.http.post(
      `${environment.baseUrl}/solicitado-por`,
      nuevoSolicitadoPor
    );
  }

  obtenerListadoSolicitadoPor(): Observable<any> {
    return this.http.get(
      `${environment.baseUrl}/solicitado-por/listadoSolicitantes`
    );
  }

  obtenerSolicitadoPor(id: number): Observable<any> {
    return this.http.get(`${environment.baseUrl}/solicitado-por/id/${id}`);
  }

  modificarSolicitadoPor(id: number, solicitado_por: any): Observable<any> {
    return this.http.patch(
      `${environment.baseUrl}/solicitado-por/${id}`,
      solicitado_por
    );
  }

  verificarSolicitadoPorExistente(id: number): Observable<boolean> {
    return this.http.get<boolean>(`${environment.baseUrl}/verificar_id/${id}`);
  }
}
