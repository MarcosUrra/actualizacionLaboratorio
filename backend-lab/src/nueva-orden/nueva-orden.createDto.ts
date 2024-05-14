

export class EditarOrdenCreateDto {
  id: number;
  numeroOrdenDiario: string;
  numeroHistoriaClinica: string;
  obraSocial: string;
  paciente: {
    id: number;
    numeroDocumento: string;
    apellido: string;
    nombre: string;
  };
  medicos?: {
    id: number,
    nombre: string,
  };
  laboratorista?: {
    id: number,
    nombre: string,
  };
  solicitadoPor: string;
  analisis: [{
    id: number,
  }]; 
  grupos_analisis:[{
    id: number,
  }]; 
  fecha: Date;
  impresa: boolean;
  observaciones: string;
  observacionesInternas: string;
  
  constructor() {}
}