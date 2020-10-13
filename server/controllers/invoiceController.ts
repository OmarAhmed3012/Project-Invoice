import {Request,Response} from "express"
import {invoiceModel,address, item} from '../model/invoice'
import {productModel,product} from "../model/product"
export class invoiceController {
    public async addInvoice(req:Request,res:Response){
        try {
            const {from,to,cardItems,amount,date,invoiceNumber}:{from:address,to:address,amount:Number,date:string,invoiceNumber:Number
                cardItems:{serialNumber:string, quantity:Number}[]}=req.body
            if(from&&to&&cardItems){
            let items = []
            for(let product of cardItems){
                if(product.serialNumber){
                    const p = await productModel.findOne({serialNumber:product.serialNumber})
                    if(p && p.quantity){
                    if(product.quantity <= p.quantity){
                        items.push({quantity:product.quantity,productSerial:p})
                    }
                    else 
                        return res.status(400).json({error:`product ${p.name} not have enoght quanitiy`})    
                    }else{
                        return res.status(400).json({error:'item Cant found'})
                    }
                }        
            }
            for(let product of items ){
                await product.productSerial.invoice(Number(product.quantity))
            }
            const invoice =  new invoiceModel({from,to,items,amount,date,invoiceNumber} as Partial<product>)
            await invoice.save()
            return res.send({invoice})
        }
            return res.status(400).json({error:'loss Data'})
            
            
        } catch (error) {
            res.status(400).json({error:'address is required'})
        }
     
    }

    public async deleteInvoive(req:Request,res:Response){
        const _id = req.body
        try {
            const invoice =await invoiceModel.findByIdAndDelete(_id)
            if(invoice){
                if(invoice.items){
                    for(let item of invoice.items){
                        let product = await productModel.findById({_id:item.productSerial})
                        if(product)
                            await product.AddQuantity(Number(item.quantity))
                    }
                }
                return res.send({message:'invoice Deleted'})
            }else{
                return res.status(400).send({error:'invoice cant found'})
            }
        } catch (error) {
            return res.status(400).send({error:error.message})
        }
    }

    public async editInvoice (req:Request,res:Response){
        const {_id,cardItems,amount}:{_id:string,amount:Number,cardItems:{serialNumber:string, quantity:Number}[]}=req.body
        try {
            if(_id&&cardItems){
                let invoice = await invoiceModel.findById({_id}).populate('items').exec()
                if(!invoice){
                    console.log(0);
                    return res.status(400).json({error:'invoice not found ,it have been deleted'})
                }
                let items = []
                for(let product of cardItems){
                    if(product.serialNumber){
                        console.log(1);
                        const p = await productModel.findOne({serialNumber:product.serialNumber})
                        console.log(p);
                        if(p && p.quantity!== undefined){
                            console.log(2);
                            let productOutOfStock =0
                            if(invoice.items){
                                const index =invoice.items.findIndex(e=>String(e.productSerial)===String(p._id))
                                if(index !== -1)
                                    productOutOfStock =Number (invoice.items[index].quantity)
                                console.log(3);
                            }
                            console.log('add',Number(p.quantity+productOutOfStock));
                            console.log('invoice',product.quantity);
                            
                        if(product.quantity <= Number(p.quantity+productOutOfStock)){
                            items.push({quantity:product.quantity,productSerial:p})
                        }
                        else 
                            return res.status(400).json({error:`product ${p.name} not have enoght quanitiy`})    
                        }else{
                            return res.status(400).json({error:'item Cant found'})
                        }
                    }        
                }
                if(invoice.items){
                    for(let item of invoice.items){
                        let product = await productModel.findById({_id:item.productSerial})
                        if(product)
                            await product.AddQuantity(Number(item.quantity))
                    }
                }
                for(let item of items ){
                    const product = await productModel.findById({_id:item.productSerial._id})
                    if(product)
                        await product.invoice(Number(item.quantity))
                }
                invoice = await invoiceModel.findByIdAndUpdate({_id},{items,amount} as Partial<product>)
                if(invoice){
                    invoice.save()
                    return res.json({invoice})
                }
                
                res.status(400).json({error:'server Error'})

            }
            
        } catch (error) {
            res.status(400).json({error:error.message})
        }
    }

}