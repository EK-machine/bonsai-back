import { SetMetadata } from '@nestjs/common';
import { isAtPublic } from './consts/decorators.consts.js';

export const AtPublic = () => SetMetadata(isAtPublic, true);
