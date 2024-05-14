import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  dialogoEliminarUsuario(usuario: Observable<any>) {
    throw new Error('Method not implemented.');
  }
 

  constructor(private http: HttpClient) { }

  crearUsuario(nuevoUsuario: any): Observable<any> {
    return this.http.post(`${environment.baseUrl}/usuarios/createUsuario`, nuevoUsuario);
  }

  obtenerListadoUsuarios(): Observable<any> {
    return this.http.get(`${environment.baseUrl}/usuarios`);
  }

  obtenerUsuario(id: number): Observable<any> {
    return this.http.get(`${environment.baseUrl}/usuarios/id/${id}`);
  }

  eliminarUsuarioPorId(id: number, usuario: any): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: usuario
    };

    return this.http.delete(`${environment.baseUrl}/usuarios/${id}`, options);
  }

  modificarUsuario(id: number, username: any): Observable<any> {
    return this.http.patch(`${environment.baseUrl}/usuarios/${id}`, username);
  }


  verificarUsernameExistente(username: string): Observable<boolean> {
    return this.http.get<boolean>(`${environment.baseUrl}/verificar-username/${username}`);
  }
}
