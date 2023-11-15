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
import { VALIDATION_MSGS } from '../../common/consts/common.consts.js';
import { ShapeValidation } from '../custom-validators/shape-validator.custom.js';

export class CreatePotDto {
  @IsNotEmpty({ message: VALIDATION_MSGS.POT_NAME_NOT_EMPTY })
  @IsString({ message: VALIDATION_MSGS.POT_NAME_IS_STRING })
  name: string;

  @IsNotEmpty({ message: VALIDATION_MSGS.POT_SIZE_NOT_EMPTY })
  @IsString({ message: VALIDATION_MSGS.POT_SIZE_IS_STRING })
  size: string;

  @IsNotEmpty({ message: VALIDATION_MSGS.POT_SHAPE_NOT_EMPTY })
  @IsString({ message: VALIDATION_MSGS.POT_SHAPE_IS_STRING })
  @Validate(ShapeValidation, {
    message: VALIDATION_MSGS.POT_SHAPE_IS_NOT_CORRECT,
  })
  shape: string;

  @IsNotEmpty({ message: VALIDATION_MSGS.POT_COLOR_NOT_EMPTY })
  @IsString({ message: VALIDATION_MSGS.POT_COLOR_IS_STRING })
  color: string;

  @IsNotEmpty({ message: VALIDATION_MSGS.PRICE_NOT_EMPTY })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: VALIDATION_MSGS.PRICE_CONSTRAINTS },
  )
  @Max(999.99, { message: VALIDATION_MSGS.MAX_PRICE })
  @Min(0.01, { message: VALIDATION_MSGS.MIN_PRICE })
  price: number;

  @IsOptional()
  @IsString({ message: VALIDATION_MSGS.POT_DESCR_IS_STRING })
  descr: string | null;

  @IsNotEmpty()
  @IsString({ message: VALIDATION_MSGS.IMG_IS_STRING })
  img_path: string;

  @IsNotEmpty({ message: VALIDATION_MSGS.STOCK_NOT_EMPTY })
  @IsBoolean({ message: VALIDATION_MSGS.STOCK_IS_BOOL })
  in_stock: boolean;
}
