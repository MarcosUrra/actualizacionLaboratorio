import { Subcategoria } from './Subcategoria.interface';

export interface Analisis {
  id?: number;
  codigo?: string;
  nombre?: string;
  valores?: string;
  unidades?: string;
  subcategorias: Subcategoria[];
}
