import { Component,AfterViewInit,ViewChild, OnInit } from '@angular/core';
import { LaboratoristasService } from './laboratoristas.service';
import { Laboratoristas } from '../interfaces/laboratoristas';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatDialog} from '@angular/material/dialog';
import {LaboratoristasAgregarEditarComponent} from '../dialogos/laboratoristas-agregar-editar/laboratoristas-agregar-editar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChangeDetectorRef } from '@angular/core';
import { ImpresionService } from '../shared/services/impresion.service';

@Component({
  selector: 'app-laboratoristas',
  templateUrl: './laboratoristas.component.html',
  styleUrls: ['./laboratoristas.component.css'],
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatFormFieldModule, MatInputModule, MatIconModule, LaboratoristasComponent],
})

export class LaboratoristasComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['Estado','Apellido','Nombre','Matricula','Especialidad','TipoDocumento','NroDocumento','Teléfono', 'Acciones'];
  dataSource = new MatTableDataSource<Laboratoristas>();
  lab: any;

  constructor(
    private laboratoristaService: LaboratoristasService,
    public dialog: MatDialog,
    private _snackBar:MatSnackBar,
    private cdr: ChangeDetectorRef,
    private srvImpresion:ImpresionService
    ){

    }

    ngOnInit(): void {
      this.mostrarLaboratoristas();
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


  mostrarLaboratoristas(){
    this.laboratoristaService.obtenerListadoLaboratoristas().subscribe({
      next:(dataResponse)=>{
        dataResponse.sort((a: { apellido: string; }, b: { apellido: any; }) => a.apellido.localeCompare(b.apellido));
        this.dataSource.data=dataResponse;
      }, error:(e)=>{
        alert("Error al cargar los laboratoristas");
      }
    })    
  }

  abrirDialogo() {
    this.dialog.open(LaboratoristasAgregarEditarComponent, {
      disableClose:true,
      width: "35%",
    }).afterClosed().subscribe(resultado=>{
      if(resultado=== "creado"){
        this.mostrarLaboratoristas();
      }
    })
  }

  abrirDialogoEditar(dataLaboratorista:Laboratoristas) {
    this.dialog.open(LaboratoristasAgregarEditarComponent,{
      disableClose:true,
      width: "35%",
      data:dataLaboratorista
    }).afterClosed().subscribe(resultado=>{
      if(resultado === "editado"){
        this.mostrarLaboratoristas();
      }
    })
  }

  mostrarAlerta(msg: string, accion: string) {
    this._snackBar.open(msg, accion, {
      horizontalPosition:"center",
      verticalPosition:"bottom",
      duration: 4000,
    });
  }


  getEstadoString(estado: boolean): string {
    return estado ? 'Activo' : 'Inactivo';
  }

  onImprimir() {
    const displayedColumns: Array<keyof Laboratoristas> = ['estado','apellido','nombre','matricula','especialidad','tipoDocumento','numeroDocumento','telefono'];
    const columnHeaders: {[key: string]: string} = {
      'estado': 'Estado',
      'apellido': 'Apellido',
      'nombre': 'Nombre',
      'matricula': 'Matrícula',
      'especialidad': 'Especialidad',
      'tipoDocumento': 'Tipo Doc.',
      'numeroDocumento': 'Número de Documento',
      'telefono':'Teléfono'
    };
    
    let data = this.dataSource.filteredData;
  
    const formattedData = data.map((item: Laboratoristas) => {
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
  
    this.srvImpresion.imprimir(formattedData, 'Listado de Laboratoristas', displayedColumnHeaders, true);
  }
}