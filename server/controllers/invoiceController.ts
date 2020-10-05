import {Request,Response} from "express"
import {invoiceModel,address} from '../model/invoice'
import {productModel,product} from "../model/product"
export class invoiceController {
    public async addInvoice(req:Request,res:Response){
        try {
            const {from,to,cardItems,amount,date}:{from:address,to:address,amount:Number,date:string
                cardItems:{serialNumber:string, quantity:Number}[]}=req.body
            if(from&&to&&cardItems){
            let items = []
            for(let product of cardItems){
                if(product.serialNumber){
                    const p = await productModel.findOne({serialNumber:product.serialNumber})
                    if(p && p.quantity){
                    if(product.quantity < p.quantity){
                        items.push({quantity:product.quantity,productSerial:p})
                    }
                    else 
                        return res.status(400).send(`product ${p.name} not have enoght quanitiy`)    
                    }else{
                        return res.status(400).send('item Cant found')
                    }
                }        
            }
            for(let product of items ){
                await product.productSerial.invoice(Number(product.quantity))
            }
            const invoice =  new invoiceModel({from,to,items,amount,date} as Partial<product>)
            await invoice.save()
            return res.send({invoice})
        }
            return res.status(400).send('loss Data')
            
            
        } catch (error) {
            res.send(error)
        }
     
    }
}