import { Component, OnInit, Inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import * as moment from 'moment';
import { Pacientes } from 'src/app/interfaces/pacientes';
import { PacientesService } from 'src/app/pacientes/pacientes.service';


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
  selector: 'app-pacientes-agregar-editar',
  templateUrl: './pacientes-agregar-editar.component.html',
  styleUrls: ['./pacientes-agregar-editar.component.css'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
],
})

export class PacientesAgregarEditarComponent implements OnInit{

  formPaciente: FormGroup;
  tituloAccion:string = "NUEVO";
  botonAccion:string = "GUARDAR";

  constructor( 
    private dialogoReferencia: MatDialogRef<PacientesAgregarEditarComponent>,
    private fb:FormBuilder,
    private _snackBar: MatSnackBar,
    private pacientesService: PacientesService,
    @Inject (MAT_DIALOG_DATA) public dataPaciente:Pacientes

    ){
      this.formPaciente=this.fb.group({
        tipoDocumento:['',
          Validators.required],
        numeroDocumento:['',
          [Validators.required,
          Validators.pattern(/[0-9]{7,8}/)]], 
        apellido: ['', 
          [Validators.required, 
          Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s']+$/)]],
        nombre:['',
          [Validators.required,
           Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s']+/)]],
        fechaNacimiento:['',
          Validators.required] ,
        sexo:['',
          Validators.required],
        direccion:['',
          Validators.required], 
        localidad:['',
          Validators.required] ,
        provincia:['',
          Validators.required] ,
        telefono:['',
          [Validators.required,
           Validators.pattern(/^\d+([-.\s]?\d+)*$/)]], 
        email:['',
          [Validators.required,
           Validators.pattern(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)]]
      });      
    }

  mostrarAlerta(msg: string, accion: string) {
    this._snackBar.open(msg, accion, {
      horizontalPosition:"center",
      verticalPosition:"bottom",
      duration: 4 * 1000,
    });
  }

  volver(): void {  
    this.dialogoReferencia.close();
  }

  ngOnInit(): void{
    if(this.dataPaciente!=null){
      this.formPaciente.patchValue({
        tipoDocumento:this.dataPaciente.tipoDocumento,
        numeroDocumento:this.dataPaciente.numeroDocumento,
        apellido:this.dataPaciente.apellido,
        nombre:this.dataPaciente.nombre,
        fechaNacimiento:moment(this.dataPaciente.fechaNacimiento, 'DD/MM/YYYY HH:mm:ss'),
        sexo:this.dataPaciente.sexo,
        direccion:this.dataPaciente.direccion,
        localidad:this.dataPaciente.localidad,
        provincia:this.dataPaciente.provincia,
        telefono:this.dataPaciente.telefono,
        email:this.dataPaciente.email,
      });
    }
    if(this.dataPaciente!=null){
      this.tituloAccion = "MODIFICAR DATOS DEL";
      this.botonAccion = "ACTUALIZAR";
    }
  }

  agregarEditarPaciente(){    
    const modelo: Pacientes={
      id : this.dataPaciente == null? 0 : this.dataPaciente.id,
      tipoDocumento:this.formPaciente.value.tipoDocumento,
      numeroDocumento:this.formPaciente.value.numeroDocumento,
      apellido:this.formPaciente.value.apellido,
      nombre:this.formPaciente.value.nombre,
      fechaNacimiento:moment(this.formPaciente.value.fechaNacimiento, ).format("DD/MM/YYYY"),
      sexo:this.formPaciente.value.sexo,
      direccion:this.formPaciente.value.direccion,
      localidad:this.formPaciente.value.localidad,
      provincia:this.formPaciente.value.provincia,
      telefono:this.formPaciente.value.telefono,
      email:this.formPaciente.value.email
    }
    if(this.dataPaciente==null){
      this.pacientesService.crearPaciente(modelo).subscribe({
        next:(data)=>{
            this.mostrarAlerta('Paciente creado correctamente.', "Listo");
            this.dialogoReferencia.close({paciente:data});   
        },error:(e)=>{
          this.mostrarAlerta("El paciente ya existe.", "Error")
        }
      })
    }else{
      if (this.dataPaciente.id !== undefined) {          
        this.pacientesService.modificarPaciente(this.dataPaciente.id, modelo).subscribe({
          next:(data)=>{
            this.mostrarAlerta('Paciente modificado correctamente.', "Listo");
            this.dialogoReferencia.close({paciente:data});   
          },error:(e)=>{
          this.mostrarAlerta("No se pudo modificar el paciente.", "Error")
          }
        });
      }
    } 
  } 
  
  calcularEdad(): number | null {
    const fechaNacimiento = this.formPaciente.get('fechaNacimiento')?.value;
    if (!fechaNacimiento) return null;

    const hoy = new Date();
    const fechaNacimientoDate = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - fechaNacimientoDate.getFullYear();
    const mesActual = hoy.getMonth() + 1;
    const mesNacimiento = fechaNacimientoDate.getMonth() + 1;

    if (mesActual < mesNacimiento || (mesActual === mesNacimiento && hoy.getDate() < fechaNacimientoDate.getDate())) {
      edad--;
    }

    return edad;
  }
} 


