import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateServiceDto {
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

  @IsNotEmpty()
  @IsString()
  img_path: string;
}
