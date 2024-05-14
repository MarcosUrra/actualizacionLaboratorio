import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from './login.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [

  ],

})

export class LoginComponent {

  formLogin: FormGroup;
  tituloAccion: string = "INICIO DE SESION";
  botonAccion: string = "INICIAR SESION";
  username: string = "";
  password: string = "";
  msjLogin: string = "";
  role: any;
  message: any;



  constructor(

    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
    private loginService: LoginService,

  ) {

    this.formLogin = this.fb.group({

      username: ['',
        Validators.required],
      password: ['',
        Validators.required],

    })
  }


  login(): void {
    console.log("Inicio de sesión...");
    const inputUsername = this.formLogin.value?.username;
    const inputPassword = this.formLogin.value?.password;
    const role = this.formLogin.value?.role;



    this.loginService.autenticarUsuario(inputUsername, inputPassword, role).subscribe(
      (response: any) => {

        if (response.message === "Inicio de sesión exitoso" && response.role == "admin") {
          this.role = response.role;
          this.loginService.setRole(this.role);

          this.router.navigate(["/inicio"]);

        }
        else if (response.message === "Inicio de sesión exitoso" && response.role === "user") {

          this.role = response.role;
          this.loginService.setRole(this.role);

          this.router.navigate(["/inicio"]);


        }
        else {
          this.mostrarAlerta("Usuario o contraseña incorrecto", "Intente Nuevamente");

        }
      },
      (error) => {
        if (error.status === 401) {
          this.msjLogin = "Usuario o contraseña incorrecto";
          this.mostrarAlerta("Usuario o contraseña incorrecto", "Intente Nuevamente");
        } else {
          this.mostrarAlerta("Usuario o contraseña incorrecto", "Intente Nuevamente");
          this.msjLogin = "Error al iniciar sesión";

        }
      });
  };

  borrarCampos(): void {


    this.formLogin.reset()
  }

  cancelar() {
    this.router.navigate(['/portada']);
  }
  hidePassword = true;

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }



  mostrarAlerta(msg: string, accion: string) {
    this._snackBar.open(msg, accion, {
      horizontalPosition: "center",
      verticalPosition: "top",
      duration: 4 * 1000,
    })
  }
}
