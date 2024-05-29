import {
  Component,
  Inject,
  OnInit,
  ChangeDetectorRef,
  ViewChild,
  QueryList,
  ViewChildren,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialog,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NuevaOrdenService } from 'src/app/nueva-orden/nueva-orden.service';
import { NuevaOrden } from 'src/app/interfaces/nueva-orden';
import { HttpClient } from '@angular/common/http';
import { Medicos } from 'src/app/interfaces/medicos';
import { Pacientes } from 'src/app/interfaces/pacientes';
import { PacientesAgregarEditarComponent } from '../pacientes-agregar-editar/pacientes-agregar-editar.component';
import { Analisis } from 'src/app/interfaces/analisis';
import { GrupoAnalisis } from 'src/app/interfaces/grupos-analisis';
import { Laboratoristas } from 'src/app/interfaces/laboratoristas';
import { CargarResultadosComponent } from '../cargar-resultados/cargar-resultados.component';
import { Subject, map, tap } from 'rxjs';
import { LaboratoristasAgregarEditarComponent } from '../laboratoristas-agregar-editar/laboratoristas-agregar-editar.component';
import { MedicosAgregarEditarComponent } from '../medicos-agregar-editar/medicos-agregar-editar.component';
import { AnalisisAgregarEditarComponent } from '../analisis-agregar-editar/analisis-agregar-editar.component';
import { GruposAnalisisAgregarEditarComponent } from '../grupos-analisis-agregar-editar/grupos-analisis-agregar-editar.component';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-nueva-orden-agregar-editar',
  templateUrl: './nueva-orden-agregar-editar.component.html',
  styleUrls: ['./nueva-orden-agregar-editar.component.css'],
})
export class NuevaOrdenAgregarEditarComponent implements OnInit {
  formNuevaOrden: FormGroup;
  tituloAccion: string = 'NUEVA ORDEN';
  botonAccion: string = 'GUARDAR';
  medicos: any[] = [];
  laboratoristas: any[] = [];
  listadoAnalisisControl: FormControl;
  listadoAnalisisValores: Analisis[] = [];
  listadoGruposValores: GrupoAnalisis[] = [];
  listadoGruposControl: FormControl;
  selectedValue: string | undefined;
  idPaciente: number | undefined;
  laboratoristasSubject: Subject<Laboratoristas[]> = new Subject();

  constructor(
    private dialogoReferencia: MatDialogRef<NuevaOrdenAgregarEditarComponent>,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private nuevaOrdenService: NuevaOrdenService,
    @Inject(MAT_DIALOG_DATA) public dataNuevaOrden: NuevaOrden,
    private http: HttpClient,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {
    this.listadoAnalisisControl = this.fb.control([]);
    this.listadoGruposControl = this.fb.control([]);
    this.formNuevaOrden = this.fb.group({
      numeroDocumento: [
        '',
        [Validators.required, Validators.pattern(/^[0-9A-Za-z]{7,9}$/)],
      ],
      apellido: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      numeroHistoriaClinica: [''],
      obraSocial: ['', [Validators.required]],
      solicitadoPor: [''],
      medico: ['', [Validators.required]],
      laboratorista: ['', [Validators.required]],
      fecha: [''],
      numeroOrdenDiario: [
        '',
        [Validators.required, Validators.pattern(/[0-9]/)],
      ],
      analisis: this.listadoAnalisisControl,
      grupos_analisis: this.listadoGruposControl,
      observaciones: ['', [Validators.maxLength(250)]],
      observacionesInternas: ['', [Validators.maxLength(250)]],
    });
  }

  filtrarAnalisis(): void {
    if (event?.target instanceof HTMLInputElement) {
      const termino = event.target.value || '';
      const analisisFiltrados = this.listadoAnalisisValores.filter((analisis) =>
        analisis.nombre.toLowerCase().includes(termino.toLowerCase())
      );

      this.listadoAnalisisValores = analisisFiltrados;
    }
  }

  filtrarGrupos(): void {
    if (event?.target instanceof HTMLInputElement) {
      const termino = event.target.value || '';
      const grupoFiltrados = this.listadoGruposValores.filter((grupos) =>
        grupos.nombreDelGrupo.toLowerCase().includes(termino.toLowerCase())
      );

      this.listadoGruposValores = grupoFiltrados;
    }
  }

  mostrarAlerta(msg: string, accion: string) {
    this.snackBar.open(msg, accion, {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 4 * 1000,
    });
  }

  ngOnInit() {
    this.nuevaOrdenService.obtenerListadoAnalisis().subscribe((data) => {
      this.listadoAnalisisValores = data.sort(
        (a: { nombre: string }, b: { nombre: any }) =>
          a.nombre.localeCompare(b.nombre)
      );
    });

    this.nuevaOrdenService.obtenerListadoGruposAnalisis().subscribe((data) => {
      this.listadoGruposValores = data.sort(
        (a: { nombreDelGrupo: string }, b: { nombreDelGrupo: any }) =>
          a.nombreDelGrupo.localeCompare(b.nombreDelGrupo)
      );
    });
    this.obtenerListadoLaboratoristas();
    this.obtenerListadoMedicos();

    if (this.dataNuevaOrden !== null) {
      // console.log(this.dataNuevaOrden);
      this.formNuevaOrden.patchValue({
        numeroDocumento: this.dataNuevaOrden.paciente?.numeroDocumento,
        apellido: this.dataNuevaOrden.paciente.apellido,
        nombre: this.dataNuevaOrden.paciente.nombre,
        numeroHistoriaClinica: this.dataNuevaOrden.numeroHistoriaClinica,
        obraSocial: this.dataNuevaOrden.obraSocial,
        solicitadoPor: this.dataNuevaOrden.solicitadoPor,
        medico: this.dataNuevaOrden.medicos,
        laboratorista: this.dataNuevaOrden.laboratorista,
        numeroOrdenDiario: this.dataNuevaOrden.numeroOrdenDiario,
        analisis: this.dataNuevaOrden.analisis,
        grupos_analisis: this.dataNuevaOrden.grupos_analisis,
        fecha: this.dataNuevaOrden.fecha,
        observaciones: this.dataNuevaOrden.observaciones,
        observacionesInternas: this.dataNuevaOrden.observacionesInternas,
      });
      this.tituloAccion = 'EDITAR';
      this.botonAccion = 'ACTUALIZAR';
    }

    this.formNuevaOrden
      .get('numeroDocumento')
      ?.valueChanges.subscribe((numeroDocumento: string) => {
        if (numeroDocumento) {
          this.obtenerDatosPaciente(numeroDocumento);
        } else {
          this.mostrarAlerta('Paciente no registrado', 'Error');
        }
      });
    const listadoAnalisisIds =
      this.dataNuevaOrden.analisis?.map((analisis: any) => analisis.id) || [];
    const listadoGruposIds =
      this.dataNuevaOrden.grupos_analisis?.map((grupo: any) => grupo.id) || [];

    this.formNuevaOrden.setValue({
      analisis: listadoAnalisisIds,
      grupos_analisis: listadoGruposIds,
    });

    this.listadoAnalisisControl.setValue(listadoAnalisisIds);
    this.listadoGruposControl.setValue(listadoGruposIds);
  }

  obtenerListadoMedicos() {
    this.http
      .get<Medicos[]>('http://LOCALHOST:3000/medicos/listadoMedicos')
      .pipe(
        map((medicos) => medicos.filter((medico) => medico.estado === true)),
        tap((medicos) => {
          this.medicos = medicos.sort((a, b) =>
            a.apellido.localeCompare(b.apellido)
          );
          const medicoPreseleccionado = this.medicos.find(
            (medico) => medico.id === this.dataNuevaOrden.medicos?.id
          );
          this.formNuevaOrden.patchValue({ medico: medicoPreseleccionado });
        })
      )
      .subscribe();
  }

  compararAnalisis(analisis1: Analisis, analisis2: Analisis): boolean {
    return analisis1 && analisis2
      ? analisis1.nombre === analisis2.nombre
      : analisis1 === analisis2;
  }

  compararGrupos(grupo1: GrupoAnalisis, grupo2: GrupoAnalisis): boolean {
    return grupo1 && grupo2
      ? grupo1.nombreDelGrupo === grupo2.nombreDelGrupo
      : grupo1 === grupo2;
  }

  obtenerDatosPaciente(numeroDocumento: string) {
    this.http
      .get<Pacientes>(
        `http://LOCALHOST:3000/pacientes/obtenerPacientePorDni/${numeroDocumento}`
      )
      .subscribe((paciente) => {
        if (paciente && this.dataNuevaOrden == null) {
          this.idPaciente = paciente.id;
          this.formNuevaOrden.patchValue({
            apellido: paciente.apellido,
            nombre: paciente.nombre,
          });
        } else if (paciente) {
          this.formNuevaOrden.patchValue({
            apellido: paciente.apellido,
            nombre: paciente.nombre,
          });
        } else {
          this.formNuevaOrden.patchValue({
            apellido: '',
            nombre: '',
          });
        }
      });
  }

  volver(): void {
    this.dialogoReferencia.close();
  }

  obtenerListadoLaboratoristas() {
    this.http
      .get<Laboratoristas[]>(
        'http://localhost:3000/laboratoristas/listadoLaboratoristas'
      )
      .pipe(
        map((laboratoristas) =>
          laboratoristas.filter(
            (laboratorista) => laboratorista.estado === true
          )
        ),
        tap((laboratoristas) => {
          this.laboratoristas = laboratoristas.sort((a, b) =>
            a.apellido.localeCompare(b.apellido)
          );
          const laboratoristaPreseleccionado = this.laboratoristas.find(
            (laboratorista) =>
              laboratorista.id === this.dataNuevaOrden.laboratorista?.id
          );
          this.formNuevaOrden.patchValue({
            laboratorista: laboratoristaPreseleccionado,
          });
        })
      )
      .subscribe();
  }

  agregarEditarNuevaOrden() {
    const idsSeleccionados = this.formNuevaOrden.value.listado_de_analisis;
    const pacienteModelo = {
      id:
        this.dataNuevaOrden == null
          ? this.idPaciente
          : this.dataNuevaOrden.paciente.id,
      numeroDocumento: this.formNuevaOrden.value.numeroDocumento,
      apellido: this.formNuevaOrden.value.apellido,
      nombre: this.formNuevaOrden.value.nombre,
    };

    const medicoModelo = this.formNuevaOrden.value.medico
      ? {
          id: this.formNuevaOrden.value.medico.id,
          nombre: this.formNuevaOrden.value.medico.nombre,
        }
      : undefined;

    const laboratoristaModelo = this.formNuevaOrden.value.laboratorista
      ? {
          id: this.formNuevaOrden.value.laboratorista.id,
          nombre: this.formNuevaOrden.value.laboratorista.nombre,
        }
      : undefined;

    const modelo: NuevaOrden = {
      id: this.dataNuevaOrden == null ? 0 : this.dataNuevaOrden.id,
      numeroOrdenDiario: this.formNuevaOrden.value.numeroOrdenDiario,
      numeroHistoriaClinica: this.formNuevaOrden.value.numeroHistoriaClinica,
      obraSocial: this.formNuevaOrden.value.obraSocial,
      paciente: pacienteModelo,
      medicos: medicoModelo,
      laboratorista: laboratoristaModelo,
      solicitadoPor: this.formNuevaOrden.value.solicitadoPor,
      analisis: this.formNuevaOrden.value.analisis,
      grupos_analisis: this.formNuevaOrden.value.grupos_analisis,
      fecha: this.formNuevaOrden.value.fecha,
      valores: this.formNuevaOrden.value.valores,
      unidades: this.formNuevaOrden.value.unidades,
      observaciones: this.formNuevaOrden.value.observaciones,
      observacionesInternas: this.formNuevaOrden.value.observacionesInternas,
    };

    if (this.dataNuevaOrden == null) {
      this.nuevaOrdenService.crearNuevaOrden(modelo).subscribe({
        next: (data) => {
          this.mostrarAlerta('Orden creada correctamente.', 'Listo');
          this.dialogoReferencia.close('creado');
        },
        error: (e) => {
          this.mostrarAlerta('No se pudo crear la orden.', 'Error');
        },
      });
    } else {
      if (this.dataNuevaOrden.id !== undefined) {
        this.nuevaOrdenService
          .modificarOrden(this.dataNuevaOrden.id, modelo)
          .subscribe({
            next: (data) => {
              this.mostrarAlerta('Orden modificada correctamente.', 'Listo');
              this.dialogoReferencia.close('editado');
            },
            error: (e) => {
              this.mostrarAlerta('No se pudo modificar la orden.', 'Error');
            },
          });
      }
    }
  }

  CargarResultados(id: number): void {
    // console.log(id);
    // debugger
    const unidades: { [key: string]: any } = {};
    this.dataNuevaOrden.analisis.forEach((analisis) => {
      unidades[`analisis_${(analisis as unknown as Analisis).id}`] = (
        analisis as unknown as Analisis
      ).unidades;
    });
    this.dataNuevaOrden.grupos_analisis.forEach((grupo: any) => {
      grupo.listado_de_analisis.forEach((analisis: Analisis) => {
        unidades[`analisis_${(analisis as Analisis).id}`] = (
          analisis as Analisis
        ).unidades;
      });
    });
    const dialogRef = this.dialog.open(CargarResultadosComponent, {
      width: '63%',
      data: {
        listadoAnalisisValores: this.listadoAnalisisValores,
        idOrden: id,//this.dataNuevaOrden.id,
        unidades: unidades,
        numeroOrdenDiario: this.dataNuevaOrden.numeroOrdenDiario,
      },
    });

    dialogRef.componentInstance.verAnalisis(this.dataNuevaOrden, unidades);

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'guardado') {
      }
    });
  }

  agregarEditarPaciente() {
    const dialogRef = this.dialog.open(PacientesAgregarEditarComponent, {
      width: '35%',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.paciente) {
        const paciente = result.paciente;
        this.formNuevaOrden.patchValue({
          numeroDocumento: paciente.numeroDocumento,
          apellido: paciente.apellido,
          nombre: paciente.nombre,
        });
      }
    });
  }

  agregarEditarLaboratorista() {
    const dialogRef = this.dialog.open(LaboratoristasAgregarEditarComponent, {
      width: '35%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.laboratorista) {
        const newLaboratorista = result.laboratorista;
        this.laboratoristas = this.laboratoristas.sort((a, b) =>
          a.apellido.localeCompare(b.apellido)
        );
        this.obtenerListadoLaboratoristas();
      }
    });
  }

  agregarEditarMedico() {
    const dialogRef = this.dialog.open(MedicosAgregarEditarComponent, {
      width: '35%',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.medico) {
        const newMedico = result.medico;
        this.medicos = this.medicos.sort((a, b) =>
          a.apellido.localeCompare(b.apellido)
        );
        this.obtenerListadoMedicos();
      }
    });
  }

  agregarEditarAnalisis() {
    const dialogRef = this.dialog.open(AnalisisAgregarEditarComponent, {
      width: '35%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.listadoAnalisisValores) {
        this.nuevaOrdenService.obtenerListadoAnalisis().subscribe((data) => {
          this.listadoAnalisisValores = data.sort(
            (a: { nombre: string }, b: { nombre: any }) =>
              a.nombre.localeCompare(b.nombre)
          );
        });
      }
    });
  }

  agregarEditarGrupo() {
    const dialogRef = this.dialog.open(GruposAnalisisAgregarEditarComponent, {
      width: '35%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.listadoGruposValores) {
        this.nuevaOrdenService
          .obtenerListadoGruposAnalisis()
          .subscribe((data) => {
            this.listadoGruposValores = data.sort(
              (a: { nombreDelGrupo: string }, b: { nombreDelGrupo: any }) =>
                a.nombreDelGrupo.localeCompare(b.nombreDelGrupo)
            );
          });
      }
    });
  }
}
