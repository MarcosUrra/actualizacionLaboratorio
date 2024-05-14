import { Component, AfterViewInit, ViewChild, OnInit, ChangeDetectorRef } from '@angular/core';
import { GruposAnalisisService } from './grupos-analisis.service';
import { GrupoAnalisis } from '../interfaces/grupos-analisis';
import { GruposAnalisisAgregarEditarComponent } from '../dialogos/grupos-analisis-agregar-editar/grupos-analisis-agregar-editar.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { GruposAnalisisAnalisisxgruposComponent } from '../dialogos/grupos-analisis-analisisxgrupos/grupos-analisis-analisisxgrupos.component';


@Component({
  selector: 'app-grupos-analisis',
  templateUrl: './grupos-analisis.component.html',
  styleUrls: ['./grupos-analisis.component.css'],
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    GruposAnalisisComponent
  ],
})
export class GruposAnalisisComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['nombreDelGrupo', 'nombreInforme', 'listadoAnalisis', 'Acciones'];
  dataSource = new MatTableDataSource<GrupoAnalisis>();
  columns: any;

  constructor(
    private gruposService: GruposAnalisisService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef,

  ) {

  }

  ngOnInit(): void {
    this.mostrarGrupos();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  };

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  mostrarGrupos() {
    this.gruposService.obtenerListadoGrupos().subscribe({
      next: (dataResponse) => {
        dataResponse.sort((a: { nombreDelGrupo: string; }, b: { nombreDelGrupo: any; }) => a.nombreDelGrupo.localeCompare(b.nombreDelGrupo));
        this.dataSource.data = dataResponse;
      }, error: (e) => {
        alert("Error al cargar los Grupos De Análisis");
      }
    })
  }

  verAnalisis(id: number): void {
    this.gruposService.obtenerGrupoAnalisisPorId(id).subscribe(
      (grupo) => {

        this.dialog.open(GruposAnalisisAnalisisxgruposComponent, {
          disableClose: true,
          data: { grupo }
        });
      },
      (error) => {
        console.error('Error al obtener grupo y análisis:', error);
      }
    );
  }

  DialogoNuevoGrupo() {
    this.dialog.open(GruposAnalisisAgregarEditarComponent, {
      disableClose: true,
      width: "35%",
    }).afterClosed().subscribe(resultado => {
      if (resultado === "creado") {
        this.mostrarGrupos();
      }
    })
  }

  DialogoEditarGrupo(dataGrupo: GrupoAnalisis) {
    this.dialog.open(GruposAnalisisAgregarEditarComponent, {
      disableClose: true,
      width: "35%",
      data: dataGrupo
    }).afterClosed().subscribe(resultado => {
      if (resultado === "editado") {
        this.mostrarGrupos();
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
}
