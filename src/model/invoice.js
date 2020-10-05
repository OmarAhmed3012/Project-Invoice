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
exports.invoiceModel = exports.item = exports.address = void 0;
const product_1 = require("./product");
const typegoose_1 = require("typegoose");
class address extends typegoose_1.Typegoose {
}
__decorate([
    typegoose_1.prop({ required: true }),
    __metadata("design:type", String)
], address.prototype, "company", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], address.prototype, "addressOne", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], address.prototype, "addressTwo", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", Number)
], address.prototype, "mobile", void 0);
exports.address = address;
class item extends typegoose_1.Typegoose {
}
__decorate([
    typegoose_1.prop({ ref: product_1.product }),
    __metadata("design:type", Object)
], item.prototype, "productSerial", void 0);
__decorate([
    typegoose_1.prop({ required: true }),
    __metadata("design:type", Number)
], item.prototype, "quantity", void 0);
exports.item = item;
class Invoice extends typegoose_1.Typegoose {
}
__decorate([
    typegoose_1.prop({ required: true, min: 0 }),
    __metadata("design:type", Number)
], Invoice.prototype, "amount", void 0);
__decorate([
    typegoose_1.arrayProp({ items: item }),
    __metadata("design:type", Array)
], Invoice.prototype, "items", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", address)
], Invoice.prototype, "from", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", address)
], Invoice.prototype, "to", void 0);
__decorate([
    typegoose_1.prop({ required: true }),
    __metadata("design:type", String)
], Invoice.prototype, "date", void 0);
exports.invoiceModel = new Invoice().getModelForClass(Invoice);
