import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateBonsaiDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
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

  @IsNotEmpty()
  @IsString()
  category: string;

  @IsString()
  level: string;

  @IsNotEmpty()
  @IsBoolean()
  in_stock: boolean;
}
