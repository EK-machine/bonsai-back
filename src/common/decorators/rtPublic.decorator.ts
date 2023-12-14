import { SetMetadata } from '@nestjs/common';
import { DECORATOR_CONSTS } from '../consts/index';

export const RtPublic = () => SetMetadata(DECORATOR_CONSTS.isRtPublic, true);
