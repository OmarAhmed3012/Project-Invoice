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
const express_ejs_layouts_1 = __importDefault(require("express-ejs-layouts"));
const product_1 = require("./model/product");
const app = express_1.default();
app.use(express_1.default.json());
const port = process.env.PORT || 3000;
app.use(express_ejs_layouts_1.default);
app.set('view engine', 'ejs');
app.use(productRouter_1.productRouter);
app.set('views', path_1.default.join(__dirname, '../views'));
const options = ['1', '2', '3'];
app.get('', (req, res) => {
    res.render('index.ejs', { options: options });
});
app.get('/admin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield product_1.productModel.find({});
    console.log(products);
    res.render('admin', { products });
}));
app.get('/addinvoice', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield product_1.productModel.find({});
    res.render('addinvoice', { products });
}));
app.get('/show', (req, res) => {
    console.log(req.query.company);
    res.render('show', {
        company: req.query.company,
        contragent: req.query.contragent,
        amount: req.query.amount,
        data: req.query.data
    });
});
app.get('/stock', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield product_1.productModel.find({});
    res.render('stock', { products });
}));
app.listen(port, () => {
    console.log('server running');
});
