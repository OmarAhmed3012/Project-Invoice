import express from "express"
import mongoose from "mongoose" 
import { product} from './product'
import {Typegoose,prop,instanceMethod,InstanceType,mapProp, arrayProp, Ref} from "typegoose"

export class address extends Typegoose{
    @prop({required:true})
    company?:String

    @prop()
    addressOne?:String

    @prop()
    addressTwo?:String

    @prop()
    mobile?:Number
}

export class item extends Typegoose{
    @prop({ref:product})
    productSerial?:Ref<product>

    @prop({required:true})
    quantity?:Number
}

class Invoice extends Typegoose{

    @prop({required:true,min:0})
    amount?:Number

    @arrayProp({items:item})
    items?:item[]

    @prop()
    from?:address

    @prop()
    to?:address

    @prop({required:true})
    date?:string


} 
export const invoiceModel = new Invoice().getModelForClass(Invoice)