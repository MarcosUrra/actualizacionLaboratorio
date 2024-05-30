import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { solicitadoPor } from 'src/app/interfaces/solicitado-por';
import { solicitadoPorService } from 'src/app/solicitado-por/solicitado-por.service';

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
  selector: 'app-solicitado-por-agregar-editar',
  templateUrl: './solicitado-por-agregar-editar.component.html',
  styleUrls: ['./solicitado-por-agregar-editar.component.css'],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }],
})
export class solicitadoPorAgregarEditarComponent implements OnInit {
  formSolicitante: FormGroup;
  tituloAccion: string = 'NUEVO';
  botonAccion: string = 'GUARDAR';

  constructor(
    private dialogoReferencia: MatDialogRef<solicitadoPorAgregarEditarComponent>,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private solicitadoPorService: solicitadoPorService,
    @Inject(MAT_DIALOG_DATA) public dataSolicitadoPor: solicitadoPor
  ) {
    this.formSolicitante = this.fb.group({
      estado: ['', Validators.required],
      nombreSolicitadoPor: [''],
      direccion: [''],
      provincia: [''],
      ciudad: [''],
      email: [''],
      telefono: ['', [Validators.pattern(/^\d+([-.\s]?\d+)*$/)]],
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

  agregarEditarSolicitadoPor() {
    const modelo: solicitadoPor = {
      id: this.dataSolicitadoPor ? this.dataSolicitadoPor.id : undefined,
      estado: this.formSolicitante.value.estado,
      nombreSolicitadoPor: this.formSolicitante.value.nombreSolicitadoPor,
      direccion: this.formSolicitante.value.direccion,
      provincia: this.formSolicitante.value.provincia,
      ciudad: this.formSolicitante.value.ciudad,
      email: this.formSolicitante.value.email.toLowerCase(),
      telefono: this.formSolicitante.value.telefono,
    };

    if (this.dataSolicitadoPor == null) {
      this.solicitadoPorService.createSolicitadoPor(modelo).subscribe({
        next: (data) => {
          this.mostrarAlerta('Area solicitante creada correctamente.', 'Listo');
          this.dialogoReferencia.close({ solicitadoPor: data });
        },
        error: (e) => {
          this.mostrarAlerta('El area solicitante ya existe.', 'Error');
        },
      });
    } else {
      if (this.dataSolicitadoPor.id !== undefined) {
        this.solicitadoPorService
          .modificarSolicitadoPor(this.dataSolicitadoPor.id, modelo)
          .subscribe({
            next: (data) => {
              this.mostrarAlerta(
                'Area solicitante editada correctamente.',
                'Listo'
              );
              this.dialogoReferencia.close({ solicitadoPor: data });
            },
            error: (e) => {
              this.mostrarAlerta(
                'No se pudo editar el area solicitante, revise los campos',
                'Error'
              );
            },
          });
      } else {
        console.error('El ID del area solicitante es undefined');
      }
    }
  }

  ngOnInit() {
    if (this.dataSolicitadoPor) {
      this.formSolicitante.patchValue({
        estado: this.dataSolicitadoPor.estado,
        nombreSolicitadoPor: this.dataSolicitadoPor.nombreSolicitadoPor,
        direccion: this.dataSolicitadoPor.direccion,
        provincia: this.dataSolicitadoPor.provincia,
        ciudad: this.dataSolicitadoPor.ciudad,
        email: this.dataSolicitadoPor.email,
        telefono: this.dataSolicitadoPor.telefono,
      });

      this.tituloAccion = 'EDITAR';
      this.botonAccion = 'ACTUALIZAR';
    }
  }

  actualizarEstado(checked: boolean) {
    this.formSolicitante.get('estado')?.setValue(checked);
  }

  verificarSolicitadoPorExistente(id: number): void {
    this.solicitadoPorService.verificarSolicitadoPorExistente(id).subscribe({
      next: (existeSolicitadoPor: boolean) => {
        if (existeSolicitadoPor) {
          this.mostrarAlerta(
            'Ya hay un area solicitante con esa nombre',
            'Error'
          );
        } else {
          this.agregarEditarSolicitadoPor();
        }
      },
      error: (error: any) => {
        console.error('Error al verificar el area solicitante', error);
        if (error.status === 400 && error.error.message) {
          this.mostrarAlerta(error.error.message, 'Error');
        } else {
          this.mostrarAlerta('Error al verificar el area solicitante', 'Error');
        }
      },
    });
  }
}
