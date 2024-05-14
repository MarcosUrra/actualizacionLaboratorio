import { IsBoolean, IsNotEmpty, IsString } from "class-validator"

export class CreateUsuarioDto{
 
    @IsBoolean()
    estado: boolean;

    @IsString()
    @IsNotEmpty({message: 'El campo Apellido no puede estar vacío.'})
    apellido: string;

    @IsString()
    @IsNotEmpty({message: 'El campo Nombre no puede estar vacío.'})
    nombre: string;
    
    @IsString()
    @IsNotEmpty({message: 'El campo Usuario no puede estar vacío.'})
    username: string;

    @IsString()
    @IsNotEmpty({message: 'El campo contraseña no puede estar vacío.'})
    password: string;

    @IsString()
    @IsNotEmpty({message: 'El campo role no puede estar vacío.'})
    role: string;


}