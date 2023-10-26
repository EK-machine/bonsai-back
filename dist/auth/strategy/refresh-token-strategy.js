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
var RefreshTokenStrategy_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenStrategy = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
const env_consts_js_1 = require("../../common/envconsts/env.consts.js");
const auth_constants_js_1 = require("../consts/auth.constants.js");
let RefreshTokenStrategy = exports.RefreshTokenStrategy = RefreshTokenStrategy_1 = class RefreshTokenStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'jwt-refresh') {
    constructor(configService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromExtractors([
                RefreshTokenStrategy_1.extractJwt,
                passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ]),
            secretOrKey: configService.get(env_consts_js_1.R_SECRET),
            passReqToCallback: true,
        });
        this.configService = configService;
    }
    static extractJwt(req) {
        if (req.cookies &&
            req.cookies[auth_constants_js_1.REFRESH_TOKEN] &&
            req.cookies[auth_constants_js_1.REFRESH_TOKEN].length > 0) {
            return req.cookies[auth_constants_js_1.REFRESH_TOKEN];
        }
        return null;
    }
    async validate(req, payload) {
        const refreshToken = req.cookies[auth_constants_js_1.REFRESH_TOKEN];
        if (!refreshToken) {
            throw new common_1.ForbiddenException(auth_constants_js_1.RT_MALFORMED);
        }
        return payload;
    }
};
exports.RefreshTokenStrategy = RefreshTokenStrategy = RefreshTokenStrategy_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], RefreshTokenStrategy);
//# sourceMappingURL=refresh-token-strategy.js.map