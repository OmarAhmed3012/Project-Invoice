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
                                if (product.quantity <= p.quantity) {
                                    items.push({ quantity: product.quantity, productSerial: p });
                                }
                                else
                                    return res.status(400).json({ error: `product ${p.name} not have enoght quanitiy` });
                            }
                            else {
                                return res.status(400).json({ error: 'item Cant found' });
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
                return res.status(400).json({ error: 'loss Data' });
            }
            catch (error) {
                res.status(400).json({ error: 'address is required' });
            }
        });
    }
    deleteInvoive(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const _id = req.body;
            try {
                const invoice = yield invoice_1.invoiceModel.findByIdAndDelete(_id);
                if (invoice) {
                    if (invoice.items) {
                        for (let item of invoice.items) {
                            let product = yield product_1.productModel.findById({ _id: item.productSerial });
                            if (product)
                                yield product.AddQuantity(Number(item.quantity));
                        }
                    }
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
    editInvoice(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { _id, cardItems, amount } = req.body;
            try {
                if (_id && cardItems) {
                    let invoice = yield invoice_1.invoiceModel.findById({ _id }).populate('items').exec();
                    if (!invoice) {
                        console.log(0);
                        return res.status(400).json({ error: 'invoice not found ,it have been deleted' });
                    }
                    let items = [];
                    for (let product of cardItems) {
                        if (product.serialNumber) {
                            console.log(1);
                            const p = yield product_1.productModel.findOne({ serialNumber: product.serialNumber });
                            console.log(p);
                            if (p && p.quantity !== undefined) {
                                console.log(2);
                                let productOutOfStock = 0;
                                if (invoice.items) {
                                    const index = invoice.items.findIndex(e => String(e.productSerial) === String(p._id));
                                    if (index !== -1)
                                        productOutOfStock = Number(invoice.items[index].quantity);
                                    console.log(3);
                                }
                                console.log('add', Number(p.quantity + productOutOfStock));
                                console.log('invoice', product.quantity);
                                if (product.quantity <= Number(p.quantity + productOutOfStock)) {
                                    items.push({ quantity: product.quantity, productSerial: p });
                                }
                                else
                                    return res.status(400).json({ error: `product ${p.name} not have enoght quanitiy` });
                            }
                            else {
                                return res.status(400).json({ error: 'item Cant found' });
                            }
                        }
                    }
                    if (invoice.items) {
                        for (let item of invoice.items) {
                            let product = yield product_1.productModel.findById({ _id: item.productSerial });
                            if (product)
                                yield product.AddQuantity(Number(item.quantity));
                        }
                    }
                    for (let item of items) {
                        const product = yield product_1.productModel.findById({ _id: item.productSerial._id });
                        if (product)
                            yield product.invoice(Number(item.quantity));
                    }
                    invoice = yield invoice_1.invoiceModel.findByIdAndUpdate({ _id }, { items, amount });
                    if (invoice) {
                        invoice.save();
                        return res.json({ invoice });
                    }
                    res.status(400).json({ error: 'server Error' });
                }
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
}
exports.invoiceController = invoiceController;
