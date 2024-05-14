import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { Usuarios } from 'src/app/interfaces/usuarios';
import { UsuariosService } from 'src/app/usuarios/usuarios.service';


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
  selector: 'app-usuarios-agregar-editar',
  templateUrl: './usuarios-agregar-editar.component.html',
  styleUrls: ['./usuarios-agregar-editar.component.css'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
],
})

export class UsuariosAgregarEditarComponent implements OnInit{


  formUsuario: FormGroup;
  tituloAccion:string = "NUEVO";
  botonAccion:string = "GUARDAR";


  constructor( 
    private dialogoReferencia: MatDialogRef<UsuariosAgregarEditarComponent>,
    private fb:FormBuilder,
    private _snackBar: MatSnackBar,
    private usuariosService: UsuariosService,
    
    @Inject(MAT_DIALOG_DATA) public dataUsuario:Usuarios 
  ){
      
    this.formUsuario=this.fb.group({
      estado:['',Validators.required],
      apellido:['',
      [Validators.required, 
        Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s']+$/)]],
      nombre:['',
      [Validators.required,
        Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s']+$/)]],
      username: ['', 
      [Validators.required,Validators.minLength(3)] ],
      password:['',
      [Validators.required,Validators.minLength(8)]],
      role:['', Validators.required],
    })
  }

  mostrarAlerta(msg: string, accion: string) {
    this._snackBar.open(msg, accion, {
      horizontalPosition:"center",
      verticalPosition:"bottom",
      duration: 4 * 1000,
    })
  }

  agregarEditarUsuario(){
    console.log(this.formUsuario.value)
    
    const modelo: Usuarios={
      id: this.dataUsuario? this.dataUsuario.id : undefined, 
      estado:this.formUsuario.value.estado,
      apellido:this.formUsuario.value.apellido,
      nombre:this.formUsuario.value.nombre,
      username:this.formUsuario.value.username,
      password:this.formUsuario.value.password,
      role:this.formUsuario.value.role,
    }

    if(this.dataUsuario== null){
      this.usuariosService.crearUsuario(modelo).subscribe({
        next:(data)=>{
          this.mostrarAlerta("Usuario creado correctamente", "Listo");
          this.dialogoReferencia.close("creado");
        },error:(e)=>{
          this.mostrarAlerta("El usuario ya existe.", "Error")
        }
      })

    }else{
      if (this.dataUsuario.id !== undefined) {
        this.usuariosService.modificarUsuario(this.dataUsuario.id, modelo).subscribe({
          next: (data) => {
            this.mostrarAlerta("Usuario editado correctamente", "Listo");
            this.dialogoReferencia.close("editado");
          },
          error: (e) => {
            this.mostrarAlerta("No se pudo editar el usuario", "Error");
          }
        });
      } else {
        console.error("El ID del usuario es undefined");
      }

    }     
  }

  ngOnInit():void{

    if(this.dataUsuario!=null){

      this.formUsuario.patchValue({
        estado:this.dataUsuario.estado,
        apellido:this.dataUsuario.apellido,
        nombre:this.dataUsuario.nombre,
        username:this.dataUsuario.username,
        password:this.dataUsuario.password,
        role:this.dataUsuario.role,
      })
    }
    if(this.dataUsuario!=null){
      this.tituloAccion = "EDITAR";
      this.botonAccion = "ACTUALIZAR";
      
    }

  }

  actualizarEstado(checked: boolean) {
    this.formUsuario.get('estado')?.setValue(checked);
  }


  verificarUsernameExistente(username: string): void {
  
    this.usuariosService.verificarUsernameExistente(username).subscribe({
      next: (existeUsername: boolean) => {
        if (existeUsername) {
          this.mostrarAlerta('Ya hay un usuario con ese username', 'Error');
        } else {
          this.agregarEditarUsuario();
        }
      },
      error: (error: any) => {
        console.error('Error al verificar el usuario, error');
        if (error.status === 400 && error.error.message) {
          this.mostrarAlerta(error.error.message, 'Error');
        } else {
          this.mostrarAlerta('Error al verificar el usuario', 'Error');
        }
      }
    });
  }
}
