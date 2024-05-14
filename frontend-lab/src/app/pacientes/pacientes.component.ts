import { Component, AfterViewInit, ViewChild, OnInit, ChangeDetectorRef } from '@angular/core';
import { PacientesService } from './pacientes.service';
import { Pacientes } from '../interfaces/pacientes';
import { PacientesAgregarEditarComponent } from '../dialogos/pacientes-agregar-editar/pacientes-agregar-editar.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ImpresionService } from '../shared/services/impresion.service';



@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css'],
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatFormFieldModule, MatInputModule, MatIconModule, PacientesComponent],
})

export class PacientesComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['TipoDeDoc', 'NumDoc', 'Apellido', 'Nombre', 'FechaNacimiento', 'Sexo', 'Direccion', 'Localidad', 'Provincia', 'Telefono', 'Email', 'Acciones'];
  dataSource = new MatTableDataSource<Pacientes>();

  constructor(
    private pacienteService: PacientesService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef,
    private srvImpresion: ImpresionService,
  ) {
  }

  ngOnInit(): void {
    this.mostrarPacientes();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  };

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  mostrarPacientes() {
    this.pacienteService.obtenerListadoPacientes().subscribe({
      next: (dataResponse) => {
        dataResponse.sort((a: { apellido: string; }, b: { apellido: any; }) => a.apellido.localeCompare(b.apellido));
        this.dataSource.data = dataResponse;
      }, error: (e) => {
        alert("Error al cargar los pacientes");
      }
    })
  }

  DialogoNuevoPaciente() {
    const dialogRef = this.dialog.open(PacientesAgregarEditarComponent, {
      disableClose: true,
      width: "70%",
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === "creado") {
        this.mostrarPacientes();
        dialogRef.close();
      }
    });
  }

  DialogoEditarPaciente(dataPaciente: Pacientes) {
    const dialogRef = this.dialog.open(PacientesAgregarEditarComponent, {
      disableClose: true,
      width: "70%",
      data: dataPaciente
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === "editado") {
        this.mostrarPacientes();
        dialogRef.close();
      }
    });
  }

  mostrarAlerta(msg: string, accion: string) {
    this._snackBar.open(msg, accion, {
      horizontalPosition: "center",
      verticalPosition: "bottom",
      duration: 4 * 1000,
    });
  }


  onImprimir() {
    const displayedColumns: Array<keyof Pacientes> = ['tipoDocumento', 'numeroDocumento', 'apellido', 'nombre', 'fechaNacimiento', 'sexo', 'direccion', 'localidad', 'provincia', 'telefono', 'email'];
    const columnHeaders: { [key: string]: string } = {
      'tipoDocumento': 'Tipo de Documento',
      'numeroDocumento': 'Número de Documento',
      'apellido': 'Apellido',
      'nombre': 'Nombre',
      'fechaNacimiento': 'Fecha de Nacimiento',
      'sexo': 'Sexo',
      'direccion': 'Direccion',
      'localidad': 'Localidad',  
      'provincia': 'Provincia',
      'telefono': 'Telefono',
      'email': 'Email'
    };

    let data = this.dataSource.data;
    const filterValue = this.dataSource.filter;

    if (filterValue) {
      data = data.filter((item: Pacientes) => {
        for (const column of displayedColumns) {
          if (item[column] && item[column]!.toString().toLowerCase().includes(filterValue.toLowerCase())) {
            return true;
          }
        }
        return false;
      });
    }

    const formattedData = data.map((item: Pacientes) => {
      const formattedItem: { [key: string]: any } = {};
      for (const column of displayedColumns) {
        formattedItem[columnHeaders[column]] = item[column];
      }
      return formattedItem;
    });

    const displayedColumnHeaders = displayedColumns.map(column => columnHeaders[column]);

    this.srvImpresion.imprimir(formattedData, 'Listado de Pacientes', displayedColumnHeaders, true);
  }

}