import { SetMetadata } from '@nestjs/common';
import { DECORATOR_CONSTS } from '../consts/common.consts.js';

export const AtPublic = () => SetMetadata(DECORATOR_CONSTS.isAtPublic, true);
