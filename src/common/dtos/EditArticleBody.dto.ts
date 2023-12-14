import { IsOptional, IsString } from 'class-validator';
import {
  FileSystemStoredFile,
  HasMimeType,
  IsFile,
  MaxFileSize,
} from 'nestjs-form-data';
import { MAX_FILE_SIZE, VALIDATION_MSGS } from '../../common/consts/index';

export class EditArticleBodyDto {
  @IsOptional()
  @IsString({ message: VALIDATION_MSGS.ARTICLE_NAME_IS_STRING })
  name: string;

  @IsOptional()
  @IsString({ message: VALIDATION_MSGS.ARTICLE_TEXT_IS_STRING })
  text: string | null;

  @IsOptional()
  @IsFile({ message: VALIDATION_MSGS.IMG_IS_NOT_A_FILE })
  @MaxFileSize(MAX_FILE_SIZE, { message: VALIDATION_MSGS.IMG_SIZE })
  @HasMimeType(['image/jpeg', 'image/jpg', 'image/png'], {
    message: VALIDATION_MSGS.IMG_EXT_NOT_CORRECT,
  })
  img_path_1: FileSystemStoredFile;
}
