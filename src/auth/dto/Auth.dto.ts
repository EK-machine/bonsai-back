import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { VALIDATION_MSGS } from '../../common/consts/common.consts.js';

export class AuthDto {
  @IsNotEmpty({ message: VALIDATION_MSGS.AUTH_EMAIL_NOT_EMPTY })
  @IsEmail({}, { message: VALIDATION_MSGS.AUTH_EMAIL_IS_NOT_EMAIL })
  @IsString({ message: VALIDATION_MSGS.AUTH_EMAIL_IS_STRING })
  email: string;

  @IsNotEmpty({ message: VALIDATION_MSGS.AUTH_PASS_NOT_EMPTY })
  @IsString({ message: VALIDATION_MSGS.AUTH_PASS_IS_STRING })
  password: string;
}
