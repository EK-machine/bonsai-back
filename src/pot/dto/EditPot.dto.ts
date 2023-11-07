import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  Validate,
} from 'class-validator';
import { POT_SHAPE_IS_NOT_CORRECT } from '../consts/pot.constants.js';
import { ShapeValidation } from '../custom-validators/shape-validator.custom.js';

export class EditPotDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  size: string;

  @IsOptional()
  @IsString()
  @Validate(ShapeValidation, { message: POT_SHAPE_IS_NOT_CORRECT })
  shape: string;

  @IsOptional()
  @IsString()
  color: string;

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
