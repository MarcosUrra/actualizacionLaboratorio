import { IsString, IsBoolean, IsNotEmpty } from 'class-validator';

export class CreateSolicitadoPorDto {
  @IsBoolean()
  estado: boolean;

  @IsString()
  @IsNotEmpty({ message: 'El campo nombre area no puede estar vacío.' })
  nombreSolicitadoPor: string;

  @IsString()
  direccion?: string;

  @IsString()
  provincia?: string;

  @IsString()
  ciudad?: string;

  @IsString()
  telefono?: string;
}
