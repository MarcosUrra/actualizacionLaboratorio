import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { GrupoAnalisis } from '../interfaces/grupos-analisis'; 

@Injectable({
    providedIn: 'root'
})
export class GruposAnalisisService {

    private baseUrl = 'http://localhost:3000'; 

    constructor(private http: HttpClient) { }

    crearGrupo(nuevoGrupo: any): Observable<any> {
        console.log('Datos a enviar al backend:', nuevoGrupo);
        return this.http.post(`${this.baseUrl}/grupos_analisis/nuevoGrupo`, nuevoGrupo)
            .pipe(
                catchError((error) => {
                    console.error('Error en la solicitud HTTP:', error);
                    if (error instanceof HttpErrorResponse) {
                        console.error('Status:', error.status);
                        console.error('Body:', error.error);
                    }
                    return throwError(error);
                })
            );
    }
    
    obtenerListadoGrupos(): Observable<any> {
        return this.http.get(`${this.baseUrl}/grupos_analisis/obtenerListadoGruposDeAnalisis`);
    }
    
    modificarGrupo(id: number, grupo: GrupoAnalisis): Observable<boolean> {
        return this.http.put<boolean>(`${this.baseUrl}/grupos_analisis/modificarGrupo/${id}`, grupo);
    }

    obtenerListadoAnalisis(): Observable<any> {
        return this.http.get(`${this.baseUrl}/analisis/obtenerListadoAnalisis`);
    }

    obtenerGrupoAnalisisPorId(id: number): Observable<any> {
        return this.http.get(`${this.baseUrl}/grupos_analisis/obtenerGrupoPorId/${id}`);
    }
}
