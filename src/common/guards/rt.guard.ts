import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { REFRESH_TOKEN } from '../../auth/consts/auth.constants.js';
import { isRtPublic } from '../decorators/consts/decorators.consts.js';

@Injectable()
export class RtGuard extends AuthGuard('jwt-refresh') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublicWithoutRt = this.reflector.getAllAndOverride(isRtPublic, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublicWithoutRt) {
      return true;
    }
    const request: Request = context.switchToHttp().getRequest();
    const isRtInCookies =
      request.cookies[REFRESH_TOKEN] &&
      request.cookies[REFRESH_TOKEN].length > 0;
    if (!isRtInCookies) {
      return false;
    }
    return super.canActivate(context);
  }
}
