"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AtPublic = void 0;
const common_1 = require("@nestjs/common");
const decorators_consts_js_1 = require("./consts/decorators.consts.js");
const AtPublic = () => (0, common_1.SetMetadata)(decorators_consts_js_1.isAtPublic, true);
exports.AtPublic = AtPublic;
//# sourceMappingURL=atPublic.decorator.js.map