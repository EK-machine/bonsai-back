import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class EditSoilDto {
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
  img_path: string;

  @IsOptional()
  @IsBoolean()
  in_stock: boolean;
}
