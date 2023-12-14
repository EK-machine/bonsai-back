import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { DECORATOR_CONSTS, REFRESH_TOKEN } from '../consts/index';

@Injectable()
export class RtGuard extends AuthGuard('jwt-refresh') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublicWithoutRt = this.reflector.getAllAndOverride(
      DECORATOR_CONSTS.isRtPublic,
      [context.getHandler(), context.getClass()],
    );
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
