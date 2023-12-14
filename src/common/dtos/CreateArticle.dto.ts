import { IsNotEmpty, IsString } from 'class-validator';
import { VALIDATION_MSGS } from '../../common/consts/index';

export class CreateArticleDto {
  @IsNotEmpty({ message: VALIDATION_MSGS.ARTICLE_NAME_NOT_EMPTY })
  @IsString({ message: VALIDATION_MSGS.ARTICLE_NAME_IS_STRING })
  name: string;

  @IsNotEmpty({ message: VALIDATION_MSGS.ARTICLE_TEXT_NOT_EMPTY })
  @IsString({ message: VALIDATION_MSGS.ARTICLE_TEXT_IS_STRING })
  text: string | null;

  @IsNotEmpty({ message: VALIDATION_MSGS.IMG_NOT_EMPTY })
  @IsString({ message: VALIDATION_MSGS.IMG_IS_STRING })
  img_path_1: string;
}
