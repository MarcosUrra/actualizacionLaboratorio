import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NuevaOrden } from '../interfaces/nueva-orden';
import { NuevaOrdenService } from './nueva-orden.service';
import { NuevaOrdenAgregarEditarComponent } from '../dialogos/nueva-orden-agregar-editar/nueva-orden-agregar-editar.component';
import { GruposAnalisisAnalisisxgruposComponent } from '../dialogos/grupos-analisis-analisisxgrupos/grupos-analisis-analisisxgrupos.component';
import { DatePipe } from '@angular/common';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgIf, JsonPipe } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { ImpresionServiceCompleto } from '../shared/services/impresionCompleto';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PopUpColumnasComponent } from '../dialogos/popupColumnas/popupColumnas.component';
import autoTable from 'jspdf-autotable';
import jsPDF from 'jspdf';
import { SiNoResultadosComponent } from '../dialogos/sinoresultados/sinoresultados.component';

@Component({
  selector: 'app-nueva-orden',
  templateUrl: './nueva-orden.component.html',
  styleUrls: ['./nueva-orden.component.css'],
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    NgIf,
    JsonPipe,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    MatMenuModule,
    MatButtonModule,
    MatCheckboxModule,
    CommonModule,
    DragDropModule
  ],
  providers: [DatePipe],
})


export class NuevaOrdenComponent implements AfterViewInit, OnInit {
  public mostrarNroOrden: boolean = false;
  public mostrarObservaciones: boolean = false;
  public mostrarObservacionesInternas: boolean = false;
  public mostrarNroDocumento: boolean = false;
  public mostrarNombreCompleto: boolean = false;
  public mostrarAnalisis: boolean = false;
  public seleccionadoAnalisis: boolean = false;
  public seleccionadoNroOrden: boolean = false;
  public seleccionadoObservaciones: boolean = false;
  public seleccionadoObservacionesInternas: boolean = false;
  public seleccionadoNombreCompleto: boolean = false;
  public seleccionadoNroDocumento: boolean = false;
  public totalFilas: number = 0;
  printedOrderId: number | null = null;

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  columnasAlias: { [key: string]: string } = {
    'NumeroOrden': 'Número de Análisis',
    'NumDoc': 'Número de Documento',
    'Apellido': 'Apellido',
    'Nombre': 'Nombre',
    'numeroHistoriaClinica': 'Número de Historia Clínica',
    'obraSocial': 'Obra Social',
    'solicitadoPor': 'Solicitado Por',
    'Medico': 'Médico',
    'Laboratorista': 'Laboratorista',
    'FechaSolicitud': 'Fecha de Solicitud',
    'NumeroOrdenDiario': 'Número de Orden Diario',
    'ListadoAnalisis': 'Listado de Análisis',
    'observaciones': 'Observaciones',
    'observacionesInternas': 'Observaciones Internas'
  };
  displayedColumns: string[] = [
    'NumeroOrden',
    'NumDoc',
    'Apellido',
    'Nombre',
    'numeroHistoriaClinica',
    'obraSocial',
    'solicitadoPor',
    'Medico',
    'Laboratorista',
    'FechaSolicitud',
    'NumeroOrdenDiario', 
    'ListadoAnalisis',
    'observaciones',
    'observacionesInternas'
    ];
   
  columnasSeleccionadas: string[] = [...this.displayedColumns, 'Acciones'];

  dataSource = new MatTableDataSource<NuevaOrden>();
  sort: any;
  public verAnalisisDesdeOtroComponente(data: any): void {
    this.verAnalisis(data);
  }

  constructor(
    private nuevaOrdenService: NuevaOrdenService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef,
    private datePipe: DatePipe,
    private srvImpresionCompleto: ImpresionServiceCompleto,
  ) {
  }
  private filtros: { analisis: string, nroOrden: string, numeroDocumento: string, nombreCompleto: string, fechaDesde: string, fechaHasta: string } = {
    analisis: '',
    nroOrden: '',
    numeroDocumento: '',
    nombreCompleto: '',
    fechaDesde: '',
    fechaHasta: '',
  };
  toggleColumn(columna: string) {
    if (columna === 'Acciones') {
      return;
    }
    const index = this.columnasSeleccionadas.indexOf(columna);

    if (index > -1) {
      this.columnasSeleccionadas.splice(index, 1);
    } else {
      const columnIndex = this.displayedColumns.indexOf(columna);
      if (columnIndex > -1) {
        this.columnasSeleccionadas.splice(columnIndex, 0, columna);
      }
    }
  }

  abrirPopup(columnasSeleccionadas: string[]): void {
    const dialogRef = this.dialog.open(PopUpColumnasComponent, {
      width: '400px',
      data: { columnasSeleccionadas }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.columnasSeleccionadas = result;
        this.cdr.detectChanges();
      }
    });
  }


  ngOnInit(): void {
    this.mostrarNuevaOrden();
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  };


  public mostrarCampoAnalisis(e: any) {
    this.mostrarAnalisis = this.seleccionadoAnalisis;
    if (e.checked == true) {
      this.mostrarOtrosCampos('Analisis');
    } else {
      this.ocultarOtrosCampos('Analisis');
    }
  }

  public mostrarCampoNroOrden(e: any) {
    this.mostrarNroOrden = this.seleccionadoNroOrden;
    if (e.checked == true) {
      this.mostrarOtrosCampos('NroOrden');
    } else {
      this.ocultarOtrosCampos('NroOrden');
    }
  }

  public mostrarCampoObservaciones(e: any) {
    this.mostrarObservaciones = this.seleccionadoObservaciones;
    if (e.checked == true) {
      this.mostrarOtrosCampos('observaciones');
    } else {
      this.ocultarOtrosCampos('observaciones');
    }
  }

  public mostrarCampoObservacionesInternas(e: any) {
    this.mostrarObservacionesInternas = this.seleccionadoObservacionesInternas;
    if (e.checked == true) {
      this.mostrarOtrosCampos('observacionesInternas');
    } else {
      this.ocultarOtrosCampos('observacionesInternas');
    }
  }

  public mostrarCampoNombreCompleto(e: any) {
    this.mostrarNombreCompleto = this.seleccionadoNombreCompleto;
    if (e.checked == true) {
      this.mostrarOtrosCampos('NombreCompleto');
    } else {
      this.ocultarOtrosCampos('NombreCompleto');
    }
  }

  public mostrarCampoNroDocumento(e: any) {
    this.mostrarNroDocumento = this.seleccionadoNroDocumento;
    if (e.checked == true) {
      this.mostrarOtrosCampos('NroDocumento');
    } else {
      this.ocultarOtrosCampos('NroDocumento');
    }
  }

  private mostrarOtrosCampos(campoActual: string) {
    if (campoActual == 'Analisis') {
      this.mostrarAnalisis = true;
    }
    if (campoActual == 'NroOrden') {
      this.mostrarNroOrden = true;
    }
    if (campoActual == 'NombreCompleto') {
      this.mostrarNombreCompleto = true;
    }
    if (campoActual == 'NroDocumento') {
      this.mostrarNroDocumento = true;
    }
  }

  private ocultarOtrosCampos(campoActual: string) {
    if (campoActual == 'Analisis') {
      this.mostrarAnalisis = false;
      this.filtros.analisis = '';
    }
    if (campoActual == 'NroOrden') {
      this.mostrarNroOrden = false;
      this.filtros.nroOrden = '';
    }
    if (campoActual == 'NombreCompleto') {
      this.mostrarNombreCompleto = false;
      this.filtros.nombreCompleto = '';
    }
    if (campoActual == 'NroDocumento') {
      this.mostrarNroDocumento = false;
      this.filtros.numeroDocumento = '';
    }
  }

  filtroAnalisis(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filtros.analisis = filterValue;
    this.filtrado(this.filtros);
  }


  filtroOrden(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filtros.nroOrden = filterValue;
    this.filtrado(this.filtros);
  }


  filtroDocumento(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filtros.numeroDocumento = filterValue;
    this.filtrado(this.filtros);
  }


  filtroNombreCompleto(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filtros.nombreCompleto = filterValue;
    this.filtrado(this.filtros);
  }


  private formattedStart: string = '';
  private formattedEnd: string = '';
  private formattedNow: string = '';
  dateRangeChange(dateRangeStart: HTMLInputElement, dateRangeEnd: HTMLInputElement) {
    this.filtros.fechaDesde = dateRangeStart.value;
    this.filtros.fechaHasta = dateRangeEnd.value;
    this.filtrado(this.filtros);
  }

  filtrado(filtros: any) {
    this.nuevaOrdenService.filtrado(filtros).subscribe({
      next: (dataResponse) => {
        this.dataSource.data = dataResponse.map((element: { fecha: string | number | Date | null; }) => {
          element.fecha = this.datePipe.transform(element.fecha, 'dd/MM/yyyy HH:mm:ss');
          return element;
        });
        this.totalFilas = this.dataSource.data.length;
      },
      error: (e) => {
        alert('Error al cargar las órdenes');
      },
    });
  }


  mostrarNuevaOrden() {
    let start = '', end = '';

    this.nuevaOrdenService.ObtenerOrdenesPorFecha(start, end).subscribe({
      next: (dataResponse) => {
        this.dataSource.data = dataResponse.map((element: { fecha: string | number | Date | null; }) => {
          element.fecha = this.datePipe.transform(element.fecha, 'dd/MM/yyyy HH:mm:ss');
          return element;
        });
      },
      error: (e) => {
        alert('Error al cargar las órdenes');
      },
    });
  }


  verAnalisis(data: any): void {
    interface Grupo {
      listado_de_analisis: any[];
    }
    const analisisArray: any[] = [];
    data.analisis.forEach((element: any) => {
      if (element && !analisisArray.some(e => e.nombre === element.nombre)) {
        analisisArray.push(element);
      }
    });
    data.grupos_analisis.forEach((element: any) => {
      element.listado_de_analisis.forEach((element: any) => {
        if (element && !analisisArray.some(e => e.nombre === element.nombre)) {
          analisisArray.push(element);
        }

      });
    });
    const grupo: Grupo = {
      listado_de_analisis: analisisArray
    };
    this.dialog.open(GruposAnalisisAnalisisxgruposComponent, {
      disableClose: true,
      data: { grupo }
    });
  }

  DialogoUnaNuevaOrden() {
    this.dialog.open(NuevaOrdenAgregarEditarComponent, {
      disableClose: true,
      width: "80%",
    }).afterClosed().subscribe(resultado => {
      if (resultado === "creado") {
        this.mostrarNuevaOrden();
      }
    });
  }

  DialogoEditarNuevaOrden(dataNuevaOrden: NuevaOrden) {
    this.dialog.open(NuevaOrdenAgregarEditarComponent, {
      disableClose: true,
      width: "80%",
      data: dataNuevaOrden

    }).afterClosed().subscribe(resultado => {
      if (resultado === "editado") {
        this.mostrarNuevaOrden();
      }
    });
  }

  mostrarAlerta(msg: string, accion: string, tipo: string) {
    this._snackBar.open(msg, accion, {
      horizontalPosition: "center",
      verticalPosition: "bottom",
      duration: 4 * 1000,
    });
  }

  imprimirInforme(datos: any) {
    const dialogRef = this.dialog.open(SiNoResultadosComponent, {
      width: '250px',
      data: { mensaje: 'Una vez Impreso no se podra Modificar. ¿Confirma Impresion?' }
    });
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result === true) {
        const doc = new jsPDF();
        datos.impresa = true;
        this.nuevaOrdenService.actualizarEstadoOrden(datos.id).subscribe(
          (response) => {
            console.log(response.message);
          },
          (error) => {
            console.error('Error al actualizar el estado de la orden:', error);
          });
        const encabezadoPagina = () => {

          doc.setFont('arial');
          doc.setFontSize(14);
          doc.text('LABORATORIO DE ANÁLISIS CLINICOS', 25, 20);

          doc.line(20, 10, 190, 10);

          doc.setFont("arial");
          doc.setFontSize(11);
          doc.text("HOSPITAL MUNICIPAL", 48, 28);
          doc.text("DR GUMERSINDO SAYAGO", 43, 36);
          doc.line(20, 40, 190, 40);

          doc.addImage("assets/imagenes/logomuni.png", "PNG", 130, 15, 64, 23);

          doc.setFont("arial");
          doc.setFontSize(10);

          doc.line(20, 65, 190, 65);

          doc.line(20, 65, 190, 65);

          const medicoNombre = datos.medicos ? datos.medicos.nombre : '';
          const medicoApellido = datos.medicos ? datos.medicos.apellido : '';

          doc.text(`Paciente: ${datos.paciente.nombre} ${datos.paciente.apellido}`, 25, 50);
          doc.text(`DNI: ${datos.paciente.numeroDocumento}`, 25, 55);
          doc.text(`Solicitado por: ${datos.solicitadoPor}`, 25, 60);


          doc.text(`Anális Nro: ${datos.id}`, 120, 50);
          doc.text(`Dr/a: ${medicoNombre} ${medicoApellido}`, 120, 55);
          doc.text(`Fecha Análisis: ${datos.fecha}`, 120, 60);

          doc.line(20, 65, 190, 65);
        }
        const columns = ["Análisis", "Valor Observado", "Valor Normal"];


        const filasAnalisis = datos.analisis.map((analisis: any) => {
          const resultado = datos.resultados.find((res: any) => res.id_analisis === analisis.id);
          return [
            { content: analisis.nombre },
            { content: resultado ? `${resultado.resultados} ${analisis.unidades}` : '' },
            { content: analisis.valores ? `${analisis.valores} ${analisis.unidades}` : '' }
          ];
        });


        const filasGruposAnalisis = datos.grupos_analisis.flatMap((grupo: any) => {
          const nombreInforme = [{ content: `${grupo.nombreInforme}`, styles: { fontStyle: 'bold' } }];

          const analisisDelGrupo = grupo.listado_de_analisis.map((analisis: any) => {
            const resultado = datos.resultados.find((res: any) => res.id_analisis === analisis.id);
            return [
              { content: analisis.nombre },
              { content: resultado ? `${resultado.resultados} ${analisis.unidades}` : '' },
              { content: analisis.valores ? `${analisis.valores} ${analisis.unidades}` : '' }
            ];
          });

          return [nombreInforme].concat(analisisDelGrupo);
        });


        const filasTotales = filasAnalisis.concat(filasGruposAnalisis);

        autoTable(doc, {
          didDrawPage: encabezadoPagina,
          startY: 70,
          tableWidth: 170,
          margin: { top: 70 },
          head: [columns],
          body: filasTotales,
          bodyStyles: { cellPadding: 1, halign: 'left' },
          headStyles: {
            fillColor: [255, 255, 255],
            textColor: [0, 0, 0],
            halign: 'left',
            valign: 'middle',
          },
          theme: 'plain',
        });

        const laboratoristaNombre = datos.laboratorista ? datos.laboratorista.nombre : '';
        const laboratoristaApellido = datos.laboratorista ? datos.laboratorista.apellido : '';
        const laboratoristaMatricula = datos.laboratorista ? datos.laboratorista.matricula : '';

        const hoy = new Date();
        const anio = hoy.getFullYear();
        const mes = String(hoy.getMonth() + 1).padStart(2, '0');
        const dia = String(hoy.getDate()).padStart(2, '0');
        const horas = String(hoy.getHours()).padStart(2, '0');
        const minutos = String(hoy.getMinutes()).padStart(2, '0');

        const fechaFormateada = `${anio}-${mes}-${dia}_${horas}-${minutos}`;
        const soloFechaFormateada = `${dia}-${mes}-${anio}`;
        const fechaImpresión = `${fechaFormateada}`;
        const nombreDocumento = `Informe_${fechaFormateada}`;
        const nombreCompleto = `${laboratoristaNombre} ${laboratoristaApellido}`;
        const matricula = `M.P.: ${laboratoristaMatricula}`;
        const fecha = soloFechaFormateada;

        const maxWidthNombre = doc.getTextWidth(nombreCompleto);
        const maxWidthMatricula = doc.getTextWidth(matricula);
        const maxWidthFecha = doc.getTextWidth(fecha);

        const totalWidth = Math.max(maxWidthNombre, maxWidthMatricula, maxWidthFecha);

        const spaceLeftNombre = ((totalWidth - maxWidthNombre) / 2)+ 150;
        const spaceLeftMatricula = ((totalWidth - maxWidthMatricula) / 2)+ 150;
        const spaceLeftFecha = ((totalWidth - maxWidthFecha) / 2)+ 150;

        
        const addFooter = () => {
          const pageCount = doc.getNumberOfPages();
          for (let i = 1; i <= pageCount; i++) {
              doc.setPage(i);
              doc.setFontSize(8);
              doc.text(`Pág. ${i} de ${pageCount}`, doc.internal.pageSize.width / 2, doc.internal.pageSize.height - 10, { align: "center" });
              if (i === pageCount) {
                doc.setFontSize(10);
                doc.text(`Observaciones: ${datos.observaciones}`, 20, 240);
                doc.text(nombreCompleto, spaceLeftNombre, 264);
                doc.text(matricula, spaceLeftMatricula, 270);
                doc.text(fecha, spaceLeftFecha, 276);
              }
            }
        };
      
        addFooter();
        doc.autoPrint();
        doc.output('dataurlnewwindow', { filename: `Informe_${fechaFormateada}.pdf` });
      }
      
    }); 
  }

      
  abrirCuadroDialogo(element: { _data: { _value: any[]; }; }) {
    const dialogRef = this.dialog.open(SiNoResultadosComponent, {
      width: '250px',
      data: { mensaje: '¿Desea incorporar resultados?' }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      const incluirResultado = this.columnasSeleccionadas.includes('ListadoAnalisis');
      var indice = this.columnasSeleccionadas.indexOf('Acciones');
      if (indice !== -1) {
        this.columnasSeleccionadas.splice(indice, 1);
      }

      const copiaColumnasSeleccionadas = [...this.columnasSeleccionadas];
      if (result === true) {
        copiaColumnasSeleccionadas.push('Resultados');
        this.srvImpresionCompleto.imprimir(
          { tablaOrdenes: element._data._value, titulo: 'Listado de Ordenes', columnas: copiaColumnasSeleccionadas, guardar: true, filtroAnalisis: this.mostrarAnalisis, analisis: this.filtros.analisis });

        var indiceResultados = this.columnasSeleccionadas.indexOf('Resultados');
        if (indiceResultados !== -1) {
          this.columnasSeleccionadas.splice(indiceResultados, 1);
        }
      } else if (result === false) {
        this.srvImpresionCompleto.imprimir(
          { tablaOrdenes: element._data._value, titulo: 'Listado de Ordenes', columnas: copiaColumnasSeleccionadas, guardar: true, filtroAnalisis: this.mostrarAnalisis, analisis: this.filtros.analisis });
      }
      this.columnasSeleccionadas.push('Acciones');
    });
  }

  onImprimirCompleto(element: any) {
    this.abrirCuadroDialogo(element);
  }

 
  
}
