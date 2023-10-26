"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const bcrypt = require("bcrypt");
const typeorm_2 = require("typeorm");
const env_consts_js_1 = require("../common/envconsts/env.consts.js");
const index_js_1 = require("../typeorm/entities/index.js");
const auth_constants_js_1 = require("./consts/auth.constants.js");
let AuthService = exports.AuthService = class AuthService {
    constructor(userRepository, rtRepository, configService, jwtService) {
        this.userRepository = userRepository;
        this.rtRepository = rtRepository;
        this.configService = configService;
        this.jwtService = jwtService;
    }
    async register(dto) {
        const oldUser = await this.findUser({
            where: { email: dto.email },
        });
        if (oldUser) {
            throw new common_1.ForbiddenException(auth_constants_js_1.USER_EXISTS);
        }
        const hashedPassword = await this.hashDada(dto.password);
        const newUser = await this.userRepository.save({
            ...dto,
            password: hashedPassword,
        });
        const userIsSaved = newUser && Object.entries(newUser).length > 0;
        if (!userIsSaved) {
            throw new common_1.ForbiddenException(auth_constants_js_1.SOMETHING_WENT_WRONG);
        }
        return { message: auth_constants_js_1.SUCCESS };
    }
    async login(dto) {
        const user = await this.findUser({
            where: { email: dto.email },
        });
        if (!user) {
            throw new common_1.ForbiddenException(auth_constants_js_1.INVALID_CREDENTIALS);
        }
        const passwordMatches = await bcrypt.compare(dto.password, user.password);
        if (!passwordMatches) {
            throw new common_1.ForbiddenException(auth_constants_js_1.INVALID_CREDENTIALS);
        }
        const tokens = await this.getTokens(user.email);
        return tokens;
    }
    async logout(email) {
        const oldRt = await this.findRT({
            where: { email },
        });
        if (!oldRt) {
            throw new common_1.ForbiddenException(auth_constants_js_1.SOMETHING_WENT_WRONG);
        }
        await this.rtRepository.delete({ email });
    }
    async refresh(email, refreshToken) {
        const oldUser = await this.findRT({
            where: { email },
        });
        if (!oldUser || !oldUser.rt) {
            throw new common_1.ForbiddenException(auth_constants_js_1.SOMETHING_WENT_WRONG);
        }
        const rtMatches = await bcrypt.compare(refreshToken, oldUser.rt);
        if (!rtMatches) {
            throw new common_1.ForbiddenException(auth_constants_js_1.SOMETHING_WENT_WRONG);
        }
        const tokens = await this.getTokens(oldUser.email);
        return tokens;
    }
    async verifyRT(cookie) {
        const data = await this.jwtService.verifyAsync(cookie, {
            secret: this.configService.get(env_consts_js_1.R_SECRET),
        });
        return data;
    }
    async findUser(condition) {
        return this.userRepository.findOne(condition);
    }
    async findRT(condition) {
        return this.rtRepository.findOne(condition);
    }
    hashDada(data) {
        return bcrypt.hash(data, 10);
    }
    async updateRtHash(email, rt) {
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
    async getTokens(email) {
        const jwtPayload = {
            email: email,
        };
        const [at, rt] = await Promise.all([
            this.jwtService.signAsync(jwtPayload, {
                secret: this.configService.get(env_consts_js_1.A_SECRET),
                expiresIn: 60 * 15,
            }),
            this.jwtService.signAsync(jwtPayload, {
                secret: this.configService.get(env_consts_js_1.R_SECRET),
                expiresIn: 60 * 60 * 24 * 7,
            }),
        ]);
        this.updateRtHash(email, rt);
        return {
            access_token: at,
            refresh_token: rt,
        };
    }
};
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(index_js_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(index_js_1.RT)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        config_1.ConfigService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map