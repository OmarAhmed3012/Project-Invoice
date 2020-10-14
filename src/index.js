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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("./db/connection");
const path_1 = __importDefault(require("path"));
const productRouter_1 = require("./routers/productRouter");
const invoiceRouter_1 = require("./routers/invoiceRouter");
const express_ejs_layouts_1 = __importDefault(require("express-ejs-layouts"));
const product_1 = require("./model/product");
const invoice_1 = require("./model/invoice");
const app = express_1.default();
app.use(express_1.default.json());
const port = process.env.PORT || 3000;
app.use(express_ejs_layouts_1.default);
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
app.set('view engine', 'ejs');
app.use(productRouter_1.productRouter);
app.use(invoiceRouter_1.invoiceRouter);
app.set('views', path_1.default.join(__dirname, '../views'));
app.get('', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const invoices = yield invoice_1.invoiceModel.find({});
    res.render('index.ejs', { invoices });
}));
app.get('/admin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield product_1.productModel.find({}).sort({ name: 1 });
    console.log(products);
    res.render('admin', { products });
}));
app.get('/addinvoice', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield product_1.productModel.find({}).sort({ name: 1 });
    res.render('addinvoice', { products });
}));
app.get('/editinvoice', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _id = req.query._id;
    try {
        const invoice = yield invoice_1.invoiceModel.findById({ _id }).populate('items').exec();
        if (!invoice)
            return res.send('<h1>404 Page Not found</h1>');
        const products = yield product_1.productModel.find({}).sort({ name: 1 });
        res.render('editinvoice', { products, invoice });
    }
    catch (e) {
        console.log(e.message);
        return res.send('<h1>404 Page Not found</h1>');
    }
}));
app.get('/show', (req, res) => {
    console.log(req.query.company);
    res.render('show', {
        _id: req.query._id,
        company: req.query.company,
        contragent: req.query.contragent,
        amount: req.query.amount,
        data: req.query.data
    });
});
app.get('/stock', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield product_1.productModel.find({}).sort({ name: 1 });
    res.render('stock', { products });
}));
app.listen(port, () => {
    console.log('server running');
});
