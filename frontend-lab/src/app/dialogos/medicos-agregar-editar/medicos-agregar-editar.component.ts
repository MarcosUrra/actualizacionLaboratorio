import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { Medicos } from 'src/app/interfaces/medicos';
import { MedicosService } from 'src/app/medicos/medicos.service';


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
  selector: 'app-medicos-agregar-editar',
  templateUrl: './medicos-agregar-editar.component.html',
  styleUrls: ['./medicos-agregar-editar.component.css'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
],
})

export class MedicosAgregarEditarComponent implements OnInit{

  formMedico: FormGroup;
  tituloAccion:string = "NUEVO";
  botonAccion:string = "GUARDAR";

  constructor( 
    private dialogoReferencia: MatDialogRef<MedicosAgregarEditarComponent>,
    private fb:FormBuilder,
    private snackBar: MatSnackBar,
    private medicosService: MedicosService,
    @Inject(MAT_DIALOG_DATA) public dataMedico:Medicos 
  ){
      
    this.formMedico=this.fb.group({
      estado:['',Validators.required],
      apellido:['', 
      [Validators.required, 
      Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s'-]+$/)]],
      nombre:['',
      [
      Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s'-]+$/)]],
      matricula: ['',
      [Validators.required,
      Validators.pattern(/^[0-9]+$/),]],
      especialidad:['',
      [Validators.required,
       Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s'-]+$/)]],
      tipoDocumento:[''],
      numeroDocumento:['', [
        Validators.pattern(/^[0-9]+$/)]],
      telefono:['',
      [Validators.pattern(/^\d+([-.\s]?\d+)*$/)]],
    })
  }

  mostrarAlerta(msg: string, accion: string) {
    this.snackBar.open(msg, accion, {
      horizontalPosition:"center",
      verticalPosition:"bottom",
      duration: 4 * 1000,
    })
  }

  agregarEditarMedico(){
    
    const modelo: Medicos={
      id: this.dataMedico ? this.dataMedico.id : undefined,
      estado:this.formMedico.value.estado, 
      apellido:this.formMedico.value.apellido,
      nombre:this.formMedico.value.nombre,
      matricula:this.formMedico.value.matricula,
      especialidad:this.formMedico.value.especialidad,
      tipoDocumento:this.formMedico.value.tipoDocumento ??'',
      numeroDocumento:this.formMedico.value.numeroDocumento ??'',
      telefono:this.formMedico.value.telefono ??'',
    }

    if(this.dataMedico == null){
      this.medicosService.crearMedico(modelo).subscribe({
        next:(data)=>{
          this.mostrarAlerta("Médico creado correctamente.", "Listo");
          this.dialogoReferencia.close({medico: data});
        },error:(e)=>{
          this.mostrarAlerta("El médico ya existe.", "Error")
        }
      })

    }else{
  
      if (this.dataMedico.id !== undefined) {
        this.medicosService.modificarMedico(this.dataMedico.id, modelo).subscribe({
          next: (data) => {
            this.mostrarAlerta("Médico editado correctamente.", "Listo");
            this.dialogoReferencia.close({medico: data});
          },
          error: (e) => {
            this.mostrarAlerta("No se pudo editar el médico, revise los campos", "Error");
          }
        });
      } else {
        console.error("El ID del médico es undefined");
      
      }

    }     
  }

  ngOnInit(){

    if(this.dataMedico){

      this.formMedico.patchValue({
        estado:this.dataMedico.estado,
        apellido:this.dataMedico.apellido,
        nombre:this.dataMedico.nombre,
        matricula:this.dataMedico.matricula,
        especialidad:this.dataMedico.especialidad,
        tipoDocumento:this.dataMedico.tipoDocumento,
        numeroDocumento:this.dataMedico.numeroDocumento,
        telefono:this.dataMedico.telefono
      })

      this.tituloAccion = "EDITAR";
      this.botonAccion = "ACTUALIZAR";
      
    }

  }

  actualizarEstado(checked: boolean) {
    this.formMedico.get('estado')?.setValue(checked);
  }
  


  verificarMatriculaExistente(matricula: string): void {
    this.medicosService.verificarMatriculaExistente(matricula).subscribe({
      next: (existeMatricula: boolean) => {
        if (existeMatricula) {
          this.mostrarAlerta('Ya hay un médico con esa matrícula', 'Error');
        } else {
          this.agregarEditarMedico();
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
