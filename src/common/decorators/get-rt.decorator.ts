import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { REFRESH_TOKEN } from '../../auth/consts/auth.constants.js';

export const GetRefreshToken = createParamDecorator(
  (_data: string, context: ExecutionContext) => {
    const request: Request = context.switchToHttp().getRequest();
    return request.cookies[REFRESH_TOKEN];
  },
);
