"use strict";
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
exports.productController = void 0;
const product_1 = require("../model/product");
class productController {
    addproduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(456);
            try {
                console.log(req.query);
                console.log(req.body);
                let { name, price, quantity, serialNumber, sellPrice } = req.body;
                if (!quantity) {
                    quantity = 0;
                }
                const product = new product_1.productModel({ name, price, sellPrice, serialNumber, quantity });
                yield product.save();
                res.send(product);
            }
            catch (e) {
                console.log(e.message);
                res.status(400).send({ error: e.message });
            }
        });
    }
    invoice(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id, quantity } = req.body;
                const product = yield product_1.productModel.findOne({ _id });
                if (product) {
                    res.send(yield product.invoice(quantity));
                }
            }
            catch (e) {
                res.status(400).send({ error: e.message });
            }
        });
    }
    addQuantity(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id, quantity } = req.body;
                const product = yield product_1.productModel.findOne({ _id });
                if (product) {
                    res.send(yield product.AddQuantity(quantity));
                }
            }
            catch (e) {
                res.status(400).send({ error: e.message });
            }
        });
    }
    DeleteProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { serialNumber } = req.body;
                console.log("from controller" + serialNumber);
                const product = yield product_1.productModel.findOneAndDelete({ "serialNumber": serialNumber });
                if (product) {
                    res.status(200).send(product);
                }
            }
            catch (e) {
                res.status(400).send({ error: e.message });
            }
        });
    }
}
exports.productController = productController;
