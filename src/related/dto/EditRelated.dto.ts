import { IsBoolean, IsOptional } from 'class-validator';

export class EditRelatedDto {
  @IsOptional()
  @IsBoolean()
  show_instrument: boolean;

  @IsOptional()
  @IsBoolean()
  show_pot: boolean;

  @IsOptional()
  @IsBoolean()
  show_soil: boolean;
}
