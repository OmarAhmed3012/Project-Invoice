import {Router} from "express"
import {productController} from "../controllers/productController"
export const productRouter = Router()
const controller = new productController()

productRouter.post('/product',controller.addproduct)
productRouter.post('/quantity',controller.addQuantity)
productRouter.delete('/deleteproduct',controller.DeleteProduct)
