import { IsNotEmpty, IsString } from "class-validator"

export class CrearAnalisisDto{

    @IsString()
    @IsNotEmpty({message: 'El codigo no puede estar vacío.'})
    codigo: string;

    @IsString()
    @IsNotEmpty({message: 'El campo Nombre no puede estar vacío.'})
    nombre: string;

    @IsString()
    @IsNotEmpty({message: 'El campo Valores no puede estar vacío.'})
    valores: string;

    @IsString()
    @IsNotEmpty({message: 'El campo Unidades no puede estar vacío.'})
    unidades: string;


}