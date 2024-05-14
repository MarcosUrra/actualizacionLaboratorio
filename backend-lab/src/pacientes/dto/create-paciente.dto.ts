import { IsNotEmpty, IsString } from "class-validator"

export class CreatePacienteDto{
    @IsString()
    @IsNotEmpty({message: 'El campo Tipo de Documento no puede estar vacío.'})
    tipoDocumento: string;
    
    @IsString()
    @IsNotEmpty({message: 'El campo Número de Documento no puede estar vacío.'})
    numeroDocumento: string;

    @IsString()
    @IsNotEmpty({message: 'El campo Apellido no puede estar vacío.'})
    apellido: string;

    @IsString()
    @IsNotEmpty({message: 'El campo Nombre no puede estar vacío.'})
    nombre: string;

    @IsString()
    @IsNotEmpty({message: 'El campo Fecha de Nacimiento no puede estar vacío.'}) 
    fechaNacimiento: string;
    
    @IsString()
    @IsNotEmpty({message: 'El campo Sexo no puede estar vacío.'})
    sexo: string;

    @IsString()
    @IsNotEmpty({message: 'El campo Domicilio no puede estar vacío.'})
    direccion: string;

    @IsString()
    @IsNotEmpty({message: 'El campo Localidad no puede estar vacío.'})
    localidad: string;

    @IsString()
    @IsNotEmpty({message: 'El campo Provincia no puede estar vacío.'})
    provincia: string;
    
    @IsString()
    @IsNotEmpty({message: 'El campo Teléfono no puede estar vacío.'})
    telefono: string;

    @IsString()
    @IsNotEmpty({message: 'El campo Email no puede estar vacío.'})
    email: string;





    @IsString()
    @IsNotEmpty({message: 'El campo Nombre del Grupo no puede estar vacío.'})
    nombreDelGrupo: string
}