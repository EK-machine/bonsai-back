import { Response } from 'express';
import { AuthService } from './auth.service.js';
import { AuthDto } from './dto/Auth.dto.js';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(dto: AuthDto): Promise<{
        message: string;
    }>;
    login(dto: AuthDto, response: Response): Promise<string>;
    logout(userEmail: string, response: Response): Promise<void>;
    refresh(refreshToken: string, userEmail: string, response: Response): Promise<string>;
}
