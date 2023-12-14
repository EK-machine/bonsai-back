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
import { EXCEPTION_MSGS, REFRESH_TOKEN } from '../common/consts/index';
import {
  AtPublic,
  GetCurrenUser,
  GetRefreshToken,
  RtPublic,
} from '../common/decorators/index';
import { AuthDto } from '../common/dtos/index';
import { AtGuard, RtGuard } from '../common/guards/index';
import { AuthService } from './auth.service.js';

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
      throw new UnauthorizedException(EXCEPTION_MSGS.SOMETHING_WENT_WRONG);
    }
    const tokens = await this.authService.refresh(userEmail, refreshToken);
    response.cookie(REFRESH_TOKEN, tokens.refresh_token, { httpOnly: true });
    return tokens.access_token;
  }
}
