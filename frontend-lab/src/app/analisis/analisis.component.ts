import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Analisis } from '../interfaces/analisis';
import { AnalisisService } from './analisis.service';
import { MatDialog } from '@angular/material/dialog';
import { AnalisisAgregarEditarComponent } from '../dialogos/analisis-agregar-editar/analisis-agregar-editar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-analisis',
  templateUrl: './analisis.component.html',
  styleUrls: ['./analisis.component.css'],
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatFormFieldModule, MatInputModule, MatIconModule,AnalisisComponent],
})
export class AnalisisComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['Código','Nombre','Valores Normales', 'Unidades','Acciones'];
  dataSource = new MatTableDataSource<Analisis>();
 

  constructor(
    private analisisService: AnalisisService,
    public dialog: MatDialog,
    private _snackBar:MatSnackBar,
    private cdr: ChangeDetectorRef,
    ){

    }

  ngOnInit(): void {
    this.mostrarAnalisis();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  };

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  mostrarAnalisis(){
    this.analisisService.obtenerListadoAnalisis().subscribe({
      next:(dataResponse)=>{
        
        dataResponse.sort((a: { nombre: string; }, b: { nombre: any; }) => a.nombre.localeCompare(b.nombre));
        this.dataSource.data=dataResponse;
      }, error:(e)=>{
        alert("Error al cargar los análisis");
      }
    })    
  }

  DialogoNuevoAnalisis() {
    this.dialog.open(AnalisisAgregarEditarComponent, {
      disableClose:true,
      width: "35%",
    }).afterClosed().subscribe(resultado=>{
      if(resultado=== "creado"){
        this.mostrarAnalisis();
      }
    });
  }

  DialogoEditarAnalisis(dataAnalisis: Analisis){
    this.dialog.open(AnalisisAgregarEditarComponent, {
      disableClose:true,
      width: "35%",
      data:dataAnalisis
    }).afterClosed().subscribe(resultado=>{
      if(resultado === "editado"){
        this.mostrarAnalisis();
      }
    });
  }

  mostrarAlerta(msg: string, accion: string) {
    this._snackBar.open(msg, accion, {
      horizontalPosition:"center",
      verticalPosition:"bottom",
      duration: 4 * 1000,
    });
  }

}





