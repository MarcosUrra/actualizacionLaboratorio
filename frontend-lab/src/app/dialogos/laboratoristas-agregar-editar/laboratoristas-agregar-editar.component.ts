import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import {Laboratoristas } from 'src/app/interfaces/laboratoristas';
import { LaboratoristasService } from 'src/app/laboratoristas/laboratoristas.service';


export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  }
};
@Component({
  selector: 'app-laboratoristas-agregar-editar',
  templateUrl: './laboratoristas-agregar-editar.component.html',
  styleUrls: ['./laboratoristas-agregar-editar.component.css'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
],
})

export class LaboratoristasAgregarEditarComponent implements OnInit{

  formLaboratorista:FormGroup;
  tituloAccion:string = "NUEVO";
  botonAccion:string = "GUARDAR";

  constructor( 
    private dialogoReferencia: MatDialogRef<LaboratoristasAgregarEditarComponent>,
    private fb:FormBuilder,
    private snackBar: MatSnackBar,
    private laboratoristasService: LaboratoristasService,
    @Inject(MAT_DIALOG_DATA) public dataLaboratorista:Laboratoristas 
  ) {
    this.formLaboratorista = this.fb.group({
      estado:['',Validators.required],
      apellido: ['', 
       [Validators.required, 
        Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ'\s-]*$/), 
        Validators.minLength(2), 
        Validators.maxLength(50)]],
      nombre: ['',
       [Validators.required, 
        Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ'\s-]*$/),
        Validators.minLength(2), 
        Validators.maxLength(50)]],
      matricula: ['', 
        [Validators.required,
         Validators.pattern('^[0-9]+$')]],
      especialidad: ['',
        [Validators.required,
         Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ'\s-]*$/), 
         Validators.minLength(2), 
         Validators.maxLength(50)]],
      tipoDocumento: [''],
      numeroDocumento: ['', Validators.pattern('^[0-9]+$')],
      telefono: ['', Validators.pattern('^[0-9]+$')],
    });
  }

  mostrarAlerta(msg: string, accion: string) {
    this.snackBar.open(msg, accion, {
      horizontalPosition:"center",
      verticalPosition:"bottom",
      duration: 4 * 1000,
    })
  }

  ngOnInit(){

    if(this.dataLaboratorista){

      this.formLaboratorista.patchValue({
        estado:this.dataLaboratorista.estado,
        apellido:this.dataLaboratorista.apellido,
        nombre:this.dataLaboratorista.nombre,
        matricula:this.dataLaboratorista.matricula,
        especialidad:this.dataLaboratorista.especialidad,
        tipoDocumento:this.dataLaboratorista.tipoDocumento,
        numeroDocumento:this.dataLaboratorista.numeroDocumento,
        telefono:this.dataLaboratorista.telefono
      })

      this.tituloAccion = "EDITAR";
      this.botonAccion = "ACTUALIZAR";
      
    }

  }

  actualizarEstado(checked: boolean) {
    this.formLaboratorista.get('estado')?.setValue(checked);
  }

  

  agregarEditarLaboratorista(){
    
    const modelo: Laboratoristas={
      id: this.dataLaboratorista ? this.dataLaboratorista.id : undefined,
      estado:this.formLaboratorista.value.estado, 
      apellido:this.formLaboratorista.value.apellido,
      nombre:this.formLaboratorista.value.nombre,
      matricula:this.formLaboratorista.value.matricula,
      especialidad:this.formLaboratorista.value.especialidad,
      tipoDocumento:this.formLaboratorista.value.tipoDocumento ??'',
      numeroDocumento:this.formLaboratorista.value.numeroDocumento ??'',
      telefono:this.formLaboratorista.value.telefono ??'',
    }

    if(this.dataLaboratorista == null){
      this.laboratoristasService.crearLaboratorista(modelo).subscribe({
        next:(data)=>{
          this.mostrarAlerta("Laboratorista creado correctamente.", "Listo");
          this.dialogoReferencia.close({laboratorista: data});
        },error:(e)=>{
          this.mostrarAlerta("El laboratorista ya existe.", "Error")
        }
      })

    }else{
      if (this.dataLaboratorista.id !== undefined) {
        this.laboratoristasService.modificarLaboratorista(this.dataLaboratorista.id, modelo).subscribe({
          next: (data) => {
            this.mostrarAlerta("Laboratorista editado correctamente.", "Listo");
            this.dialogoReferencia.close({laboratorista: data});
          },
          error: (e) => {
            this.mostrarAlerta("No se pudo editar el laboratorista, revise los campos.", "Error");
          }
        });
      } else {
        console.error("El Id del laboratorista es undefined.");
    
      }

    }     
  }

  
  

 

    verificarMatriculaExistente(matricula: string): void {
    this.laboratoristasService.verificarMatriculaExistente(matricula).subscribe({
      next: (existeMatricula: boolean) => {
        if (existeMatricula) {
          this.mostrarAlerta('Ya hay un laboratorista con esa matrícula', 'Error');
        } else {
          this.agregarEditarLaboratorista();
        }
      },
      error: (error: any) => {
        console.error('Error al verificar la matrícula', error);
        if (error.status === 400 && error.error.message) {
          this.mostrarAlerta(error.error.message, 'Error');
        } else {
          this.mostrarAlerta('Error al verificar la matrícula', 'Error');
        }
      }
    });
  }
}

