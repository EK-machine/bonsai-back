import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import {
  FileSystemStoredFile,
  HasMimeType,
  IsFile,
  MaxFileSize,
} from 'nestjs-form-data';
import { MAX_FILE_SIZE, VALIDATION_MSGS } from '../../common/consts/index';

export class EditInstrumentBodyDto {
  @IsOptional()
  @IsString({ message: VALIDATION_MSGS.INSTRUMENT_NAME_IS_STRING })
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
  @IsString({ message: VALIDATION_MSGS.INSTRUMENT_DESCR_IS_STRING })
  descr: string | null;

  @IsOptional()
  @IsFile({ message: VALIDATION_MSGS.IMG_IS_NOT_A_FILE })
  @MaxFileSize(MAX_FILE_SIZE, { message: VALIDATION_MSGS.IMG_SIZE })
  @HasMimeType(['image/jpeg', 'image/jpg', 'image/png'], {
    message: VALIDATION_MSGS.IMG_EXT_NOT_CORRECT,
  })
  img_path_1: FileSystemStoredFile;

  @IsOptional()
  @IsBoolean({ message: VALIDATION_MSGS.STOCK_IS_BOOL })
  in_stock: boolean;
}
