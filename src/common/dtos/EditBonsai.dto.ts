import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { VALIDATION_MSGS } from '../../common/consts/index';

export class EditBonsaiDto {
  @IsOptional()
  @IsString({ message: VALIDATION_MSGS.BONSAI_NAME_IS_STRING })
  name: string;

  @IsOptional()
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: VALIDATION_MSGS.PRICE_CONSTRAINTS },
  )
  @Max(999.99, { message: VALIDATION_MSGS.MAX_PRICE })
  @Min(0.01, { message: VALIDATION_MSGS.MIN_PRICE })
  price: number;

  @IsOptional()
  @IsString({ message: VALIDATION_MSGS.BONSAI_DESCR_IS_STRING })
  descr: string | null;

  @IsOptional()
  @IsString({ message: VALIDATION_MSGS.IMG_IS_STRING })
  img_path_1: string | null;

  @IsOptional()
  @IsString({ message: VALIDATION_MSGS.IMG_IS_STRING })
  img_path_2: string | null;

  @IsOptional()
  @IsString({ message: VALIDATION_MSGS.IMG_IS_STRING })
  img_path_3: string | null;

  @IsOptional()
  @IsString({ message: VALIDATION_MSGS.BONSAI_CATEGORY_IS_STRING })
  category: string;

  @IsOptional()
  @IsString({ message: VALIDATION_MSGS.BONSAI_LEVEL_IS_STRING })
  level: string;

  @IsOptional()
  @IsBoolean({ message: VALIDATION_MSGS.STOCK_IS_BOOL })
  in_stock: boolean;
}
