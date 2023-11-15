import { SetMetadata } from '@nestjs/common';
import { DECORATOR_CONSTS } from '../consts/common.consts.js';

export const RtPublic = () => SetMetadata(DECORATOR_CONSTS.isRtPublic, true);
