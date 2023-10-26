import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { R_SECRET } from '../../common/envconsts/env.consts.js';
import { JwtPayload } from '../../utils/types.js';
import { REFRESH_TOKEN, RT_MALFORMED } from '../consts/auth.constants.js';

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
      secretOrKey: configService.get(R_SECRET),
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
      throw new ForbiddenException(RT_MALFORMED);
    }
    return payload;
  }
}
