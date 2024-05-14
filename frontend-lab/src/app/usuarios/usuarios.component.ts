import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChangeDetectorRef } from '@angular/core';
import { UsuariosAgregarEditarComponent } from '../dialogos/usuarios-agregar-editar/usuarios/usuarios-agregar-editar.component';
import { Usuarios } from '../interfaces/usuarios';
import { UsuariosService } from './usuarios.service';



@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatFormFieldModule, MatInputModule, MatIconModule],
})

export class UsuariosComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['Estado','Apellido', 'Nombre', 'Usuario', 'Contraseña', 'Role', 'Acciones'];
  dataSource = new MatTableDataSource<Usuarios>();

  constructor(
    private usuarioService: UsuariosService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {

  }

  ngOnInit(): void {
    this.mostrarUsuarios();
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

  mostrarUsuarios() {
    this.usuarioService.obtenerListadoUsuarios().subscribe({
      next: (dataResponse) => {
        dataResponse.sort((a: { apellido: string; }, b: { apellido: any; }) => a.apellido.localeCompare(b.apellido));
        this.dataSource.data = dataResponse;
      }, error: (e) => {
        alert("Error al cargar los usuarios");
      }
    })
  }

  abrirDialogo() {
    this.dialog.open(UsuariosAgregarEditarComponent, {
      disableClose: true,
      width: "35%",
    }).afterClosed().subscribe(resultado => {
      if (resultado === "creado") {
        this.mostrarUsuarios();
      }
    })
  }

  abrirDialogoEditar(dataUsuario: Usuarios) {
    this.dialog.open(UsuariosAgregarEditarComponent, {
      disableClose: true,
      width: "35%",
      data: dataUsuario
    }).afterClosed().subscribe(resultado => {
      if (resultado === "editado") {
        this.mostrarUsuarios();
      }
    })
  }

  mostrarAlerta(msg: string, accion: string) {
    this._snackBar.open(msg, accion, {
      horizontalPosition: "center",
      verticalPosition: "bottom",
      duration: 3000,
    });
  }

 

  getEstadoString(estado: boolean): string {
    return estado ? 'Activo' : 'Inactivo';
  }
}
