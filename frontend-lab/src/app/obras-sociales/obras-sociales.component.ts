import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { obrasSocialesService } from './obras-sociales.service';
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
import { obrasSociales } from '../interfaces/obras-sociales';
import { obrasSocialesAgregarEditarComponent } from '../dialogos/obras-sociales-agregar-editar/obras-sociales-agregar-editar.component';

@Component({
  selector: 'app-obras-sociales',
  templateUrl: './obras-sociales.component.html',
  styleUrls: ['./obras-sociales.component.css'],
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    //solicitadoPorComponent,
  ],
})
export class obrasSocialesComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = [
    'Estado',
    'nombreObraSocial',
    'CUIT',
    'direccion',
    'Teléfono',
    'email',
    'web',
    'Acciones',
  ];
  dataSource = new MatTableDataSource<obrasSociales>();

  constructor(
    private obrasSocialesService: obrasSocialesService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef,
    private srvImpresion: ImpresionService
  ) {}

  ngOnInit(): void {
    this.mostrarObrasSociales();
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

  // mostrarSolicitadoPor() {
  //   this.solicitadoPorService.obtenerListadoSolicitadoPor().subscribe({
  //     next: (dataResponse) => {
  //       dataResponse.sort(
  //         (
  //           a: { nombresolicitadoPor: string },
  //           b: { nombresolicitadoPor: any }
  //         ) => a.nombresolicitadoPor.localeCompare(b.nombresolicitadoPor)
  //       );
  //       this.dataSource.data = dataResponse;
  //     },
  //     error: (e) => {
  //       alert('Error al cargar las areas solicitantes');
  //     },
  //   });
  // }

  mostrarObrasSociales() {
    this.obrasSocialesService.obtenerListadoObrasSociales().subscribe({
      next: (dataResponse) => {
        dataResponse.sort(
          (
            a: { nombreObraSocial: string | null | undefined },
            b: { nombreObraSocial: string | null | undefined }
          ) => {
            if (!a.nombreObraSocial) return 1;
            if (!b.nombreObraSocial) return -1;

            return a.nombreObraSocial.localeCompare(b.nombreObraSocial);
          }
        );
        this.dataSource.data = dataResponse;
      },
      error: (e) => {
        alert('Error al cargar las obras sociales');
      },
    });
  }

  abrirDialogo() {
    this.dialog
      .open(obrasSocialesAgregarEditarComponent, {
        disableClose: true,
        width: '35%',
      })
      .afterClosed()
      .subscribe((resultado) => {
        if (resultado === 'creado') {
          this.mostrarObrasSociales();
        }
      });
  }

  abrirDialogoEditar(dataObrasSociales: obrasSociales) {
    this.dialog
      .open(solicitadoPorAgregarEditarComponent, {
        disableClose: true,
        width: '35%',
        data: dataObrasSociales,
      })
      .afterClosed()
      .subscribe((resultado) => {
        if (resultado === 'editado') {
          this.mostrarObrasSociales();
        }
      });
  }

  mostrarAlerta(msg: string, accion: string) {
    this._snackBar.open(msg, accion, {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 4000,
    });
  }

  getEstadoString(estado: boolean): string {
    return estado ? 'Activo' : 'Inactivo';
  }

  onImprimir() {
    const displayedColumns: Array<keyof obrasSociales> = [
      'estado',
      'nombreObraSocial',
      'CUIT',
      'direccion',
      'telefono',
      'email',
      'web',
    ];
    const columnHeaders: { [key: string]: string } = {
      estado: 'Estado',
      nombreObraSocial: 'NombreObraSocial',
      CUIT: 'CUIT',
      direccion: 'direccion',
      telefono: 'Teléfono',
      email: 'Email',
      web: 'Web',
    };

    let data = this.dataSource.filteredData;

    const formattedData = data.map((item: obrasSociales) => {
      const formattedItem: { [key: string]: any } = {};
      for (const column of displayedColumns) {
        if (column === 'estado') {
          formattedItem[columnHeaders[column]] = this.getEstadoString(
            item[column]
          );
        } else {
          formattedItem[columnHeaders[column]] = item[column];
        }
      }
      return formattedItem;
    });

    const displayedColumnHeaders = displayedColumns.map(
      (column) => columnHeaders[column]
    );

    this.srvImpresion.imprimir(
      formattedData,
      'Listado de obras sociales',
      displayedColumnHeaders,
      true
    );
  }
}
