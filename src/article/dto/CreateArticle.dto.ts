import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { VALIDATION_MSGS } from '../../common/consts/common.consts.js';

export class CreateArticleDto {
  @IsNotEmpty({ message: VALIDATION_MSGS.ARTICLE_NAME_NOT_EMPTY })
  @IsString({ message: VALIDATION_MSGS.ARTICLE_NAME_IS_STRING })
  name: string;

  @IsNotEmpty({ message: VALIDATION_MSGS.ARTICLE_TEXT_NOT_EMPTY })
  @IsString({ message: VALIDATION_MSGS.ARTICLE_TEXT_IS_STRING })
  text: string | null;

  @IsOptional()
  @IsString({ message: VALIDATION_MSGS.IMG_IS_STRING })
  img_path: string | null;
}
