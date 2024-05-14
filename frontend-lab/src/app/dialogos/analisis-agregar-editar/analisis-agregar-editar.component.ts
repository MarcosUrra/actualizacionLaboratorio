import { Component, Inject, OnInit } from '@angular/core';
import { Analisis } from 'src/app/interfaces/analisis';
import { AnalisisService } from 'src/app/analisis/analisis.service';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  selector: 'app-analisis-agregar-editar',
  templateUrl: './analisis-agregar-editar.component.html',
  styleUrls: ['./analisis-agregar-editar.component.css'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
],
})
export class AnalisisAgregarEditarComponent implements OnInit{

  formAnalisis: FormGroup;
  tituloAccion:string = "NUEVO";
  botonAccion:string = "GUARDAR";

  constructor( 
    private dialogoReferencia: MatDialogRef<AnalisisAgregarEditarComponent>,
    private fb:FormBuilder,
    private snackBar: MatSnackBar,
    private analisisService: AnalisisService,
    @Inject(MAT_DIALOG_DATA) public dataAnalisis:Analisis 
  ){
      
    this.formAnalisis=this.fb.group({
      codigo:['',
        [Validators.required,
        Validators.pattern(/^\d+([-.\s]?\d+)*$/)]],
      nombre:['',
        [Validators.required,
        Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s() ']+/)]],
      valores: ['', 
        Validators.required],
      unidades: ['', 
        Validators.required],
    })
  }

  mostrarAlerta(msg: string, accion: string) {
    this.snackBar.open(msg, accion, {
      horizontalPosition:"center",
      verticalPosition:"bottom",
      duration: 4 * 1000,
    })
  }

  agregarEditarAnalisis(){
    console.log(this.formAnalisis.value)
    
    const modelo: Analisis={
      id : this.dataAnalisis == null? 0 : this.dataAnalisis.id,
      codigo:this.formAnalisis.value.codigo,
      nombre:this.formAnalisis.value.nombre,
      valores:this.formAnalisis.value.valores,
      unidades:this.formAnalisis.value.unidades
    }

    if(this.dataAnalisis==null){
      this.analisisService.crearAnalisis(modelo).subscribe({
        next:(data)=>{
            this.mostrarAlerta('Análisis registrado correctamente.', "Listo");
            this.dialogoReferencia.close({listadoAnalisisValores:data});
            console.log(data)   
        },error:(e)=>{
          this.mostrarAlerta("El análisis ya existe.", "Error")
        }
      })
    }else{
      if (this.dataAnalisis.id !== undefined) {          
      this.analisisService.modificarAnalisis(this.dataAnalisis.id, modelo).subscribe({
        next:(data)=>{
          this.mostrarAlerta('Análisis modificado correctamente.', "Listo");
          this.dialogoReferencia.close({listadoAnalisisValores:data});   
      },error:(e)=>{
        this.mostrarAlerta("No se pudo modificar el análisis.", "Error")
      }
      });
    }
  } 
}

 
  ngOnInit(){

    if(this.dataAnalisis){

      this.formAnalisis.patchValue({
        codigo:this.dataAnalisis.codigo,
        nombre:this.dataAnalisis.nombre,
        valores:this.dataAnalisis.valores,
        unidades:this.dataAnalisis.unidades
      })

      this.tituloAccion = "EDITAR";
      this.botonAccion = "ACTUALIZAR";
      
    }}
}
