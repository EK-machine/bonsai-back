import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateBonsaiDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsString()
  descr: string | null;

  @IsOptional()
  @IsString()
  img_path_1: string | null;

  @IsOptional()
  @IsString()
  img_path_2: string | null;

  @IsOptional()
  @IsString()
  img_path_3: string | null;

  @IsNotEmpty()
  @IsString()
  category: string;

  @IsString()
  level: string;

  @IsNotEmpty()
  @IsBoolean()
  in_stock: boolean;
}
