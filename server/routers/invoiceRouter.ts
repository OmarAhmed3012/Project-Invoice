import {Router,Request,Response} from 'express'
import { invoiceController } from '../controllers/invoiceController'
export const invoiceRouter = Router()
const controllers = new invoiceController()
invoiceRouter.post('/invoiceee',controllers.addInvoice)
invoiceRouter.delete('/invoice',controllers.deleteInvoive) 
invoiceRouter.patch('/invoice',controllers.editInvoice) 
