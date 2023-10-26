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
exports.BonsaiController = void 0;
const common_1 = require("@nestjs/common");
const bonsai_service_js_1 = require("./bonsai.service.js");
const bonsai_constants_js_1 = require("./consts/bonsai.constants.js");
const CreateBonsai_dto_js_1 = require("./dto/CreateBonsai.dto.js");
let BonsaiController = exports.BonsaiController = class BonsaiController {
    constructor(bonsaiService) {
        this.bonsaiService = bonsaiService;
    }
    async getAll() {
        const allBonsai = await this.bonsaiService.getAll();
        if (!allBonsai) {
            throw new common_1.NotFoundException(bonsai_constants_js_1.BONSAI_NOT_FOUND);
        }
        return allBonsai;
    }
    async createBonsai(createBonsaiDto) {
        this.bonsaiService.createBonsai(createBonsaiDto);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BonsaiController.prototype, "getAll", null);
__decorate([
    (0, common_1.Post)(''),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateBonsai_dto_js_1.CreateBonsaiDto]),
    __metadata("design:returntype", Promise)
], BonsaiController.prototype, "createBonsai", null);
exports.BonsaiController = BonsaiController = __decorate([
    (0, common_1.Controller)('bonsai'),
    __metadata("design:paramtypes", [bonsai_service_js_1.BonsaiService])
], BonsaiController);
//# sourceMappingURL=bonsai.controller.js.map