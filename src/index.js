const express = require('express');
const path = require('path');
const expressLayout =  require('express-ejs-layouts');

const app = express();

const port = process.env.PORT || 3000;

app.use(expressLayout);
app.set('view engine', 'ejs');


// console.log(publicDirectoryPath);

// app.use(express.static(path.join(__dirname, '/views')));
app.set('views',path.join(__dirname,'../views'))

const options = ['1', '2', '3'];

app.get('', (req, res) => {
    res.render('index.ejs', {options: options});
});

app.get('/admin', (req, res) => {
    res.render('admin');
})

app.get('/addinvoice', (req, res) => {
    res.render('addinvoice');
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

app.listen(port, () => {
    console.log('server running');
});