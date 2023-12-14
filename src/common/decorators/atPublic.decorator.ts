import { SetMetadata } from '@nestjs/common';
import { DECORATOR_CONSTS } from '../consts/index';

export const AtPublic = () => SetMetadata(DECORATOR_CONSTS.isAtPublic, true);
