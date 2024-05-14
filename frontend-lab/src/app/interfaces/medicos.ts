export interface Medicos {
    id?:number;
    estado: boolean; 
    apellido:string;
    nombre:string;
    matricula:string;
    especialidad:string;
    tipoDocumento?:string;
    numeroDocumento?:string;
    telefono?:string
}