import { IsOptional, IsString } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  name: string;

  @IsString()
  text: string | null;

  @IsOptional()
  @IsString()
  img_path: string | null;
}
