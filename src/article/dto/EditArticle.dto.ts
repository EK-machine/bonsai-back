import { IsOptional, IsString } from 'class-validator';

export class EditArticleDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  text: string | null;

  @IsOptional()
  @IsString()
  img_path: string;
}
