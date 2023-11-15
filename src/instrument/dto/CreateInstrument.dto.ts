import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { VALIDATION_MSGS } from '../../common/consts/common.consts.js';

export class CreateInstrumentDto {
  @IsNotEmpty({ message: VALIDATION_MSGS.INSTRUMENT_NAME_NOT_EMPTY })
  @IsString({ message: VALIDATION_MSGS.INSTRUMENT_NAME_IS_STRING })
  name: string;

  @IsNotEmpty({ message: VALIDATION_MSGS.PRICE_NOT_EMPTY })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Max(999.99, { message: VALIDATION_MSGS.MAX_PRICE })
  @Min(0.01, { message: VALIDATION_MSGS.MIN_PRICE })
  price: number;

  @IsOptional()
  @IsString({ message: VALIDATION_MSGS.INSTRUMENT_DESCR_IS_STRING })
  descr: string | null;

  @IsNotEmpty({ message: VALIDATION_MSGS.IMG_NOT_EMPTY })
  @IsString({ message: VALIDATION_MSGS.IMG_IS_STRING })
  img_path: string;

  @IsOptional()
  @IsBoolean({ message: VALIDATION_MSGS.STOCK_IS_BOOL })
  in_stock: boolean;
}
