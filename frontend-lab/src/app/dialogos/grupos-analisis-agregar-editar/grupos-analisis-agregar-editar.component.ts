import { Component, OnInit, Inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GrupoAnalisis } from 'src/app/interfaces/grupos-analisis'; 
import { GruposAnalisisService } from 'src/app/grupos-analisis/grupos-analisis.service'; 
import { Analisis } from 'src/app/interfaces/analisis';
import { GruposAnalisisAnalisisxgruposComponent } from '../grupos-analisis-analisisxgrupos/grupos-analisis-analisisxgrupos.component';

@Component({
  selector: 'app-grupos-analisis-agregar-editar',
  templateUrl: './grupos-analisis-agregar-editar.component.html',
  styleUrls: ['./grupos-analisis-agregar-editar.component.css']
})
export class GruposAnalisisAgregarEditarComponent implements OnInit {


  formGrupo: FormGroup;
  listadoAnalisisControl: FormControl;
  tituloAccion:string = "NUEVO";
  botonAccion:string = "GUARDAR";
  listadoAnalisisValores: Analisis[] = [];
  analisis: any;

  constructor( 
    private dialogoReferencia: MatDialogRef<GruposAnalisisAgregarEditarComponent>,
    private fb:FormBuilder,
    private _snackBar: MatSnackBar,
    private gruposService: GruposAnalisisService,
    @Inject (MAT_DIALOG_DATA) public dataGrupo:GrupoAnalisis,
    private dialog: MatDialog

  ){
    this.listadoAnalisisControl = this.fb.control([]);
    this.formGrupo=this.fb.group({
      nombreDelGrupo:['', Validators.required],
      nombreInforme:[' '],
      listado_de_analisis: this.listadoAnalisisControl
    });      
  }

  mostrarAlerta(msg: string, accion: string) {
    this._snackBar.open(msg, accion, {
      horizontalPosition:"center",
      verticalPosition:"bottom",
      duration: 4 * 1000,
    });
  }

  ngOnInit(): void{
    this.gruposService.obtenerListadoAnalisis().subscribe(data => {
      this.listadoAnalisisValores = data;
    });

    if (this.dataGrupo != null) {
      this.tituloAccion = "MODIFICAR DATOS DEL";
      this.botonAccion = "ACTUALIZAR";

      this.gruposService.obtenerGrupoAnalisisPorId(this.dataGrupo.id).subscribe(grupo => {
        const listadoAnalisisIds = grupo.listado_de_analisis?.map((analisis: any) => analisis.id) || [];
        this.formGrupo.setValue({
          nombreDelGrupo: grupo.nombreDelGrupo,
          nombreInforme: grupo.nombreInforme,
          listado_de_analisis: listadoAnalisisIds
        });

        this.listadoAnalisisControl.setValue(listadoAnalisisIds);
      });
    }
  }

  filtrarAnalisis(): void {
    if (event?.target instanceof HTMLInputElement) {
      const termino = event.target.value || '';
    const analisisFiltrados = this.listadoAnalisisValores.filter(analisis =>
      analisis.nombre.toLowerCase().includes(termino.toLowerCase())
    );
  
    this.listadoAnalisisValores = analisisFiltrados;
  }
}

  volver(): void {  
    this.dialogoReferencia.close();
  }

  abrirDialogoAnalisisSeleccionados() {
    const dialogRef = this.dialog.open(GruposAnalisisAnalisisxgruposComponent, {
      data: {
        analisisSeleccionados: this.formGrupo.value.listado_de_analisis
      }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
    });
  }
    
  
  agregarEditarGrupo(){ 
    const idsSeleccionados = this.formGrupo.value.listado_de_analisis;
    const modelo: GrupoAnalisis={
      id : this.dataGrupo == null? 0 : this.dataGrupo.id,
      nombreDelGrupo:this.formGrupo.value.nombreDelGrupo,
      nombreInforme:this.formGrupo.value.nombreInforme,
      listado_de_analisis:idsSeleccionados,  
    };

    if(this.dataGrupo==null){
      this.gruposService.crearGrupo(modelo).subscribe({
        next:(data)=>{
            this.mostrarAlerta('Grupo creado correctamente.', "Listo");
            this.dialogoReferencia.close({listadoGruposValores:data});   
        },error:(e)=>{
          
          this.mostrarAlerta("El grupo ya existe.", "Error")
        }
      })
    }else{         
      this.gruposService.modificarGrupo(this.dataGrupo.id, modelo).subscribe({
        next:(data)=>{
          this.mostrarAlerta('Grupo modificado correctamente.', "Listo");
          this.dialogoReferencia.close({listadoGruposValores:data});   
        },error:(e)=>{
        this.mostrarAlerta("No se pudo modificar el grupo.", "Error")
        }
      });
    } 
  }
}