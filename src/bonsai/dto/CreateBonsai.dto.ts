import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateBonsaiDto {
  @IsString()
  name: string;

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

  @IsString()
  category: string;

  @IsString()
  level: string;

  @IsBoolean()
  in_stock: boolean;
}
