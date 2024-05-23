import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class crearMedicoDto {
  @IsBoolean()
  estado: boolean;

  @IsString()
  apellido: string;

  @IsString()
  nombre: string;

  @IsString()
  matricula: string;

  @IsString()
  especialidad: string;

  @IsOptional()
  tipoDocumento?: string;

  @IsOptional()
  numeroDocumento?: string;

  @IsOptional()
  telefono?: string;
}
