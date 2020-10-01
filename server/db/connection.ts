import mongoose from "mongoose"
mongoose.connect('mongodb://127.0.0.1:27017/Invoices',{useNewUrlParser:true,useFindAndModify:false,useCreateIndex:true,useUnifiedTopology:true})
