import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import {
  ENV_CONSTS,
  EXCEPTION_MSGS,
  SUCCESS,
} from '../common/consts/common.consts.js';
import { RT, User } from '../typeorm/entities/index.js';
import { JwtPayload, Tokens } from '../utils/types.js';
import { AuthDto } from './dto/Auth.dto.js';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(RT) private readonly rtRepository: Repository<RT>,
    private readonly configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async register(dto: AuthDto): Promise<{ message: string }> {
    const oldUser = await this.findUser({
      where: { email: dto.email },
    });

    if (oldUser) {
      throw new ForbiddenException(EXCEPTION_MSGS.USER_EXISTS);
    }

    const hashedPassword = await this.hashDada(dto.password);
    const newUser = await this.userRepository.save({
      ...dto,
      password: hashedPassword,
    });

    const userIsSaved = newUser && Object.entries(newUser).length > 0;

    if (!userIsSaved) {
      throw new ForbiddenException(EXCEPTION_MSGS.SOMETHING_WENT_WRONG);
    }

    return { message: SUCCESS };
  }

  async login(dto: AuthDto): Promise<Tokens> {
    const user = await this.findUser({
      where: { email: dto.email },
    });
    if (!user) {
      throw new ForbiddenException(EXCEPTION_MSGS.INVALID_CREDENTIALS);
    }
    const passwordMatches = await bcrypt.compare(dto.password, user.password);
    if (!passwordMatches) {
      throw new ForbiddenException(EXCEPTION_MSGS.INVALID_CREDENTIALS);
    }
    const tokens = await this.getTokens(user.email);
    return tokens;
  }

  async logout(email: string) {
    const oldRt = await this.findRT({
      where: { email },
    });
    if (!oldRt) {
      throw new ForbiddenException(EXCEPTION_MSGS.SOMETHING_WENT_WRONG);
    }
    await this.rtRepository.delete({ email });
  }

  async refresh(email: string, refreshToken: string) {
    const oldUser = await this.findRT({
      where: { email },
    });
    if (!oldUser || !oldUser.rt) {
      throw new ForbiddenException(EXCEPTION_MSGS.SOMETHING_WENT_WRONG);
    }
    const rtMatches = await bcrypt.compare(refreshToken, oldUser.rt);
    if (!rtMatches) {
      throw new ForbiddenException(EXCEPTION_MSGS.SOMETHING_WENT_WRONG);
    }
    const tokens = await this.getTokens(oldUser.email);
    return tokens;
  }

  async verifyRT(cookie: string) {
    const data = await this.jwtService.verifyAsync(cookie, {
      secret: this.configService.get(ENV_CONSTS.R_SECRET),
    });
    return data;
  }

  async findUser(condition: any): Promise<User> {
    return this.userRepository.findOne(condition);
  }

  async findRT(condition: any): Promise<RT> {
    return this.rtRepository.findOne(condition);
  }

  hashDada(data: string): Promise<string> {
    return bcrypt.hash(data, 10);
  }

  async updateRtHash(email: string, rt: string): Promise<void> {
    const oldRt = await this.findRT({
      where: { email },
    });
    const hashedRt = await this.hashDada(rt);
    if (!oldRt) {
      this.rtRepository.save({
        email,
        rt: hashedRt,
      });
    }
    if (oldRt) {
      this.rtRepository.save({ ...oldRt, rt: hashedRt });
    }
  }

  async getTokens(email: string): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      email: email,
    };

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.configService.get(ENV_CONSTS.A_SECRET),
        expiresIn: 60 * 15,
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.configService.get(ENV_CONSTS.R_SECRET),
        expiresIn: 60 * 60 * 24 * 7,
      }),
    ]);
    this.updateRtHash(email, rt);
    return {
      access_token: at,
      refresh_token: rt,
    };
  }
}
