import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subcategoria } from 'src/app/interfaces/subcategoria';

@Component({
  selector: 'app-subcategoria-detalles-dialog',
  templateUrl: './subcategoriaDetallesDialog.component.html',
  styleUrls: ['./subcategoriaDetallesDialog.component.css'],
})
export class SubcategoriaDetallesDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<SubcategoriaDetallesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Subcategoria
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
