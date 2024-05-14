import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';

@Injectable({
  providedIn: 'root'
})
export class ImpresionService {


  constructor(private datePipe: DatePipe) { }


  imprimir(data: any[], titulo: string,columnas: string[], guardar?: boolean) {
   

    const doc = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: 'A4'
    });

    let totalFilas = 0;
    data.forEach(row => {
      totalFilas += 1;
    });
    doc.text(titulo, doc.internal.pageSize.width/2,25,{align:"center"});
    doc.text(`Total de registros: ${totalFilas}`, 28, 25);

    const addFooter = () => {
      const fechaHoraActual = this.datePipe.transform(new Date(), 'dd/MM/yyyy HH:mm'); 
      const pageCount = doc.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
          
          doc.setPage(i);
          doc.setFont("arial");
          
          doc.setFontSize(8);
          doc.text(`HOSPITAL MUNICIPAL DR GUMERSINDO SAYAGO   ${fechaHoraActual} - Pág. ${i} de ${pageCount}`, doc.internal.pageSize.width / 2, doc.internal.pageSize.height - 10, { align: "center" });
      }
    };

   
   const datosTabla: any[][] = [];
    data.forEach(row => {
      const rowData: any[] = [];
      columnas.forEach(col => {
        rowData.push(row[col]);
      });
      datosTabla.push(rowData);
    });
     autoTable(doc, {
      head: [columnas],
      body: datosTabla
    });

    addFooter();

    if (guardar) {
      const hoy = new Date();
      const anio = hoy.getFullYear();
      const mes = String(hoy.getMonth() + 1).padStart(2, '0');
      const dia = String(hoy.getDate()).padStart(2, '0');
      const horas = String(hoy.getHours()).padStart(2, '0');
      const minutos = String(hoy.getMinutes()).padStart(2, '0');

      const fechaFormateada = `${anio}-${mes}-${dia}_${horas}-${minutos}`;
    
      const nombreDocumento = `Listado_${fechaFormateada}`;
      doc.setProperties({
      title: nombreDocumento
      });
      doc.autoPrint();
      doc.output('dataurlnewwindow', {filename:`Listado_${fechaFormateada}.pdf` });      
    }
  }
}

