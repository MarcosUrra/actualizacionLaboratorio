export interface Paciente {
    id?: number;
    tipoDocumento?:string;
    numeroDocumento?: string;
    apellido?: string;
    nombre?: string;
    fechaNacimiento?: string;
    sexo?: string;
    direccion?: string;
    localidad?: string;
    provincia?: string;
    telefono?: string;
    email?: string;
}