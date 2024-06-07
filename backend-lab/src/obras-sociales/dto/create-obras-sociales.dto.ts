import { IsString, IsBoolean, IsNotEmpty } from 'class-validator';

export class CreateObraSocialDto {
  @IsBoolean()
  estado: boolean;

  @IsString()
  @IsNotEmpty({ message: 'El campo nombre Obra Social no puede estar vacío.' })
  nombreObraSocial: string;

  @IsString()
  CUIT?: string;

  @IsString()
  direccion?: string;

  @IsString()
  telefono?: string;

  @IsString()
  email?: string;

  @IsString()
  web?: string;
}
