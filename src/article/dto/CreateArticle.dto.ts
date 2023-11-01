import { IsOptional, IsString } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  text: string | null;

  @IsOptional()
  @IsString()
  img_path: string;
}
