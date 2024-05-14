

export interface Laboratorista {
    id: number;
    apellido: string ;
    nombre: string ; 
    matricula: string ;
    especialidad: string;
    tipoDocumento?: string;
    numeroDocumento?: string;
    telefono?: string;
    estado: boolean;
    
}