import { SetMetadata } from '@nestjs/common';
import { isRtPublic } from './consts/decorators.consts.js';

export const RtPublic = () => SetMetadata(isRtPublic, true);
