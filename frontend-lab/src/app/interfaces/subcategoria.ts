import { Analisis } from './analisis';

export interface Subcategoria {
  id: number;
  codigo: string;
  nombre: string;
  valores: string;
  unidades: string;
  analisis: Analisis; // importar AnalisisEntity
}
