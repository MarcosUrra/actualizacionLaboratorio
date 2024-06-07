import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { obrasSociales } from 'src/app/interfaces/obras-sociales';
import { obrasSocialesService } from 'src/app/obras-sociales/obras-sociales.service';

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
  selector: 'app-obras-sociales-agregar-editar',
  templateUrl: './obras-sociales-agregar-editar.component.html',
  styleUrls: ['./obras-sociales-agregar-editar.component.css'],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }],
})
export class obrasSocialesAgregarEditarComponent implements OnInit {
  formObraSocial: FormGroup;
  tituloAccion: string = 'NUEVO';
  botonAccion: string = 'GUARDAR';

  constructor(
    private dialogoReferencia: MatDialogRef<obrasSocialesAgregarEditarComponent>,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private obrasSocialesService: obrasSocialesService,
    @Inject(MAT_DIALOG_DATA) public dataObrasSociales: obrasSociales
  ) {
    this.formObraSocial = this.fb.group({
      estado: ['', Validators.required],
      nombreObraSocial: ['', Validators.required],
      CUIT: [''],
      direcccion: [''],
      telefono: ['', [Validators.pattern(/^\d+([-.\s]?\d+)*$/)]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/),
        ],
      ],
      web: [''],
    });
  }

  mostrarAlerta(msg: string, accion: string) {
    this.snackBar.open(msg, accion, {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 4 * 1000,
    });
  }

  volver(): void {
    this.dialogoReferencia.close();
  }

  agregarEditarObrasSociales() {
    const modelo: obrasSociales = {
      id: this.dataObrasSociales ? this.dataObrasSociales.id : undefined,
      estado: this.formObraSocial.value.estado,
      CUIT: this.formObraSocial.value.CUIT,
      nombreObraSocial: this.formObraSocial.value.nombreObraSocial,
      direccion: this.formObraSocial.value.direccion,
      telefono: this.formObraSocial.value.telefono,
      email: this.formObraSocial.value.email.toLowerCase(),
      web: this.formObraSocial.value.web,
    };

    if (this.dataObrasSociales == null) {
      this.obrasSocialesService.createObraSocial(modelo).subscribe({
        next: (data) => {
          this.mostrarAlerta('Obra social creada correctamente.', 'Listo');
          this.dialogoReferencia.close({ obraSocial: data });
        },
        error: (e) => {
          this.mostrarAlerta('La obra social ya existe.', 'Error');
        },
      });
    } else {
      if (this.dataObrasSociales.id !== undefined) {
        this.obrasSocialesService
          .updateObraSocial(this.dataObrasSociales.id, modelo)
          .subscribe({
            next: (data) => {
              this.mostrarAlerta('Obra social editada correctamente.', 'Listo');
              this.dialogoReferencia.close({ obraSocial: data });
            },
            error: (e) => {
              this.mostrarAlerta(
                'No se pudo editar la obra social, revise los campos',
                'Error'
              );
            },
          });
      } else {
        console.error('El ID de la obra social es undefined');
      }
    }
  }

  ngOnInit() {
    if (this.dataObrasSociales) {
      this.formObraSocial.patchValue({
        estado: this.dataObrasSociales.estado,
        nombreObraSocial: this.dataObrasSociales.nombreObraSocial,
        CUIT: this.dataObrasSociales.CUIT,
        direccion: this.dataObrasSociales.direccion,
        telefono: this.dataObrasSociales.telefono,
        email: this.dataObrasSociales.email,
        web: this.dataObrasSociales.web,
      });

      this.tituloAccion = 'EDITAR';
      this.botonAccion = 'ACTUALIZAR';
    }
  }

  actualizarEstado(checked: boolean) {
    this.formObraSocial.get('estado')?.setValue(checked);
  }

  verificarObraSocialExistente(id: number): void {
    this.obrasSocialesService.verificarObraSocialExistente(id).subscribe({
      next: (existeObraSocial: boolean) => {
        if (existeObraSocial) {
          this.mostrarAlerta('Ya hay una obra social con esa nombre', 'Error');
        } else {
          this.agregarEditarObrasSociales();
        }
      },
      error: (error: any) => {
        console.error('Error al verificar la obra social', error);
        if (error.status === 400 && error.error.message) {
          this.mostrarAlerta(error.error.message, 'Error');
        } else {
          this.mostrarAlerta('Error al verificar la obra social', 'Error');
        }
      },
    });
  }
}
