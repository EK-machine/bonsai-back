import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AtPublic } from '../common/decorators/atPublic.decorator.js';
import { GetCurrenUser } from '../common/decorators/get-current-user.decorator.js';
import { GetRefreshToken } from '../common/decorators/get-rt.decorator.js';
import { RtPublic } from '../common/decorators/rtPublic.decorator.js';
import { AtGuard } from '../common/guards/at.guard.js';
import { RtGuard } from '../common/guards/rt.guard.js';
import { AuthService } from './auth.service.js';
import {
  REFRESH_TOKEN,
  SOMETHING_WENT_WRONG,
} from './consts/auth.constants.js';
import { AuthDto } from './dto/Auth.dto.js';

@Controller('auth')
@UseGuards(AtGuard, RtGuard)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @AtPublic()
  @RtPublic()
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() dto: AuthDto): Promise<{ message: string }> {
    return await this.authService.register(dto);
  }

  @AtPublic()
  @RtPublic()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() dto: AuthDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<string> {
    const tokens = await this.authService.login(dto);
    response.cookie(REFRESH_TOKEN, tokens.refresh_token, { httpOnly: true });
    return tokens.access_token;
  }

  @AtPublic()
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(
    @GetCurrenUser('email') userEmail: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    response.clearCookie(REFRESH_TOKEN);
    return this.authService.logout(userEmail);
  }

  @AtPublic()
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(
    @GetRefreshToken() refreshToken: string,
    @GetCurrenUser('email') userEmail: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    const data = await this.authService.verifyRT(refreshToken);
    if (!data) {
      throw new UnauthorizedException(SOMETHING_WENT_WRONG);
    }
    const tokens = await this.authService.refresh(userEmail, refreshToken);
    response.cookie(REFRESH_TOKEN, tokens.refresh_token, { httpOnly: true });
    return tokens.access_token;
  }
}
