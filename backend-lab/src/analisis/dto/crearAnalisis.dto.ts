import {
  IsNotEmpty,
  IsString,
  IsArray,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

export class SubcategoriaDto {
  @IsOptional()
  @IsString()
  id?: number;

  // @IsString()
  // @IsNotEmpty()
  // codigo: string;

  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  valores: string;

  @IsString()
  @IsNotEmpty()
  unidades: string;
}

export class CrearAnalisisDto {
  @IsString()
  @IsNotEmpty()
  codigo: string;

  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  valores: string;

  @IsString()
  @IsNotEmpty()
  unidades: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SubcategoriaDto)
  subcategorias: SubcategoriaDto[];
}
