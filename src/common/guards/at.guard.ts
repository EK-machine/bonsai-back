import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { DECORATOR_CONSTS } from '../consts/index';

@Injectable()
export class AtGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublicWithoutAt = this.reflector.getAllAndOverride(
      DECORATOR_CONSTS.isAtPublic,
      [context.getHandler(), context.getClass()],
    );
    if (isPublicWithoutAt) {
      return true;
    }
    return super.canActivate(context);
  }
}
