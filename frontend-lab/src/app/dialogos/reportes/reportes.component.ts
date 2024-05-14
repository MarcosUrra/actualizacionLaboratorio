import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import autoTable from 'jspdf-autotable';
import jsPDF from 'jspdf';
import { DatePipe } from '@angular/common';
import { NuevaOrdenService } from 'src/app/nueva-orden/nueva-orden.service';

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
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    DatePipe
  ]

})

export class ReportesComponent {

  formReportes: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ReportesComponent>,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private nuevaOrdenService: NuevaOrdenService,
  ) {
    this.formReportes = this.fb.group({

      fecha: ['',
        Validators.required],
    });
  }

  ngOnInit(): void {
    this.formReportes = new FormGroup({
      fecha: new FormControl()
    });
  }


  volver(): void {
    this.dialogRef.close();
  }

  imprimirReporteDiario() {
    if (this.formReportes?.get('fecha')) {
      const fechaSeleccionada: Date = this.formReportes.get('fecha')!.value;
      const fechaFormateada: string = this.datePipe.transform(fechaSeleccionada, 'MM/dd/yyyy') || '';
      this.nuevaOrdenService.obtenerOrdenesReporteDiario(fechaFormateada).subscribe({
        next: (ordenes: any[]) => {
          this.imprimir(ordenes)
          
        },
      });
    }

}
  imprimir(data: any[]) {
    const fechaSeleccionada: Date = this.formReportes.get('fecha')!.value;
    const fecha: string = this.datePipe.transform(fechaSeleccionada, 'MM/dd/yyyy') || '';
    const header = [['Número de Análisis', 'Número de Documento', 'Nombre y Apellido', 'Análisis Realizados']];
    let analisisArray: any[] = [];
    data.forEach(element => {
      element.analisis.forEach((element: any) => {
        if (element && !analisisArray.some(e => e.nombre === element.nombre)) {
          analisisArray.push(element);
        }
      });
      element.grupos_analisis.forEach((element: any) => {
        element.listado_de_analisis.forEach((element: any) => {
          if (element && !analisisArray.some(e => e.nombre === element.nombre)) {
            analisisArray.push(element);
          }

        });
      });
    });
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: 'A4'
    });

    
    doc.text(`Reporte de Análisis Diario: ${fecha}`, doc.internal.pageSize.width / 2, 25, { align: "center" });
    doc.text(`Total de registros: ${analisisArray.length}`, 28, 25);

    const addFooter = () => {
      const hoy = new Date();
      const anio = hoy.getFullYear();
      const mes = String(hoy.getMonth() + 1).padStart(2, '0');
      const dia = String(hoy.getDate()).padStart(2, '0');
      const horas = String(hoy.getHours()).padStart(2, '0');
      const minutos = String(hoy.getMinutes()).padStart(2, '0');

      const fechaFormateada = `${dia}/${mes}/${anio}  ${horas}:${minutos}`;

      const pageCount = doc.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);

        doc.setFontSize(8);
        doc.text(`HOSPITAL MUNICIPAL DR GUMERSINDO SAYAGO   ${fechaFormateada}   Pág. ${i} de ${pageCount}`, doc.internal.pageSize.width / 2, doc.internal.pageSize.height - 10, { align: "center" });
      }
    };
   
    const rows: (string | number)[][] = [];
    data.forEach(orden => {
      analisisArray.forEach((element: any) => {
        const row = [
          orden.id,
          orden.paciente.numeroDocumento,
          `${orden.paciente.nombre} ${orden.paciente.apellido}`,
          element.nombre,
        ];
        rows.push(row);
      });
    });
    autoTable(doc, {
      head: header,
      body: rows,
    });

    addFooter();
    
    const hoy = new Date();
    const anio = hoy.getFullYear();
    const mes = String(hoy.getMonth() + 1).padStart(2, '0');
    const dia = String(hoy.getDate()).padStart(2, '0');
    const horas = String(hoy.getHours()).padStart(2, '0');
    const minutos = String(hoy.getMinutes()).padStart(2, '0');

    const fechaFormateada = `${dia}/${mes}/${anio}  ${horas}:${minutos}`;
    doc.autoPrint();
    doc.output('dataurlnewwindow', {filename:`Reporte de Análisis Diario ${fechaFormateada}.pdf` });
  }

}
