import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { solicitadoPorService } from './solicitado-por.service';
import { solicitadoPor } from '../interfaces/solicitado-por';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { solicitadoPorAgregarEditarComponent } from '../dialogos/solicitado-por-agregar-editar/solicitado-por-agregar-editar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChangeDetectorRef } from '@angular/core';
import { ImpresionService } from '../shared/services/impresion.service';

@Component({
  selector: 'app-solicitado-por',
  templateUrl: './solicitado-por.component.html',
  styleUrls: ['./solicitado-por.component.css'],
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatFormFieldModule, MatInputModule, MatIconModule, solicitadoPorComponent],
})

export class solicitadoPorComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['Estado','Nombre area', 'Dirección', 'Provincia', 'Provincia', 'Ciudad', 'Teléfono', 'Acciones'];
  dataSource = new MatTableDataSource<solicitadoPor>();

  constructor(
    private solicitadoPorService: solicitadoPorService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef,
    private srvImpresion: ImpresionService

  ) {

  }

  ngOnInit(): void {
    this.mostrarSolicitadoPor();
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

  

  

  mostrarSolicitadoPor() {
    this.solicitadoPorService.obtenerListadoSolicitadoPor().subscribe({
      next: (dataResponse) => {
        dataResponse.sort((a: { nombresolicitadoPor: string; }, b: { nombresolicitadoPor: any; }) => a.nombresolicitadoPor.localeCompare(b.nombresolicitadoPor));
        this.dataSource.data = dataResponse;
      }, error: (e) => {
        alert("Error al cargar las areas solicitantes");
      }
    })
  }

  abrirDialogo() {
    this.dialog.open(solicitadoPorAgregarEditarComponent, {
      disableClose: true,
      width: "35%",
    }).afterClosed().subscribe(resultado => {
      if (resultado === "creado") {
        this.mostrarSolicitadoPor();
      }
    })
  }

  abrirDialogoEditar(dataSolicitadoPor: solicitadoPor) {
    this.dialog.open(solicitadoPorAgregarEditarComponent, {
      disableClose: true,
      width: "35%",
      data: dataSolicitadoPor
    }).afterClosed().subscribe(resultado => {
      if (resultado === "editado") {
        this.mostrarSolicitadoPor();
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
    const displayedColumns: Array<keyof solicitadoPor> = ['estado', 'nombreSolicitadoPor', 'direccion', 'provincia', 'ciudad', 'telefono'];
    const columnHeaders: { [key: string]: string } = {
        'estado': 'Estado',
        'nombreSolicitadoPor': 'NombreSolicitadoPor',
        'direccion': 'Direccion',
        'provincia': 'Provincia',
        'ciudad': 'Ciudad',
        'telefono': 'Teléfono'
    };
  
    let data = this.dataSource.filteredData;
  
    const formattedData = data.map((item: solicitadoPor) => {
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
  
    this.srvImpresion.imprimir(formattedData, 'Listado de areas solicitantes', displayedColumnHeaders, true);
}

}