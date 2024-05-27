// import {
//   AfterViewInit,
//   ChangeDetectorRef,
//   Component,
//   OnInit,
//   ViewChild,
// } from '@angular/core';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatIconModule } from '@angular/material/icon';
// import { MatInputModule } from '@angular/material/input';
// import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
// import { MatTableDataSource, MatTableModule } from '@angular/material/table';
// import { Analisis } from '../interfaces/analisis';
// import { AnalisisService } from './analisis.service';
// import { MatDialog } from '@angular/material/dialog';
// import { AnalisisAgregarEditarComponent } from '../dialogos/analisis-agregar-editar/analisis-agregar-editar.component';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { CommonModule } from '@angular/common';
// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { Subcategoria } from '../interfaces/subcategoria';
// import { environment } from 'src/environments/environment.development';

// @Component({
//   selector: 'app-analisis',
//   templateUrl: './analisis.component.html',
//   styleUrls: ['./analisis.component.css'],
//   standalone: true,
//   imports: [
//     MatTableModule,
//     MatPaginatorModule,
//     MatFormFieldModule,
//     MatInputModule,
//     MatIconModule,
//     AnalisisComponent,
//     CommonModule,
//   ],
// })
// export class AnalisisComponent implements AfterViewInit, OnInit {
//   displayedColumns: string[] = [
//     'Código',
//     'Subcategorías',
//     'Nombre',
//     'Valores Normales',
//     'Unidades',
//     'Acciones',
//   ];
//   dataSource = new MatTableDataSource<Analisis>();

//   constructor(
//     private analisisService: AnalisisService,
//     public dialog: MatDialog,
//     private _snackBar: MatSnackBar,
//     private cdr: ChangeDetectorRef
//   ) {}

//   ngOnInit(): void {
//     this.mostrarAnalisis();
//   }

//   @ViewChild(MatPaginator) paginator!: MatPaginator;

//   ngAfterViewInit() {
//     this.dataSource.paginator = this.paginator;
//   }

//   applyFilter(event: Event) {
//     const filterValue = (event.target as HTMLInputElement).value;
//     this.dataSource.filter = filterValue.trim().toLowerCase();
//   }

//   mostrarAnalisis() {
//     this.analisisService.obtenerListadoAnalisis().subscribe({
//       next: (dataResponse) => {
//         dataResponse.sort((a: { nombre: string }, b: { nombre: any }) =>
//           a.nombre.localeCompare(b.nombre)
//         );
//         this.dataSource.data = dataResponse;
//       },
//       error: (e) => {
//         alert('Error al cargar los análisis');
//       },
//     });
//   }

//   DialogoNuevoAnalisis() {
//     this.dialog
//       .open(AnalisisAgregarEditarComponent, {
//         disableClose: true,
//         width: '35%',
//       })
//       .afterClosed()
//       .subscribe((resultado) => {
//         if (resultado === 'creado') {
//           this.mostrarAnalisis();
//         }
//       });
//   }

//   DialogoEditarAnalisis(dataAnalisis: Analisis) {
//     this.dialog
//       .open(AnalisisAgregarEditarComponent, {
//         disableClose: true,
//         width: '35%',
//         data: dataAnalisis,
//       })
//       .afterClosed()
//       .subscribe((resultado) => {
//         if (resultado === 'editado') {
//           this.mostrarAnalisis();
//         }
//       });
//   }

//   mostrarAlerta(msg: string, accion: string) {
//     this._snackBar.open(msg, accion, {
//       horizontalPosition: 'center',
//       verticalPosition: 'bottom',
//       duration: 4 * 1000,
//     });
//   }

//   obtenerSubcategorias(analisisId: number) {
//     this.analisisService
//       .obtenerSubcategoriasPorAnalisisId(analisisId)
//       .subscribe({
//         next: (subcategorias) => {

//           console.log('Subcategorías:', subcategorias);
//         },
//         error: (e) => {
//           this.mostrarAlerta('Error al cargar las subcategorías', 'Cerrar');
//         },
//       });
//   }
// }

// ===================== va lo de arriba ==================

// import {
//   AfterViewInit,
//   ChangeDetectorRef,
//   Component,
//   OnInit,
//   ViewChild,
// } from '@angular/core';
// import { MatTableDataSource } from '@angular/material/table';
// import { MatDialog } from '@angular/material/dialog';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { MatPaginator } from '@angular/material/paginator';
// import { Analisis } from '../interfaces/analisis';
// import { AnalisisService } from './analisis.service';
// import { AnalisisAgregarEditarComponent } from '../dialogos/analisis-agregar-editar/analisis-agregar-editar.component';
// import { Subcategoria } from '../interfaces/subcategoria';

// @Component({
//   selector: 'app-analisis',
//   templateUrl: './analisis.component.html',
//   styleUrls: ['./analisis.component.css'],
// })
// export class AnalisisComponent implements AfterViewInit, OnInit {
//   displayedColumns: string[] = [
//     'Código',
//     'Nombre',
//     'Valores Normales',
//     'Unidades',
//     'Subcategorías',
//     'Acciones',
//   ];
//   dataSource = new MatTableDataSource<Analisis>();

//   constructor(
//     private analisisService: AnalisisService,
//     public dialog: MatDialog,
//     private _snackBar: MatSnackBar,
//     private cdr: ChangeDetectorRef
//   ) {}

//   @ViewChild(MatPaginator) paginator!: MatPaginator;

//   ngAfterViewInit() {
//     this.dataSource.paginator = this.paginator;
//   }

//   ngOnInit(): void {
//     this.mostrarAnalisis();
//   }

//   applyFilter(event: Event) {
//     const filterValue = (event.target as HTMLInputElement).value;
//     this.dataSource.filter = filterValue.trim().toLowerCase();
//   }

//   mostrarAnalisis() {
//     this.analisisService.obtenerListadoAnalisis().subscribe({
//       next: (dataResponse: Analisis[]) => {
//         dataResponse.sort((a, b) => a.nombre.localeCompare(b.nombre));
//         this.dataSource.data = dataResponse;
//         this.obtenerSubcategorias(dataResponse);
//       },
//       error: (e) => {
//         alert('Error al cargar los análisis');
//       },
//     });
//   }

//   obtenerSubcategorias(analisis: Analisis[]) {
//     analisis.forEach((analisisItem) => {
//       if (analisisItem.id !== undefined) {
//         // Verifica si id no es undefined
//         this.analisisService
//           .obtenerSubcategoriasPorAnalisisId(analisisItem.id)
//           .subscribe((subcategorias) => {
//             analisisItem.subcategorias = subcategorias;
//             this.dataSource._updateChangeSubscription(); // Actualiza la tabla después de asignar las subcategorías
//           });
//       }
//     });
//   }

//   DialogoNuevoAnalisis() {
//     this.dialog
//       .open(AnalisisAgregarEditarComponent, {
//         disableClose: true,
//         width: '35%',
//       })
//       .afterClosed()
//       .subscribe((resultado) => {
//         if (resultado === 'creado') {
//           this.mostrarAnalisis();
//         }
//       });
//   }

//   DialogoEditarAnalisis(dataAnalisis: Analisis) {
//     this.dialog
//       .open(AnalisisAgregarEditarComponent, {
//         disableClose: true,
//         width: '35%',
//         data: dataAnalisis,
//       })
//       .afterClosed()
//       .subscribe((resultado) => {
//         if (resultado === 'editado') {
//           this.mostrarAnalisis();
//         }
//       });
//   }

//   mostrarAlerta(msg: string, accion: string) {
//     this._snackBar.open(msg, accion, {
//       horizontalPosition: 'center',
//       verticalPosition: 'bottom',
//       duration: 4 * 1000,
//     });
//   }
// }

// import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
// import { MatTableDataSource } from '@angular/material/table';
// import { MatDialog } from '@angular/material/dialog';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { MatPaginator } from '@angular/material/paginator';
// import { Analisis } from '../interfaces/analisis';
// import { AnalisisService } from './analisis.service';
// import { Subcategoria } from '../interfaces/subcategoria';
// import { AnalisisAgregarEditarComponent } from '../dialogos/analisis-agregar-editar/analisis-agregar-editar.component';

// import {
//   AfterViewInit,
//   ChangeDetectorRef,
//   Component,
//   OnInit,
//   ViewChild,
// } from '@angular/core';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatIconModule } from '@angular/material/icon';
// import { MatInputModule } from '@angular/material/input';
// import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
// import { MatTableDataSource, MatTableModule } from '@angular/material/table';
// import { Analisis } from '../interfaces/analisis';
// import { AnalisisService } from './analisis.service';
// import { MatDialog } from '@angular/material/dialog';
// import { AnalisisAgregarEditarComponent } from '../dialogos/analisis-agregar-editar/analisis-agregar-editar.component';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { CommonModule } from '@angular/common';
// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { Subcategoria } from '../interfaces/subcategoria';
// import { environment } from 'src/environments/environment.development';

// @Component({
//   selector: 'app-analisis',
//   templateUrl: './analisis.component.html',
//   styleUrls: ['./analisis.component.css'],
// })
// export class AnalisisComponent implements OnInit, AfterViewInit {
//   displayedColumns: string[] = [
//     'Código',
//     'Nombre',
//     'Subcategorías',
//     'Valores Normales',
//     'Unidades',
//     'Acciones',
//   ];
//   dataSource = new MatTableDataSource<Analisis>();
//   mostrarDetalles = false; // Controla la visibilidad de los detalles de subcategorías
//   //subcategorias: Subcategoria[] = []; // Array para almacenar las subcategorías obtenidas
//   subcategoriaSeleccionada?: Subcategoria;

//   constructor(
//     private analisisService: AnalisisService,
//     public dialog: MatDialog,
//     private snackBar: MatSnackBar,
//     private cdr: ChangeDetectorRef
//   ) {}

//   @ViewChild(MatPaginator) paginator!: MatPaginator;

//   ngOnInit(): void {
//     this.mostrarAnalisis();
//   }

//   ngAfterViewInit(): void {
//     this.dataSource.paginator = this.paginator;
//     this.cdr.detectChanges();
//   }

//   applyFilter(event: Event): void {
//     const filterValue = (event.target as HTMLInputElement).value;
//     this.dataSource.filter = filterValue.trim().toLowerCase();
//   }

//   mostrarAnalisis(): void {
//     this.analisisService.obtenerListadoAnalisis().subscribe({
//       next: (dataResponse) => {
//         dataResponse.sort((a: { nombre: string }, b: { nombre: string }) =>
//           a.nombre.localeCompare(b.nombre)
//         );
//         this.dataSource.data = dataResponse;
//       },
//       error: (e) => {
//         this.mostrarAlerta('Error al cargar los análisis', 'Cerrar');
//       },
//     });
//   }

//   DialogoNuevoAnalisis(): void {
//     this.dialog
//       .open(AnalisisAgregarEditarComponent, {
//         disableClose: true,
//         width: '35%',
//       })
//       .afterClosed()
//       .subscribe((resultado) => {
//         if (resultado === 'creado') {
//           this.mostrarAnalisis();
//         }
//       });
//   }

//   DialogoEditarAnalisis(dataAnalisis: Analisis): void {
//     this.dialog
//       .open(AnalisisAgregarEditarComponent, {
//         disableClose: true,
//         width: '35%',
//         data: dataAnalisis,
//       })
//       .afterClosed()
//       .subscribe((resultado) => {
//         if (resultado === 'editado') {
//           this.mostrarAnalisis();
//         }
//       });
//   }

//   mostrarAlerta(msg: string, accion: string): void {
//     this.snackBar.open(msg, accion, {
//       horizontalPosition: 'center',
//       verticalPosition: 'bottom',
//       duration: 4 * 1000,
//     });
//   }

//   // Función para manejar el clic en una subcategoría
//   mostrarDetallesSubcategoria(subcategoria: Subcategoria): void {
//     console.log('Detalles de la subcategoría:', subcategoria);
//     this.subcategoriaSeleccionada = subcategoria; // Almacenar la subcategoría seleccionada
//   }
// }

import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AnalisisService } from './analisis.service';
import { Analisis } from '../interfaces/analisis';
import { Subcategoria } from '../interfaces/subcategoria';
import { AnalisisAgregarEditarComponent } from '../dialogos/analisis-agregar-editar/analisis-agregar-editar.component';
import { SubcategoriaDetallesDialogComponent } from '../dialogos/SubcategoriaDetallesDialog/SubcategoriaDetallesDialog.component';

@Component({
  selector: 'app-analisis',
  templateUrl: './analisis.component.html',
  styleUrls: ['./analisis.component.css'],
})
export class AnalisisComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'Código',
    'Nombre',
    'Subcategorías',
    'Valores Normales',
    'Unidades',
    'Acciones',
  ];
  dataSource = new MatTableDataSource<Analisis>();
  subcategoriaSeleccionada?: Subcategoria; // Propiedad para almacenar la subcategoría seleccionada
  mostrarDetalles = false; // Controla la visibilidad de los detalles de subcategorías
  subcategorias: Subcategoria[] = []; // Array para almacenar las subcategorías obtenidas

  constructor(
    private analisisService: AnalisisService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.mostrarAnalisis();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.cdr.detectChanges();
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  mostrarAnalisis(): void {
    this.analisisService.obtenerListadoAnalisis().subscribe({
      next: (dataResponse) => {
        dataResponse.sort((a: { nombre: string }, b: { nombre: string }) =>
          a.nombre.localeCompare(b.nombre)
        );
        this.dataSource.data = dataResponse;
      },
      error: (e) => {
        this.mostrarAlerta('Error al cargar los análisis', 'Cerrar');
      },
    });
  }

  DialogoNuevoAnalisis(): void {
    this.dialog
      .open(AnalisisAgregarEditarComponent, {
        disableClose: true,
        width: '35%',
      })
      .afterClosed()
      .subscribe((resultado) => {
        if (resultado === 'creado') {
          this.mostrarAnalisis();
        }
      });
  }

  DialogoEditarAnalisis(dataAnalisis: Analisis): void {
    console.log(dataAnalisis);
    this.dialog
      .open(AnalisisAgregarEditarComponent, {
        disableClose: true,
        width: '35%',
        data: dataAnalisis,
      })
      .afterClosed()
      .subscribe((resultado) => {
        if (resultado === 'editado') {
          this.mostrarAnalisis();
        }
      });
  }

  abrirDialogoEditarAnalisis(dataAnalisis: Analisis): void {
    this.dialog
      .open(AnalisisAgregarEditarComponent, {
        disableClose: true,
        width: '35%',
        data: dataAnalisis,
      })
      .afterClosed()
      .subscribe((resultado) => {
        if (resultado === 'editado') {
          this.mostrarAnalisis();
        }
      });
  }

  mostrarAlerta(msg: string, accion: string): void {
    this.snackBar.open(msg, accion, {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 4 * 1000,
    });
  }

  mostrarDetallesSubcategoria(subcategoria: Subcategoria): void {
    const dialogRef = this.dialog.open(SubcategoriaDetallesDialogComponent, {
      width: '300px',
      data: subcategoria,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('El diálogo se cerró');
    });
  }

  obtenerSubcategorias(analisisId: number): void {
    this.analisisService
      .obtenerSubcategoriasPorAnalisisId(analisisId)
      .subscribe({
        next: (subcategorias: Subcategoria[]) => {
          console.log(subcategorias);
          this.mostrarDetalles = true;
          this.subcategorias = subcategorias;
        },
        error: (e) => {
          this.mostrarAlerta('Error al cargar las subcategorías', 'Cerrar');
        },
      });
  }
}
