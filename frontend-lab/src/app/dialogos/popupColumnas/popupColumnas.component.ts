import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
    selector: 'pop-up-columnas',
    templateUrl: './popUpColumnas.component.html',
    styleUrls: ['./popupColumnas.component.css']
})
export class PopUpColumnasComponent {
    columnasSeleccionadas: string[] = [];
    columnasAlias: { [key: string]: string } = {
        'NumeroOrden': 'Número de Análisis',
        'NumDoc': 'Número de Documento',
        'Apellido': 'Apellido',
        'Nombre': 'Nombre',
        'numeroHistoriaClinica': 'Número de Historia Clínica',
        'obraSocial': 'Obra Social',
        'solicitadoPor': 'Solicitado Por',
        'Medico': 'Médico',
        'Laboratorista': 'Laboratorista',
        'FechaSolicitud': 'Fecha de Solicitud',
        'NumeroOrdenDiario': 'Número de Orden Diario',
        'ListadoAnalisis': 'Listado de Análisis',
        'observaciones': 'Observaciones',
        'observacionesInternas': 'Observaciones Internas'
    };
    columnasResultado: string[] = [];
    arrayResultado: string[] = [];
    constructor(
        public dialogRef: MatDialogRef<PopUpColumnasComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        if (Array.isArray(data.columnasSeleccionadas)) {
            this.columnasSeleccionadas = data.columnasSeleccionadas.filter((col: string) => col !== 'Acciones');
            // this.columnasResultado = data.columnasSeleccionadas.filter((col: string) => col !== 'Acciones');
            for (const key in this.columnasAlias) {
                if (Object.prototype.hasOwnProperty.call(this.columnasAlias, key)) {
                    this.columnasSeleccionadas.forEach(element => {
                        if (element == key) {
                            this.columnasResultado.push(this.columnasAlias[key])
                        }
                    });
                }
            }
        }
    }

    drop(event: CdkDragDrop<string[]>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(
                event.container.data,
                event.previousIndex,
                event.currentIndex
            );

            this.columnasSeleccionadas = event.container.data;
        }
    }

    cerrarDialogo(): void {
        // console.log(this.columnasSeleccionadas)
        this.columnasResultado.forEach(columna => {
            for (const key in this.columnasAlias) {
                if (Object.prototype.hasOwnProperty.call(this.columnasAlias, key)) {
                    if (columna == this.columnasAlias[key]) {
                        this.arrayResultado.push(key)
                    }
                }
            }
        });
        // console.log(this.arrayResultado)

        this.dialogRef.close(this.arrayResultado);
    }
}
