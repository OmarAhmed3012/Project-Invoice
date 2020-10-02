import {Router} from "express"
import {productController} from "../controllers/productController"
export const productRouter = Router()
const controller = new productController()

productRouter.post('/product',controller.addproduct)
productRouter.post('/quantity',controller.addQuantity)
productRouter.post('/invoice',controller.invoice)
productRouter.post('/deleteproduct',controller.DeleteProduct)
