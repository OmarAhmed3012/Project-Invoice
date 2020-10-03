import express from "express"
import "./db/connection"
import path from 'path'
import {productRouter} from'./routers/productRouter'
import expressLayouts from 'express-ejs-layouts'
import {productModel} from './model/product'

const app = express();
app.use(express.json())
const port = process.env.PORT || 3000;
app.use(expressLayouts)
app.set('view engine', 'ejs');
app.use(productRouter)

app.set('views',path.join(__dirname,'../views'))

const options = ['1', '2', '3'];

app.get('', (req, res) => {
    res.render('index.ejs', {options: options});
});

app.get('/admin', async(req, res) => {
    const products = await productModel.find({})
    console.log(products);
    
    res.render('admin',{products});
})
app.get('/addinvoice', async(req, res) => {
    const products = await productModel.find({})
    res.render('addinvoice',{products});
})

app.get('/show',(req,res)=>{
    console.log(req.query.company);
    res.render('show',{
        company:req.query.company,
        contragent: req.query.contragent,
        amount : req.query.amount,
        data:req.query.data
    })
})

app.get('/stock',async(req,res)=>{
    
    const products = await productModel.find({})
    res.render('stock',{products}) 
})

app.listen(port,()=>{
    console.log('server running');
    
})