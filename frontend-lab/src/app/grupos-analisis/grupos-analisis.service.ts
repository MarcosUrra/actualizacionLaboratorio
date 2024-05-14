import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { GrupoAnalisis } from '../interfaces/grupos-analisis'; 
import { environment } from 'src/environments/environment.development';

@Injectable({
    providedIn: 'root'
})
export class GruposAnalisisService {

    
    constructor(private http: HttpClient) { }

    crearGrupo(nuevoGrupo: any): Observable<any> {
        console.log('Datos a enviar al backend:', nuevoGrupo);
        return this.http.post(`${environment.baseUrl}/grupos_analisis/nuevoGrupo`, nuevoGrupo)
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
        return this.http.get(`${environment.baseUrl}/grupos_analisis/obtenerListadoGruposDeAnalisis`);
    }
    
    modificarGrupo(id: number, grupo: GrupoAnalisis): Observable<boolean> {
        return this.http.put<boolean>(`${environment.baseUrl}/grupos_analisis/modificarGrupo/${id}`, grupo);
    }

    obtenerListadoAnalisis(): Observable<any> {
        return this.http.get(`${environment.baseUrl}/analisis/obtenerListadoAnalisis`);
    }

    obtenerGrupoAnalisisPorId(id: number): Observable<any> {
        return this.http.get(`${environment.baseUrl}/grupos_analisis/obtenerGrupoPorId/${id}`);
    }
}
