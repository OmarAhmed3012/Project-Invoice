require('dotenv').config();
let url: string= String(process.env.MONGODBURL)
import mongoose from "mongoose"
mongoose.connect(url,{useNewUrlParser:true,useFindAndModify:false,useCreateIndex:true,useUnifiedTopology:true})
