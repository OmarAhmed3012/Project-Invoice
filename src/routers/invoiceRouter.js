"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invoiceRouter = void 0;
const express_1 = require("express");
const invoiceController_1 = require("../controllers/invoiceController");
exports.invoiceRouter = express_1.Router();
const controllers = new invoiceController_1.invoiceController();
exports.invoiceRouter.post('/invoiceee', controllers.addInvoice);
