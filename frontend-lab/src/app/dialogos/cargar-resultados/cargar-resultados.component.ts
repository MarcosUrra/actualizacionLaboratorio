import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { NuevaOrdenService } from 'src/app/nueva-orden/nueva-orden.service';
import { Analisis } from 'src/app/interfaces/analisis';
import { Resultados } from 'src/app/interfaces/resultados';
import { Subcategoria } from 'src/app/interfaces/subcategoria';

@Component({
  selector: 'app-cargar-resultados',
  templateUrl: './cargar-resultados.component.html',
  styleUrls: ['./cargar-resultados.component.css'],
})
export class CargarResultadosComponent implements OnInit {
  listadoAnalisisValores: Analisis[] = [];
  formCargarResultados: FormGroup;
  tituloAccion: string = 'CARGAR RESULTADOS';
  resultadosPrevios: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<CargarResultadosComponent>,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private nuevaOrdenService: NuevaOrdenService,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: {
      id: number,
      IdAnalisis: number,
      listadoAnalisisValores: Analisis[],
      idOrden: number,
      unidades: string,
      numeroOrdenDiario: string,
    }
  ) {
    this.listadoAnalisisValores = this.data.listadoAnalisisValores;
    this.formCargarResultados = this.fb.group({
      idOrden: [''],
      idAnalisis: [''],
      resultados: ['', Validators.required],
      resultadoId: [''],
    });
  }

  ngOnInit(): void {
    console.log('Listado de análisis:', this.listadoAnalisisValores);
    this.obtenerResultados();
    this.data.listadoAnalisisValores.forEach((analisis: Analisis) => {
      this.formCargarResultados.addControl('analisis_' + analisis.id, this.fb.control(''));
      if (analisis.subcategorias) {
        analisis.subcategorias.forEach((subcat: Subcategoria) => {
          this.formCargarResultados.addControl('subcategoria_' + subcat.id, this.fb.control(''));
        });
      }
    });
    // console.log('Listado de subcategorías:', this.data.listadoAnalisisValores.map(a => a.subcategorias).flat());
    console.log('Listado de subcategorías:', this.data.listadoAnalisisValores); //este es el array que debo usar en el segundo ngfor, debo preguntar si el id del primer array es uigual al id del segundo array, si se cumple esa condicion, es donde haria subcategoria.nombre, subcategoria.valores
    this.listadoAnalisisValores = this.data.listadoAnalisisValores.flat();
  }                                                                           //

  obtenerResultados(): void {
    this.nuevaOrdenService
      .obtenerResultadosPorOrden(this.data.idOrden)
      .subscribe((resultados: Resultados[]) => {
        this.data.listadoAnalisisValores.forEach(element => {
          
        });
        this.resultadosPrevios = resultados || [];
        this.llenarFormularioConResultadosPrevios();
      });
  }

  llenarFormularioConResultadosPrevios(): void {
    this.resultadosPrevios.forEach((resultado: any) => {
      const controlName = 'analisis_' + resultado.id_analisis;
      const resultadoControl = this.formCargarResultados.get(controlName);
      const resultadoIdControl = this.formCargarResultados.get('resultadoId');
      if (resultadoControl && resultadoIdControl) {
        resultadoControl.setValue(resultado.resultados);
        resultadoIdControl.setValue(resultado.id);
      }

      if (resultado.subcategorias) {
        resultado.subcategorias.forEach((subcat: Subcategoria) => {
          const subcatControlName = 'subcategoria_' + subcat.id;
          const subcatControl = this.formCargarResultados.get(subcatControlName);
          if (subcatControl) {
            subcatControl.setValue(subcat.valores);
          }
        });
      }
    });
  }

  verAnalisis(data: any, unidades: any): void {
    console.log('Datos para ver análisis:', data);
    const analisisArray: any[] = [];

    data.analisis.forEach((element: any) => {
      if (element && !analisisArray.some(e => e.nombre === element.nombre)) {
        const analisisConResultados = {
          ...element,
          unidades: unidades[`analisis_${element.id}`],
          resultados: [],
        };
        analisisArray.push(analisisConResultados);
      }
    });

    data.grupos_analisis.forEach((grupo: any) => {
      grupo.listado_de_analisis.forEach((element: any) => {
        if (element && !analisisArray.some(e => e.nombre === element.nombre)) {
          const analisisConResultados = {
            ...element,
            unidades: unidades[`analisis_${element.id}`],
            resultados: [],
          };
          analisisArray.push(analisisConResultados);
        }
      });
    });

    if (this.data.idOrden) {
      this.nuevaOrdenService
        .obtenerResultadosPorOrden(this.data.idOrden)
        .subscribe((resultados: Resultados[]) => {
          this.resultadosPrevios = resultados || [];
          this.llenarFormularioConResultadosPrevios();
        });
    } else {
      console.error('this.data.idOrden es undefined. Asegúrate de asignar un valor válido antes de llamar a obtenerResultados().');
    }

    this.listadoAnalisisValores = analisisArray;
  }

  volver(): void {
    this.dialogRef.close();
  }

  guardarResultados(): void {
    this.obtenerResultados();
    const resultados = {
      resultados: this.formCargarResultados.get('resultados')?.value || '',
      analisis: [] as { id: number; resultado: any }[],
    };
    this.listadoAnalisisValores.forEach((analisis: Analisis) => {
      const resultadoControl = this.formCargarResultados.get('analisis_' + analisis.id);
      const resultado = resultadoControl?.value || '';
      if (analisis.id !== undefined) {
        resultados.analisis.push({ id: analisis.id, resultado });
      }
      if (analisis.subcategorias) {
        analisis.subcategorias.forEach((subcat: Subcategoria) => {
          const subcatControl = this.formCargarResultados.get('subcategoria_' + subcat.id);
          const subcatResultado = subcatControl?.value || '';
          resultados.analisis.push({ id: subcat.id, resultado: subcatResultado });
        });
      }
    });

    this.resultadosPrevios.forEach((r: any) => {
      const analisisExistente = resultados.analisis.find((a) => a.id === r.id_analisis);
      if (analisisExistente) {
        if (r.resultados !== analisisExistente.resultado) {
          this.actualizarResultadoEnBD(r.id, analisisExistente.resultado);
        }
      }
    });

    resultados.analisis.forEach((a: { id: any; resultado: any }) => {
      const resultadoExistente = this.resultadosPrevios.find((r) => r.id_analisis === a.id);
      if (resultadoExistente) {
        if(resultadoExistente.resultados !== a.resultado){
          this.actualizarResultadoEnBD(resultadoExistente.id, a.resultado);
        }
      } else {
        this.crearNuevoResultadoEnBD(a);
      }
    });

    this.dialogRef.close('guardado');
  }

  mostrarAlerta(msg: string, accion: string) {
    this.snackBar.open(msg, accion, {
      horizontalPosition: "center",
      verticalPosition: "bottom",
      duration: 4 * 1000,
    })
  }

  crearNuevoResultadoEnBD(analisis: { id: any; resultado: any }): void {
    this.nuevaOrdenService.guardarResultados(this.data.idOrden, {
      resultados: '',
      analisis: [{ id: analisis.id, resultado: analisis.resultado }],
    })
    .subscribe({
      next: (data) => {
        this.mostrarAlerta('Resultado guardado correctamente', "Listo");
        this.resultadosPrevios.push(data);
      },
      error: (error) => {
        console.error('Error al crear nuevo resultado en la base de datos:', error);
        this.mostrarAlerta('No se pudo guardar el resultado', "Error");
      }
    });
  }

  actualizarResultadoEnBD(idResultado: number, nuevoResultado: any): void {
    this.nuevaOrdenService.modificarResultado(idResultado, nuevoResultado)
      .subscribe({
        next: (respuesta) => {
          const index = this.resultadosPrevios.findIndex(resultado => resultado.id === idResultado);
          if (index !== -1) {
            this.resultadosPrevios[index] = { id: idResultado, resultado: nuevoResultado };
            this.mostrarAlerta('Resultado guardado correctamente', "Listo");
          } else {
            console.error('No se encontró el resultado en resultadosPrevios con id:', idResultado);
          }
        },
        error: (error) => {
          console.error('Error al actualizar resultado en la base de datos:', error);
          this.mostrarAlerta('No se pudo guardar el resultado', "Error");
        }
      });
  }
}
