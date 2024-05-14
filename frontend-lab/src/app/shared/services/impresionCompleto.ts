import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';


@Injectable({
  providedIn: 'root'
})
export class ImpresionServiceCompleto {
  private columnasEquivalencias: { [nombreOriginal: string]: string } = {
    "NumeroOrden": "Número Análisis",
    "NumDoc": "Número de Documento",
    "Apellido": "Apellido",
    "Nombre": "Nombre",
    "numeroHistoriaClinica": "Historia Clínica",
    "obraSocial": "Obra Social",
    "solicitadoPor": "Solicitado Por",
    "Medico": "Médico",
    "Laboratorista": "Laboratorista",
    "FechaSolicitud": "Fecha Solicitud",
    "NumeroOrdenDiario": "Orden Diario",
    "ListadoAnalisis": "Análisis",
    "Resultados": "Resultado",
  };

  constructor(private datePipe: DatePipe) { }

  imprimir({ tablaOrdenes, titulo, columnas, guardar, filtroAnalisis, analisis }: { tablaOrdenes: any[]; titulo: string; columnas: string[]; guardar?: boolean; filtroAnalisis: boolean; analisis: string; }) {
    const analisisArray: any[] = [];
    tablaOrdenes.forEach(element => {
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
    const columnasOrdenadas = columnas.map(column => this.columnasEquivalencias[column] || column);
   
    let body: any[] = [];

    tablaOrdenes.forEach(element => {
      analisisArray.forEach(analisisElement => {
        let rowData: any[] = [];
        if (filtroAnalisis == true && analisisElement.nombre.toLocaleLowerCase().includes(analisis.toLocaleLowerCase())) {
          columnasOrdenadas.forEach(column => {
            switch (column) {
              case "Número Análisis":
                rowData.push(element.id);
                break;
              case "Orden Diario":
                rowData.push(element.numeroOrdenDiario);
                break;
              case "Historia Clínica":
                rowData.push(element.numeroHistoriaClinica);
                break;
              case "Obra Social":
                rowData.push(element.obraSocial);
                break;
              case "Número de Documento":
                if (element.paciente) {
                  rowData.push(element.paciente.numeroDocumento);
                } else {
                  rowData.push(null);
                }
                break;
              case "Apellido":
                if (element.paciente) {
                  rowData.push(element.paciente.apellido);
                } else {
                  rowData.push(null);
                }
                break;
              case "Nombre":
                if (element.paciente) {
                  rowData.push(element.paciente.nombre);
                } else {
                  rowData.push(null);
                }
                break;
              case "Médico":
                if (element.medicos) {
                  rowData.push(element.medicos.nombre + " " + element.medicos.apellido);
                } else {
                  rowData.push(null);
                }
                break;
              case "Laboratorista":
                if (element.laboratorista) {
                  rowData.push(element.laboratorista.nombre);
                } else {
                  rowData.push(null);
                }
                break;
              case "Solicitado Por":
                rowData.push(element.solicitadoPor);
                break;
              case "Análisis":
                if (analisisElement.nombre) {
                  if (filtroAnalisis == true && analisisElement.nombre.toLocaleLowerCase().includes(analisis.toLocaleLowerCase())) {
                    rowData.push(analisisElement.nombre);
                  } else if (!filtroAnalisis) {
                    rowData.push(analisisElement.nombre);
                  }
                } else {
                  rowData.push(null);
                }
                break;
              case "Resultado":
                if (element.resultados && element.resultados.length > 0) {
                  element.resultados.forEach((resultado: {
                    resultados: any; id_analisis: any;
                  }) => {
                    if (resultado.id_analisis == analisisElement.id) {
                      rowData.push(resultado.resultados + " " + analisisElement.unidades)
                    }
                  });
                } else {
                  rowData.push(null);
                }
                break;
              case "Fecha Solicitud":
                rowData.push(element.fecha);
                break;

            }
          });
          body.push(rowData);
        } else if (filtroAnalisis == false) {
          columnasOrdenadas.forEach(column => {
            switch (column) {
              case "Número Análisis":
                rowData.push(element.id);
                break;
              case "Orden Diario":
                rowData.push(element.numeroOrdenDiario);
                break;
              case "Historia Clínica":
                rowData.push(element.numeroHistoriaClinica);
                break;
              case "Obra Social":
                rowData.push(element.obraSocial);
                break;
              case "Número de Documento":
                if (element.paciente) {
                  rowData.push(element.paciente.numeroDocumento);
                } else {
                  rowData.push(null);
                }
                break;
              case "Apellido":
                if (element.paciente) {
                  rowData.push(element.paciente.apellido);
                } else {
                  rowData.push(null);
                }
                break;
              case "Nombre":
                if (element.paciente) {
                  rowData.push(element.paciente.nombre);
                } else {
                  rowData.push(null);
                }
                break;
              case "Médico":
                if (element.medicos) {
                  rowData.push(element.medicos.nombre + " " + element.medicos.apellido);
                } else {
                  rowData.push(null);
                }
                break;
              case "Laboratorista":
                if (element.laboratorista) {
                  rowData.push(element.laboratorista.nombre);
                } else {
                  rowData.push(null);
                }
                break;
              case "Solicitado Por":
                rowData.push(element.solicitadoPor);
                break;
              case "Análisis":
                if (analisisElement.nombre) {

                  rowData.push(analisisElement.nombre);

                } else {
                  rowData.push(null);
                }
                break;
              case "Resultado":
                if (element.resultados && element.resultados.length > 0) {
                  element.resultados.forEach((resultado: {
                    resultados: any; id_analisis: any;
                  }) => {
                    if (resultado.id_analisis == analisisElement.id) {
                      rowData.push(resultado.resultados + " " + analisisElement.unidades)
                    }
                  });
                } else {
                  rowData.push(null);
                }
                break;
              case "Fecha Solicitud":
                rowData.push(element.fecha);
                break;

            }
          });
          body.push(rowData);
        }
      });
    });
    const totalFilas = body.length;

    const fechaHoraActual = this.datePipe.transform(new Date(), 'dd/MM/yyyy HH:mm');

    const doc = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: 'A4'
    });
    
    
    doc.text(`Total de Registros: ${tablaOrdenes.length}`, 28, 25);
     doc.text(titulo, doc.internal.pageSize.width / 2, 25, { align: "center" });
     autoTable(doc, {
         body: body,
         columns: columnas.map(column => (
             { header: this.columnasEquivalencias[column], dataKey: column }
         ))
     });
  
    const addFooter = () => {
      const pageCount = doc.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
         
          doc.setPage(i);
          doc.setFont("arial");
       
          doc.setFontSize(8);
          doc.text(`HOSPITAL MUNICIPAL DR GUMERSINDO SAYAGO   ${fechaHoraActual} - Pág. ${i} de ${pageCount}`, doc.internal.pageSize.width / 2, doc.internal.pageSize.height - 10, { align: "center" });
        }
  };
 
    addFooter();

    if (guardar) {
      const hoy = new Date();
      const anio = hoy.getFullYear();
      const mes = String(hoy.getMonth() + 1).padStart(2, '0');
      const dia = String(hoy.getDate()).padStart(2, '0');
      const horas = String(hoy.getHours()).padStart(2, '0');
      const minutos = String(hoy.getMinutes()).padStart(2, '0');

      const fechaFormateada = `${anio}-${mes}-${dia}_${horas}-${minutos}`;

      const nombreDocumento = `Reporte_${fechaFormateada}`;
      doc.setProperties({
        title: nombreDocumento
      });
      doc.autoPrint();
      doc.output('dataurlnewwindow', { filename: `Reporte_${fechaFormateada}.pdf` });

    }
  }
}