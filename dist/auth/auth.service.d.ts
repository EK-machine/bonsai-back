import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { RT, User } from '../typeorm/entities/index.js';
import { Tokens } from '../utils/types.js';
import { AuthDto } from './dto/Auth.dto.js';
export declare class AuthService {
    private readonly userRepository;
    private readonly rtRepository;
    private readonly configService;
    private jwtService;
    constructor(userRepository: Repository<User>, rtRepository: Repository<RT>, configService: ConfigService, jwtService: JwtService);
    register(dto: AuthDto): Promise<{
        message: string;
    }>;
    login(dto: AuthDto): Promise<Tokens>;
    logout(email: string): Promise<void>;
    refresh(email: string, refreshToken: string): Promise<Tokens>;
    verifyRT(cookie: string): Promise<any>;
    findUser(condition: any): Promise<User>;
    findRT(condition: any): Promise<RT>;
    hashDada(data: string): Promise<string>;
    updateRtHash(email: string, rt: string): Promise<void>;
    getTokens(email: string): Promise<Tokens>;
}
