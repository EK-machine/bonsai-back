import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  Validate,
} from 'class-validator';
import { VALIDATION_MSGS } from '../../common/consts/common.consts.js';
import { ShapeValidation } from '../custom-validators/shape-validator.custom.js';

export class EditPotDto {
  @IsOptional()
  @IsString({ message: VALIDATION_MSGS.POT_NAME_IS_STRING })
  name: string;

  @IsOptional()
  @IsString({ message: VALIDATION_MSGS.POT_SIZE_IS_STRING })
  size: string;

  @IsOptional()
  @IsString({ message: VALIDATION_MSGS.POT_SHAPE_IS_STRING })
  @Validate(ShapeValidation, {
    message: VALIDATION_MSGS.POT_SHAPE_IS_NOT_CORRECT,
  })
  shape: string;

  @IsOptional()
  @IsString({ message: VALIDATION_MSGS.POT_COLOR_IS_STRING })
  color: string;

  @IsOptional()
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

  @IsOptional()
  @IsString({ message: VALIDATION_MSGS.IMG_IS_STRING })
  img_path: string;

  @IsOptional()
  @IsBoolean({ message: VALIDATION_MSGS.STOCK_IS_BOOL })
  in_stock: boolean;
}
