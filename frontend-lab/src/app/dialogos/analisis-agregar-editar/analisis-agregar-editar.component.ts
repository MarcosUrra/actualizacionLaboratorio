// import { Component, Inject, OnInit } from '@angular/core';
// import { Analisis } from 'src/app/interfaces/analisis';
// import { AnalisisService } from 'src/app/analisis/analisis.service';
// import { MAT_DATE_FORMATS } from '@angular/material/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { Subcategoria } from 'src/app/interfaces/subcategoria';

// export const MY_DATE_FORMATS = {
//   parse: {
//     dateInput: 'DD/MM/YYYY',
//   },
//   display: {
//     dateInput: 'DD/MM/YYYY',
//     monthYearLabel: 'MMMM YYYY',
//     dateA11yLabel: 'LL',
//     monthYearA11yLabel: 'MMMM YYYY',
//   },
// };

// @Component({
//   selector: 'app-analisis-agregar-editar',
//   templateUrl: './analisis-agregar-editar.component.html',
//   styleUrls: ['./analisis-agregar-editar.component.css'],
//   providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }],
// })
// export class AnalisisAgregarEditarComponent implements OnInit {
//   formAnalisis: FormGroup;
//   tituloAccion: string = 'NUEVO';
//   botonAccion: string = 'GUARDAR';
//   subcategorias: Subcategoria[] = [];

//   constructor(
//     private dialogoReferencia: MatDialogRef<AnalisisAgregarEditarComponent>,
//     private fb: FormBuilder,
//     private snackBar: MatSnackBar,
//     private analisisService: AnalisisService,
//     @Inject(MAT_DIALOG_DATA) public dataAnalisis: Analisis
//   ) {
//     this.formAnalisis = this.fb.group({
//       codigo: [
//         '',
//         [Validators.required, Validators.pattern(/^\d+([-.\s]?\d+)*$/)],
//       ],
//       nombre: [
//         '',
//         [
//           Validators.required,
//           Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s() ']+/),
//         ],
//       ],
//       valores: ['', Validators.required],
//       unidades: ['', Validators.required],
//       subcategorias: this.fb.array([]),
//     });
//   }

//   get subcategoriasFormArray() {
//     return this.formAnalisis.get('subcategorias') as FormArray;
//   }

//   agregarSubcategoria(event: any): void {
//     const input = event.input;
//     const value = event.value;

//     if ((value || '').trim()) {
//       this.subcategoriasFormArray.push(this.fb.control(value.trim()));
//     }

//     if (input) {
//       input.value = '';
//     }
//   }

//   mostrarAlerta(msg: string, accion: string) {
//     this.snackBar.open(msg, accion, {
//       horizontalPosition: 'center',
//       verticalPosition: 'bottom',
//       duration: 4 * 1000,
//     });
//   }

//   agregarEditarAnalisis() {
//     console.log(this.formAnalisis.value);

//     const subcategoriasSeleccionadas = this.formAnalisis.value
//       .subcategorias as number[];
//     const subcategoriasModelo: Subcategoria[] = [];

//     this.subcategorias.forEach((subcategoria) => {
//       if (subcategoriasSeleccionadas.includes(subcategoria.id)) {
//         subcategoriasModelo.push(subcategoria);
//       }
//     });

//     const modelo: Analisis = {
//       id: this.dataAnalisis == null ? 0 : this.dataAnalisis.id,
//       codigo: this.formAnalisis.value.codigo,
//       nombre: this.formAnalisis.value.nombre,
//       valores: this.formAnalisis.value.valores,
//       unidades: this.formAnalisis.value.unidades,
//       subcategorias: subcategoriasModelo || [],
//     };

//     if (this.dataAnalisis == null) {
//       this.analisisService.crearAnalisis(modelo).subscribe({
//         next: (data) => {
//           this.mostrarAlerta('Análisis registrado correctamente.', 'Listo');
//           this.dialogoReferencia.close({ listadoAnalisisValores: data });
//           console.log(data);
//         },
//         error: (e) => {
//           this.mostrarAlerta('El análisis ya existe.', 'Error');
//         },
//       });
//     } else {
//       if (this.dataAnalisis.id !== undefined) {
//         this.analisisService
//           .modificarAnalisis(this.dataAnalisis.id, modelo)
//           .subscribe({
//             next: (data) => {
//               this.mostrarAlerta('Análisis modificado correctamente.', 'Listo');
//               this.dialogoReferencia.close({ listadoAnalisisValores: data });
//             },
//             error: (e) => {
//               this.mostrarAlerta('No se pudo modificar el análisis.', 'Error');
//             },
//           });
//       }
//     }
//   }

//   ngOnInit() {
//     if (this.dataAnalisis) {
//       this.formAnalisis.patchValue({
//         codigo: this.dataAnalisis.codigo,
//         nombre: this.dataAnalisis.nombre,
//         valores: this.dataAnalisis.valores,
//         unidades: this.dataAnalisis.unidades,
//         subcategorias: this.dataAnalisis.subcategorias
//           ? this.dataAnalisis.subcategorias.map((sub) => sub.id)
//           : null,
//       });

//       this.tituloAccion = 'EDITAR';
//       this.botonAccion = 'ACTUALIZAR';
//     }
//   }
// }

//===========================================================

// import { Component, Inject, OnInit } from '@angular/core';
// import { Analisis } from 'src/app/interfaces/analisis';
// import { AnalisisService } from 'src/app/analisis/analisis.service';
// import { MAT_DATE_FORMATS } from '@angular/material/core';
// import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
// import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { Subcategoria } from 'src/app/interfaces/subcategoria';

// export const MY_DATE_FORMATS = {
//   parse: {
//     dateInput: 'DD/MM/YYYY',
//   },
//   display: {
//     dateInput: 'DD/MM/YYYY',
//     monthYearLabel: 'MMMM YYYY',
//     dateA11yLabel: 'LL',
//     monthYearA11yLabel: 'MMMM YYYY',
//   },
// };

// @Component({
//   selector: 'app-analisis-agregar-editar',
//   templateUrl: './analisis-agregar-editar.component.html',
//   styleUrls: ['./analisis-agregar-editar.component.css'],
//   providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }],
// })
// export class AnalisisAgregarEditarComponent implements OnInit {
//   formAnalisis: FormGroup;
//   tituloAccion: string = 'NUEVO';
//   botonAccion: string = 'GUARDAR';
//   subcategorias: Subcategoria[] = [];

//   constructor(
//     private dialogoReferencia: MatDialogRef<AnalisisAgregarEditarComponent>,
//     private fb: FormBuilder,
//     private snackBar: MatSnackBar,
//     private analisisService: AnalisisService,
//     @Inject(MAT_DIALOG_DATA) public dataAnalisis: Analisis
//   ) {
//     this.formAnalisis = this.fb.group({
//       codigo: [
//         '',
//         [Validators.required, Validators.pattern(/^\d+([-.\s]?\d+)*$/)],
//       ],
//       nombre: [
//         '',
//         [
//           Validators.required,
//           Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s() ']+/),
//         ],
//       ],
//       valores: ['', Validators.required],
//       unidades: ['', Validators.required],
//       subcategorias: this.fb.array([]),
//     });
//   }

//   get subcategoriasFormArray() {
//     return this.formAnalisis.get('subcategorias') as FormArray;
//   }

//   agregarSubcategoria(event: any): void {
//     const input = event.input;
//     const value = event.value;

//     if ((value || '').trim()) {
//       this.subcategoriasFormArray.push(this.fb.control(value.trim()));
//     }

//     if (input) {
//       input.value = '';
//     }
//   }

//   mostrarAlerta(msg: string, accion: string) {
//     this.snackBar.open(msg, accion, {
//       horizontalPosition: 'center',
//       verticalPosition: 'bottom',
//       duration: 4 * 1000,
//     });
//   }

//   agregarEditarAnalisis() {
//     console.log(this.formAnalisis.value);

//     const modelo: Analisis = {
//       id: this.dataAnalisis == null ? 0 : this.dataAnalisis.id,
//       codigo: this.formAnalisis.value.codigo,
//       nombre: this.formAnalisis.value.nombre,
//       valores: this.formAnalisis.value.valores,
//       unidades: this.formAnalisis.value.unidades,
//       subcategorias: this.subcategoriasFormArray.value || [],
//     };

//     if (this.dataAnalisis == null) {
//       this.analisisService.crearAnalisis(modelo).subscribe({
//         next: (data) => {
//           this.mostrarAlerta('Análisis registrado correctamente.', 'Listo');
//           this.dialogoReferencia.close({ listadoAnalisisValores: data });
//           console.log(data);
//         },
//         error: (e) => {
//           this.mostrarAlerta('El análisis ya existe.', 'Error');
//         },
//       });
//     } else {
//       if (this.dataAnalisis.id !== undefined) {
//         this.analisisService
//           .modificarAnalisis(this.dataAnalisis.id, modelo)
//           .subscribe({
//             next: (data) => {
//               this.mostrarAlerta('Análisis modificado correctamente.', 'Listo');
//               this.dialogoReferencia.close({ listadoAnalisisValores: data });
//             },
//             error: (e) => {
//               this.mostrarAlerta('No se pudo modificar el análisis.', 'Error');
//             },
//           });
//       }
//     }
//   }

//   ngOnInit() {
//     if (this.dataAnalisis) {
//       this.formAnalisis.patchValue({
//         codigo: this.dataAnalisis.codigo,
//         nombre: this.dataAnalisis.nombre,
//         valores: this.dataAnalisis.valores,
//         unidades: this.dataAnalisis.unidades,
//       });

//       if (this.dataAnalisis.subcategorias) {
//         this.dataAnalisis.subcategorias.forEach((sub) => {
//           this.subcategoriasFormArray.push(this.fb.control(sub));
//         });
//       }

//       this.tituloAccion = 'EDITAR';
//       this.botonAccion = 'ACTUALIZAR';
//     }
//   }
// }
// ====================================================

import { Component, Inject, OnInit } from '@angular/core';
import { Analisis } from 'src/app/interfaces/analisis';
import { AnalisisService } from 'src/app/analisis/analisis.service';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subcategoria } from 'src/app/interfaces/subcategoria';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-analisis-agregar-editar',
  templateUrl: './analisis-agregar-editar.component.html',
  styleUrls: ['./analisis-agregar-editar.component.css'],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }],
})
export class AnalisisAgregarEditarComponent implements OnInit {
  formAnalisis: FormGroup;
  tituloAccion: string = 'NUEVO';
  botonAccion: string = 'GUARDAR';
  subcategorias: Subcategoria[] = [];

  constructor(
    private dialogoReferencia: MatDialogRef<AnalisisAgregarEditarComponent>,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private analisisService: AnalisisService,
    @Inject(MAT_DIALOG_DATA) public dataAnalisis: Analisis
  ) {
    this.formAnalisis = this.fb.group({
      codigo: [
        '',
        [Validators.required, Validators.pattern(/^\d+([-.\s]?\d+)*$/)],
      ],
      nombre: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s() ']+/),
        ],
      ],
      valores: ['', Validators.required],
      unidades: ['', Validators.required],
      subcategorias: [''],
    });
  }

  mostrarAlerta(msg: string, accion: string) {
    this.snackBar.open(msg, accion, {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 4 * 1000,
    });
  }

  agregarEditarAnalisis() {
    console.log(this.formAnalisis.value);

    const subcategoriasSeleccionadas = this.formAnalisis.value
      .subcategorias as number[];
    const subcategoriasModelo: Subcategoria[] = [];

    this.subcategorias.forEach((subcategoria) => {
      if (subcategoriasSeleccionadas.includes(subcategoria.id)) {
        subcategoriasModelo.push(subcategoria);
      }
    });

    const modelo: Analisis = {
      id: this.dataAnalisis == null ? 0 : this.dataAnalisis.id,
      codigo: this.formAnalisis.value.codigo,
      nombre: this.formAnalisis.value.nombre,
      valores: this.formAnalisis.value.valores,
      unidades: this.formAnalisis.value.unidades,
      subcategorias: subcategoriasModelo || [],
    };

    if (this.dataAnalisis == null) {
      this.analisisService.crearAnalisis(modelo).subscribe({
        next: (data) => {
          this.mostrarAlerta('Análisis registrado correctamente.', 'Listo');
          this.dialogoReferencia.close({ listadoAnalisisValores: data });
          console.log(data);
        },
        error: (e) => {
          this.mostrarAlerta('El análisis ya existe.', 'Error');
        },
      });
    } else {
      if (this.dataAnalisis.id !== undefined) {
        this.analisisService
          .modificarAnalisis(this.dataAnalisis.id, modelo)
          .subscribe({
            next: (data) => {
              this.mostrarAlerta('Análisis modificado correctamente.', 'Listo');
              this.dialogoReferencia.close({ listadoAnalisisValores: data });
            },
            error: (e) => {
              this.mostrarAlerta('No se pudo modificar el análisis.', 'Error');
            },
          });
      } else {
        this.mostrarAlerta('El análisis no tiene un ID válido.', 'Error');
      }
    }
  }

  ngOnInit() {
    if (this.dataAnalisis.id !== undefined) {
      this.tituloAccion = 'EDITAR';
      this.botonAccion = 'ACTUALIZAR';

      this.analisisService
        .obtenerUnAnalisis(this.dataAnalisis.id)
        .subscribe((data: Analisis) => {
          this.formAnalisis.patchValue({
            codigo: data.codigo,
            nombre: data.nombre,
            valores: data.valores,
            unidades: data.unidades,
            subcategorias: data.subcategorias
              ? data.subcategorias.map((sub) => sub.id)
              : [],
          });

          this.subcategorias = data.subcategorias || [];
        });
    }
  }
}
