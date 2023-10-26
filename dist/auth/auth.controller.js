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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const atPublic_decorator_js_1 = require("../common/decorators/atPublic.decorator.js");
const get_current_user_decorator_js_1 = require("../common/decorators/get-current-user.decorator.js");
const get_rt_decorator_js_1 = require("../common/decorators/get-rt.decorator.js");
const rtPublic_decorator_js_1 = require("../common/decorators/rtPublic.decorator.js");
const at_guard_js_1 = require("../common/guards/at.guard.js");
const rt_guard_js_1 = require("../common/guards/rt.guard.js");
const auth_service_js_1 = require("./auth.service.js");
const auth_constants_js_1 = require("./consts/auth.constants.js");
const Auth_dto_js_1 = require("./dto/Auth.dto.js");
let AuthController = exports.AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async register(dto) {
        return await this.authService.register(dto);
    }
    async login(dto, response) {
        const tokens = await this.authService.login(dto);
        response.cookie(auth_constants_js_1.REFRESH_TOKEN, tokens.refresh_token, { httpOnly: true });
        return tokens.access_token;
    }
    async logout(userEmail, response) {
        response.clearCookie(auth_constants_js_1.REFRESH_TOKEN);
        return this.authService.logout(userEmail);
    }
    async refresh(refreshToken, userEmail, response) {
        const data = await this.authService.verifyRT(refreshToken);
        if (!data) {
            throw new common_1.UnauthorizedException(auth_constants_js_1.SOMETHING_WENT_WRONG);
        }
        const tokens = await this.authService.refresh(userEmail, refreshToken);
        response.cookie(auth_constants_js_1.REFRESH_TOKEN, tokens.refresh_token, { httpOnly: true });
        return tokens.access_token;
    }
};
__decorate([
    (0, atPublic_decorator_js_1.AtPublic)(),
    (0, rtPublic_decorator_js_1.RtPublic)(),
    (0, common_1.Post)('register'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Auth_dto_js_1.AuthDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, atPublic_decorator_js_1.AtPublic)(),
    (0, rtPublic_decorator_js_1.RtPublic)(),
    (0, common_1.Post)('login'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Auth_dto_js_1.AuthDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, atPublic_decorator_js_1.AtPublic)(),
    (0, common_1.Post)('logout'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, get_current_user_decorator_js_1.GetCurrenUser)('email')),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, atPublic_decorator_js_1.AtPublic)(),
    (0, common_1.Post)('refresh'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, get_rt_decorator_js_1.GetRefreshToken)()),
    __param(1, (0, get_current_user_decorator_js_1.GetCurrenUser)('email')),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refresh", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    (0, common_1.UseGuards)(at_guard_js_1.AtGuard, rt_guard_js_1.RtGuard),
    __metadata("design:paramtypes", [auth_service_js_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map