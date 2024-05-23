import { Subcategoria } from './subcategoria';

export interface Analisis {
  id?: number | undefined;
  codigo: string;
  nombre: string;
  valores: string;
  unidades: string;
  resultados?: string;
  subcategorias: Subcategoria[] | undefined;
}
