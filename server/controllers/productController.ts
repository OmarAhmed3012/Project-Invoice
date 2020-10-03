import {Request,Response} from "express"
import {productModel} from '../model/product'
export class productController {
    public async addproduct(req:Request,res:Response){
        console.log(456);
        
        try{
            console.log(req.query);
            console.log(req.body);
            let {name,price,quantity,serialNumber,sellPrice} :{name:string,price:number,quantity:number,serialNumber:string,sellPrice:number} = req.body
            if(!quantity){
                quantity = 0
            }
            const product = new productModel({name,price,sellPrice,serialNumber,quantity})
            await product.save()
            res.send(product)
        }
        catch(e){
            console.log(e.message);
            res.status(400).send({error:e.message})
        }
    }

    public async invoice (req:Request,res:Response){
        
        try{
            const {_id,quantity}:{_id:string,quantity:number} = req.body
            const product = await productModel.findOne({_id})
            if(product){
                res.send(await product.invoice(quantity))
            }
        }catch(e){
            res.status(400).send({error:e.message})
        }
    }

    public async addQuantity(req:Request,res:Response){
        try{
            const {_id,quantity}:{_id:string,quantity:number} = req.body
            const product = await productModel.findOne({_id})
            if(product){
                res.send(await product.AddQuantity(quantity))
            }
        }catch(e){
            res.status(400).send({error:e.message})
        }
    }

    public async DeleteProduct(req:Request,res:Response){
        try{
            const {serialNumber}:{serialNumber:string} = req.body
            console.log("from controller"+serialNumber);
            const product = await productModel.findOneAndDelete({ "serialNumber": serialNumber })
            if(product){
                res.status(200).send(product)
            }
        }catch(e){
            res.status(400).send({error:e.message})
        }
    }
}