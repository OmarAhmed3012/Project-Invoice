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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productModel = exports.product = void 0;
const typegoose_1 = require("typegoose");
class product extends typegoose_1.Typegoose {
    invoice(quantity) {
        return __awaiter(this, void 0, void 0, function* () {
            if (quantity >= 0) {
                const product = this;
                if (product.quantity && product.quantity >= quantity) {
                    product.quantity = product.quantity - quantity;
                    yield product.save();
                    return product;
                }
                else {
                    throw new Error(`stock not have enoght quantity `);
                }
            }
            throw new Error(`can't send negative number `);
        });
    }
    AddQuantity(quantity) {
        return __awaiter(this, void 0, void 0, function* () {
            if (quantity >= 0) {
                const product = this;
                if (product.quantity !== undefined) {
                    product.quantity = product.quantity + quantity;
                    yield product.save();
                    return product;
                }
                else {
                    throw new Error(`server Error`);
                }
            }
            throw new Error(`can't send negative number `);
        });
    }
}
__decorate([
    typegoose_1.prop({
        required: true,
        trim: true
    }),
    __metadata("design:type", String)
], product.prototype, "name", void 0);
__decorate([
    typegoose_1.prop({
        required: true,
        trim: true
    }),
    __metadata("design:type", String)
], product.prototype, "model", void 0);
__decorate([
    typegoose_1.prop({
        required: true
    }),
    __metadata("design:type", Number)
], product.prototype, "price", void 0);
__decorate([
    typegoose_1.prop({
        required: true
    }),
    __metadata("design:type", Number)
], product.prototype, "sellPrice", void 0);
__decorate([
    typegoose_1.prop({
        unique: true,
        required: true,
        trim: true
    }),
    __metadata("design:type", String)
], product.prototype, "serialNumber", void 0);
__decorate([
    typegoose_1.prop({
        default: 0
    }),
    __metadata("design:type", Number)
], product.prototype, "quantity", void 0);
__decorate([
    typegoose_1.instanceMethod,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], product.prototype, "invoice", null);
__decorate([
    typegoose_1.instanceMethod,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], product.prototype, "AddQuantity", null);
exports.product = product;
exports.productModel = new product().getModelForClass(product);
