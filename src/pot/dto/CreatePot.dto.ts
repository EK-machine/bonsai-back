import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  Validate,
} from 'class-validator';
import { POT_SHAPE_IS_NOT_CORRECT } from '../consts/pot.constants.js';
import { ShapeValidation } from '../custom-validators/shape-validator.custom.js';

export class CreatePotDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  size: string;

  @IsNotEmpty()
  @IsString()
  @Validate(ShapeValidation, { message: POT_SHAPE_IS_NOT_CORRECT })
  shape: string;

  @IsNotEmpty()
  @IsString()
  color: string;

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

  @IsNotEmpty()
  @IsBoolean()
  in_stock: boolean;
}
