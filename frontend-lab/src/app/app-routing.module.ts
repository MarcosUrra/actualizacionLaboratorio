import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicosComponent } from './medicos/medicos.component';
import { BrowserModule } from '@angular/platform-browser';
import { PacientesComponent } from './pacientes/pacientes.component';
import { PortadaComponent } from './portada/portada.component';
import { LoginComponent } from './login/login.component';
import { InicioComponent } from './inicio/inicio.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { AnalisisComponent } from './analisis/analisis.component';
import { LaboratoristasComponent } from './laboratoristas/laboratoristas.component';
import { GruposAnalisisComponent } from './grupos-analisis/grupos-analisis.component';
import { NuevaOrdenComponent } from './nueva-orden/nueva-orden.component';
import {
  authGuard,
  authGuardUsuario,
} from './shared/services/autenticacion.service';
import { ManualUsuarioComponent } from './shared/manual-usuario/manual-usuario.component';
import { solicitadoPorComponent } from './solicitado-por/solicitado-por.component';
import { obrasSocialesComponent } from './obras-sociales/obras-sociales.component';

const routes: Routes = [
  { path: '', redirectTo: '/portada', pathMatch: 'full' },
  { path: 'portada', component: PortadaComponent },
  { path: 'login', component: LoginComponent },
  { path: 'inicio', component: InicioComponent, canActivate: [authGuard] },
  { path: 'medicos', component: MedicosComponent, canActivate: [authGuard] },
  {
    path: 'pacientes',
    component: PacientesComponent,
    canActivate: [authGuard],
  },
  { path: 'analisis', component: AnalisisComponent, canActivate: [authGuard] },
  {
    path: 'usuarios',
    component: UsuariosComponent,
    canActivate: [authGuard, authGuardUsuario],
  },
  {
    path: 'nueva-orden',
    component: NuevaOrdenComponent,
    canActivate: [authGuard],
  },
  {
    path: 'laboratoristas',
    component: LaboratoristasComponent,
    canActivate: [authGuard],
  },
  {
    path: 'grupos-analisis',
    component: GruposAnalisisComponent,
    canActivate: [authGuard],
  },
  {
    path: 'manual-usuario',
    component: ManualUsuarioComponent,
    canActivate: [authGuard],
  },
  {
    path: 'solicitado-por',
    component: solicitadoPorComponent,
    canActivate: [authGuard],
  },
  {
    path: 'obras-sociales',
    component: obrasSocialesComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [BrowserModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
