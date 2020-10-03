require('dotenv').config();
let url: any = process.env.MONGODBURL
import mongoose from "mongoose"
mongoose.connect(url,{useNewUrlParser:true,useFindAndModify:false,useCreateIndex:true,useUnifiedTopology:true})
