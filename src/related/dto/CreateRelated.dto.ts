import { IsBoolean, IsNotEmpty } from 'class-validator';

export class CreateRelatedDto {
  @IsNotEmpty()
  @IsBoolean()
  show_instrument: boolean;

  @IsNotEmpty()
  @IsBoolean()
  show_pot: boolean;

  @IsNotEmpty()
  @IsBoolean()
  show_soil: boolean;
}
