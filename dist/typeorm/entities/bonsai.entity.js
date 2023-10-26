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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bonsai = void 0;
const typeorm_1 = require("typeorm");
let Bonsai = exports.Bonsai = class Bonsai {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Bonsai.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'бонсай' }),
    __metadata("design:type", String)
], Bonsai.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0.0 }),
    __metadata("design:type", Number)
], Bonsai.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Bonsai.prototype, "descr", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Bonsai.prototype, "img_path_1", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Bonsai.prototype, "img_path_2", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Bonsai.prototype, "img_path_3", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'хвойные' }),
    __metadata("design:type", String)
], Bonsai.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: 'новичок' }),
    __metadata("design:type", String)
], Bonsai.prototype, "level", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Bonsai.prototype, "in_stock", void 0);
exports.Bonsai = Bonsai = __decorate([
    (0, typeorm_1.Entity)({ name: 'bonsai' })
], Bonsai);
//# sourceMappingURL=bonsai.entity.js.map