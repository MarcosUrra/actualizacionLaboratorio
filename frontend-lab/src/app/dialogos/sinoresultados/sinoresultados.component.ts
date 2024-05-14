import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-mi-cuadro-dialogo',
  templateUrl: './sinoresultados.component.html',
  styleUrls: ['./sinoresultados.component.css']
})
export class SiNoResultadosComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<SiNoResultadosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { mensaje: string }
  ) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close(false); 
  }

  onYesClick(): void {
    this.dialogRef.close(true); 
  }
}
