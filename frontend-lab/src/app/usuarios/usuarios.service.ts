import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  dialogoEliminarUsuario(usuario: Observable<any>) {
    throw new Error('Method not implemented.');
  }
  private baseUrl = 'http://localhost:3000';


  constructor(private http: HttpClient) { }

  crearUsuario(nuevoUsuario: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/usuarios/createUsuario`, nuevoUsuario);
  }

  obtenerListadoUsuarios(): Observable<any> {
    return this.http.get(`${this.baseUrl}/usuarios`);
  }

  obtenerUsuario(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/usuarios/id/${id}`);
  }

  eliminarUsuarioPorId(id: number, usuario: any): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: usuario
    };

    return this.http.delete(`${this.baseUrl}/usuarios/${id}`, options);
  }

  modificarUsuario(id: number, username: any): Observable<any> {
    return this.http.patch(`${this.baseUrl}/usuarios/${id}`, username);
  }


  verificarUsernameExistente(username: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/verificar-username/${username}`);
  }
}
