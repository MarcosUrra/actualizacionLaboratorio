import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGrupoDto {
  @IsString()
  @IsNotEmpty({ message: 'El campo Nombre del Grupo no puede estar vacío.' })
  nombreDelGrupo: string;
  nombreInforme: string;
}
