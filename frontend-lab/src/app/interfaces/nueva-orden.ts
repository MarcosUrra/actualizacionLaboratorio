export interface NuevaOrden {
  id: number;
  numeroOrdenDiario: string;
  numeroHistoriaClinica: string;
  obraSocial: string;
  paciente: {
    id: number | undefined;
    numeroDocumento: string;
    apellido: string;
    nombre: string;
  };
  medicos?: {
    id: number,
    nombre: string;
  };
  laboratorista?: {
    id: number,
    nombre: string;
  };
  solicitadoPor: string;
  analisis: string[]; 
  grupos_analisis: string[]; 
  fecha: Date;
  valores: string;
  unidades: string;
  observaciones: string;
  observacionesInternas: string;
}