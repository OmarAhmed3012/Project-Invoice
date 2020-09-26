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


app.listen(port, () => {
    console.log('server running');
});