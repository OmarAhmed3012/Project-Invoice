import express from "express"
import mongoose from "mongoose" 
import {Typegoose,prop,instanceMethod,InstanceType} from "typegoose"

class product extends Typegoose{
    @prop({
        required:true,
        trim:true
    })
    name?:string 

    @prop({
        required:true
    })
    price?:number

    @prop({
        required:true,
        trim:true
    })
    serialNumber?:string

    @prop({
        default:0
    })
    quantity?:number

    @instanceMethod
    async invoice(this:InstanceType<product>,quantity:number){
        if(quantity>0){
            const product = this
            if(product.quantity && product.quantity>= quantity){
                product.quantity = product.quantity - quantity
                await product.save()
                return product ;
            }else{
                throw new Error(`stock not have enoght quantity `)
            }
        }
        throw new Error(`can't send negative number `)
    }

    @instanceMethod
    async AddQuantity(this:InstanceType<product>,quantity:number){
        if(quantity>0){
            const product = this
            if(product.quantity){
                product.quantity = product.quantity + quantity
                await product.save()
                return product ;
            }else{
                throw new Error(`server Error`)
            }
        }
        throw new Error(`can't send negative number `)
    }
} 
export const productModel = new product().getModelForClass(product)