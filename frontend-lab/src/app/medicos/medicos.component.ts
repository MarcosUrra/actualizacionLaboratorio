import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { MedicosService } from './medicos.service';
import { Medicos } from '../interfaces/medicos';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MedicosAgregarEditarComponent } from '../dialogos/medicos-agregar-editar/medicos-agregar-editar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChangeDetectorRef } from '@angular/core';
import { ImpresionService } from '../shared/services/impresion.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css'],
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatFormFieldModule, MatInputModule, MatIconModule, MedicosComponent],
})

export class MedicosComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['Estado','Apellido', 'Nombre', 'Matricula', 'Especialidad', 'TipoDocumento', 'NroDocumento', 'Teléfono', 'Acciones'];
  dataSource = new MatTableDataSource<Medicos>();

  constructor(
    private medicoService: MedicosService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef,
    private srvImpresion: ImpresionService

  ) {

  }

  ngOnInit(): void {
    this.mostrarMedicos();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();

    if (!filterValue.trim()) {
        this.dataSource.filter = '';
        return;
    }

    if (filterValue.startsWith('act')) {
        this.dataSource.filter = 'true';
        return;
    }

    if (filterValue.startsWith('ina')) {
        this.dataSource.filter = 'false';
        return;
    }

    this.dataSource.filter = filterValue.trim().toLowerCase();
}

  

  

  mostrarMedicos() {
    this.medicoService.obtenerListadoMedicos().subscribe({
      next: (dataResponse) => {
        dataResponse.sort((a: { apellido: string; }, b: { apellido: any; }) => a.apellido.localeCompare(b.apellido));
        this.dataSource.data = dataResponse;
      }, error: (e) => {
        alert("Error al cargar los médicos");
      }
    })
  }

  abrirDialogo() {
    this.dialog.open(MedicosAgregarEditarComponent, {
      disableClose: true,
      width: "35%",
    }).afterClosed().subscribe(resultado => {
      if (resultado === "creado") {
        this.mostrarMedicos();
      }
    })
  }

  abrirDialogoEditar(dataMedico: Medicos) {
    this.dialog.open(MedicosAgregarEditarComponent, {
      disableClose: true,
      width: "35%",
      data: dataMedico
    }).afterClosed().subscribe(resultado => {
      if (resultado === "editado") {
        this.mostrarMedicos();
      }
    })
  }

  mostrarAlerta(msg: string, accion: string) {
    this._snackBar.open(msg, accion, {
      horizontalPosition: "center",
      verticalPosition: "bottom",
      duration: 4000,
    });
  }

  getEstadoString(estado: boolean): string {
  return estado ? 'Activo' : 'Inactivo';
  }

  onImprimir() {
    const displayedColumns: Array<keyof Medicos> = ['estado', 'apellido', 'nombre', 'matricula', 'especialidad', 'tipoDocumento', 'numeroDocumento', 'telefono'];
    const columnHeaders: { [key: string]: string } = {
        'estado': 'Estado',
        'apellido': 'Apellido',
        'nombre': 'Nombre',
        'matricula': 'Matrícula',
        'especialidad': 'Especialidad',
        'tipoDocumento': 'Tipo Doc.',
        'numeroDocumento': 'Número de Documento',
        'telefono': 'Teléfono'
    };
  
    let data = this.dataSource.filteredData;
  
    const formattedData = data.map((item: Medicos) => {
        const formattedItem: { [key: string]: any } = {};
        for (const column of displayedColumns) {
            if (column === 'estado') {
                formattedItem[columnHeaders[column]] = this.getEstadoString(item[column]);
            } else {
                formattedItem[columnHeaders[column]] = item[column];
            }
        }
        return formattedItem;
    });
  
    const displayedColumnHeaders = displayedColumns.map(column => columnHeaders[column]);
  
    this.srvImpresion.imprimir(formattedData, 'Listado de Medicos', displayedColumnHeaders, true);
}

}