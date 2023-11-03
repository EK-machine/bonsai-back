import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class EditBonsaiDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Max(999.99)
  @Min(0.01)
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

  @IsOptional()
  @IsString()
  category: string;

  @IsOptional()
  @IsString()
  level: string;

  @IsOptional()
  @IsBoolean()
  in_stock: boolean;
}
