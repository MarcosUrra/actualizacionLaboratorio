import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { PortadaComponent } from './portada/portada.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './shared/footer/footer.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCommonModule } from '@angular/material/core';
import { MomentDateModule } from '@angular/material-moment-adapter';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { PacientesAgregarEditarComponent } from './dialogos/pacientes-agregar-editar/pacientes-agregar-editar.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { InicioComponent } from './inicio/inicio.component';
import { AnalisisAgregarEditarComponent } from './dialogos/analisis-agregar-editar/analisis-agregar-editar.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule } from '@angular/material/core';
import { MedicosAgregarEditarComponent } from './dialogos/medicos-agregar-editar/medicos-agregar-editar.component';
import { AnalisisComponent } from './analisis/analisis.component';
import { UsuariosAgregarEditarComponent } from './dialogos/usuarios-agregar-editar/usuarios/usuarios-agregar-editar.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { PacientesComponent } from './pacientes/pacientes.component';
import { MedicosComponent } from './medicos/medicos.component';
import { LaboratoristasComponent } from './laboratoristas/laboratoristas.component';
import { LaboratoristasAgregarEditarComponent } from './dialogos/laboratoristas-agregar-editar/laboratoristas-agregar-editar.component';
import { GruposAnalisisComponent } from './grupos-analisis/grupos-analisis.component';
import { GruposAnalisisAgregarEditarComponent } from './dialogos/grupos-analisis-agregar-editar/grupos-analisis-agregar-editar.component';
import { GruposAnalisisAnalisisxgruposComponent } from './dialogos/grupos-analisis-analisisxgrupos/grupos-analisis-analisisxgrupos.component';
import { NuevaOrdenComponent } from './nueva-orden/nueva-orden.component';
import { NuevaOrdenAgregarEditarComponent } from './dialogos/nueva-orden-agregar-editar/nueva-orden-agregar-editar.component';
import { CargarResultadosComponent } from './dialogos/cargar-resultados/cargar-resultados.component';
import { DatePipe } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PopUpColumnasComponent } from './dialogos/popupColumnas/popupColumnas.component';
import { SiNoResultadosComponent } from './dialogos/sinoresultados/sinoresultados.component';
import { ManualUsuarioComponent } from './shared/manual-usuario/manual-usuario.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReportesComponent } from './dialogos/reportes/reportes.component';
import { solicitadoPorComponent } from './solicitado-por/solicitado-por.component';
import { solicitadoPorAgregarEditarComponent } from './dialogos/solicitado-por-agregar-editar/solicitado-por-agregar-editar.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { obrasSocialesComponent } from './obras-sociales/obras-sociales.component';
import { obrasSocialesAgregarEditarComponent } from './dialogos/obras-sociales-agregar-editar/obras-sociales-agregar-editar.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    LoginComponent,
    NavbarComponent,
    InicioComponent,
    PortadaComponent,
    PacientesAgregarEditarComponent,
    MedicosAgregarEditarComponent,
    AnalisisAgregarEditarComponent,
    UsuariosAgregarEditarComponent,
    LaboratoristasAgregarEditarComponent,
    GruposAnalisisAgregarEditarComponent,
    GruposAnalisisAnalisisxgruposComponent,
    NuevaOrdenAgregarEditarComponent,
    CargarResultadosComponent,
    PopUpColumnasComponent,
    SiNoResultadosComponent,
    ManualUsuarioComponent,
    ReportesComponent,
    solicitadoPorAgregarEditarComponent,
    AnalisisComponent,
    obrasSocialesAgregarEditarComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    BsDatepickerModule.forRoot(),
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCommonModule,
    MomentDateModule,
    MatSnackBarModule,
    MatIconModule,
    MatDialogModule,
    MatGridListModule,
    MatMenuModule,
    //AnalisisComponent,
    PacientesComponent,
    MedicosComponent,
    UsuariosComponent,
    LaboratoristasComponent,
    GruposAnalisisComponent,
    NuevaOrdenComponent,
    MatSelectModule,
    BrowserModule,
    DragDropModule,
    MatCheckboxModule,
    solicitadoPorComponent,
    MatChipsModule,
    MatCardModule,
    MatExpansionModule,
    obrasSocialesComponent,
  ],

  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
