const express=require('express');
const cors = require("cors");
const mongoose=require('mongoose');

const http=require('http');
const port=5000;
const app=express();
app.use(express.json()); 
app.use(cors());
const MONGOURI="mongodb+srv://vishal:vishal@cluster0.ebsf0.mongodb.net/DB?retryWrites=true&w=majority"
const router=require('./routes/auth');
const channelrouter=require('./routes/channels');
const postrouter=require('./routes/posts');

const User =require('./models/user');
const Channel =require('./models/channel');
const Post =require('./models/post');

mongoose.connect(MONGOURI,{
    useNewUrlParser: true,
    useUnifiedTopology: true 
})
mongoose.connection.on('connected',()=>{
    console.log("db connected")
})
mongoose.connection.on('error',(err)=>{
    console.log("err connecting",err)
})

app.use('/',router);
app.use('/',channelrouter);
app.use('/',postrouter);

app.listen(port,()=>{
    console.log("server running at port ",port)
})
