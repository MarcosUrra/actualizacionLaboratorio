import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GruposAnalisisService } from 'src/app/grupos-analisis/grupos-analisis.service'; 

@Component({
  selector: 'app-grupos-analisis-analisisxgrupos',
  templateUrl: './grupos-analisis-analisisxgrupos.component.html',
  styleUrls: ['./grupos-analisis-analisisxgrupos.component.css']
})
export class GruposAnalisisAnalisisxgruposComponent implements OnInit {

  analisisSeleccionados: any[] = [];
  id: number | undefined;

  constructor(
    public dialogRef: MatDialogRef<GruposAnalisisAnalisisxgruposComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any, 
    private gruposService: GruposAnalisisService)
  {}
  
  ngOnInit(): void {
    if (this.data && this.data.grupo) {
      this.analisisSeleccionados = this.data.grupo.listado_de_analisis;
    }
  }

  cerrarDialogo(): void {
    this.dialogRef.close();
  }
}

