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
exports.invoiceController = void 0;
const invoice_1 = require("../model/invoice");
const product_1 = require("../model/product");
class invoiceController {
    addInvoice(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { from, to, cardItems, amount, date } = req.body;
                if (from && to && cardItems) {
                    let items = [];
                    for (let product of cardItems) {
                        if (product.serialNumber) {
                            const p = yield product_1.productModel.findOne({ serialNumber: product.serialNumber });
                            if (p && p.quantity) {
                                if (product.quantity < p.quantity) {
                                    items.push({ quantity: product.quantity, productSerial: p });
                                }
                                else
                                    return res.status(400).send(`product ${p.name} not have enoght quanitiy`);
                            }
                            else {
                                return res.status(400).send('item Cant found');
                            }
                        }
                    }
                    for (let product of items) {
                        yield product.productSerial.invoice(Number(product.quantity));
                    }
                    const invoice = new invoice_1.invoiceModel({ from, to, items, amount, date });
                    yield invoice.save();
                    return res.send({ invoice });
                }
                return res.status(400).send('loss Data');
            }
            catch (error) {
                res.send(error);
            }
        });
    }
    deleteInvoive(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const _id = req.body;
            try {
                const invoice = yield invoice_1.invoiceModel.findByIdAndDelete(_id);
                if (invoice) {
                    return res.send({ message: 'invoice Deleted' });
                }
                else {
                    return res.status(400).send({ error: 'invoice cant found' });
                }
            }
            catch (error) {
                return res.status(400).send({ error: error.message });
            }
        });
    }
}
exports.invoiceController = invoiceController;
