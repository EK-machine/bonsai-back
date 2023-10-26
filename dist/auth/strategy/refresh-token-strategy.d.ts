import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { Strategy } from 'passport-jwt';
import { JwtPayload } from '../../utils/types.js';
declare const RefreshTokenStrategy_base: new (...args: any[]) => Strategy;
export declare class RefreshTokenStrategy extends RefreshTokenStrategy_base {
    private readonly configService;
    constructor(configService: ConfigService);
    private static extractJwt;
    validate(req: Request, payload: JwtPayload): Promise<JwtPayload>;
}
export {};
