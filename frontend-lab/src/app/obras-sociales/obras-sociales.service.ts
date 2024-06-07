import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class obrasSocialesService {
  constructor(private http: HttpClient) {}

  createObraSocial(nuevaObraSocial: any): Observable<any> {
    return this.http.post(
      `${environment.baseUrl}/obras-sociales`,
      nuevaObraSocial
    );
  }

  obtenerListadoObrasSociales(): Observable<any> {
    return this.http.get(
      `${environment.baseUrl}/obras-sociales/obtenerListadoObrasSociales`
    );
  }

  obtenerObraSocialPorId(id: number): Observable<any> {
    return this.http.get(
      `${environment.baseUrl}/obtenerObraSocialPorId/id/${id}`
    );
  }

  updateObraSocial(id: number, obra_social: any): Observable<any> {
    return this.http.patch(
      `${environment.baseUrl}/obras-sociales/${id}`,
      obra_social
    );
  }

  verificarObraSocialExistente(id: number): Observable<boolean> {
    return this.http.get<boolean>(`${environment.baseUrl}/verificar_id/${id}`);
  }
}
