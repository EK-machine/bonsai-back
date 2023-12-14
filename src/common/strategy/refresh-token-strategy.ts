import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import {
  ENV_CONSTS,
  EXCEPTION_MSGS,
  REFRESH_TOKEN,
} from '../../common/consts/index';
import { JwtPayload } from '../../common/types/index';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        RefreshTokenStrategy.extractJwt,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      secretOrKey: configService.get(ENV_CONSTS.R_SECRET),
      passReqToCallback: true,
    });
  }

  private static extractJwt(req: Request): string | null {
    if (
      req.cookies &&
      req.cookies[REFRESH_TOKEN] &&
      req.cookies[REFRESH_TOKEN].length > 0
    ) {
      return req.cookies[REFRESH_TOKEN];
    }
    return null;
  }

  async validate(req: Request, payload: JwtPayload) {
    const refreshToken = req.cookies[REFRESH_TOKEN];
    if (!refreshToken) {
      throw new ForbiddenException(EXCEPTION_MSGS.RT_MALFORMED);
    }
    return payload;
  }
}
