"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetRefreshToken = void 0;
const common_1 = require("@nestjs/common");
const auth_constants_js_1 = require("../../auth/consts/auth.constants.js");
exports.GetRefreshToken = (0, common_1.createParamDecorator)((_data, context) => {
    const request = context.switchToHttp().getRequest();
    return request.cookies[auth_constants_js_1.REFRESH_TOKEN];
});
//# sourceMappingURL=get-rt.decorator.js.map