"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RtPublic = void 0;
const common_1 = require("@nestjs/common");
const decorators_consts_js_1 = require("./consts/decorators.consts.js");
const RtPublic = () => (0, common_1.SetMetadata)(decorators_consts_js_1.isRtPublic, true);
exports.RtPublic = RtPublic;
//# sourceMappingURL=rtPublic.decorator.js.map