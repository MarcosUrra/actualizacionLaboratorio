import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { LoginService } from "src/app/login/login.service";

export const authGuard: CanActivateFn = ()=>{
  const loginService = inject(LoginService);
  const router=inject(Router);
  if(loginService.isAuth()){
    return true;
  } else{
    router.navigateByUrl('/login');
    return false;
  } 
}
export const authGuardUsuario: CanActivateFn = ()=>{
  const loginService = inject(LoginService);
  const router=inject(Router);
  if(loginService.isUser()){
    return true;
  } else{
    alert("No tiene permiso para acceder a esta funcionalidad");
    router.navigateByUrl('/inicio');
    return false;
  } 
}
 





