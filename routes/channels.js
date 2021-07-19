const express=require('express');
var router = express.Router();
var Channel = require('../models/channel');
router.use(express.json());

router.get('/channels',(req,res)=>{
    Channel.find({},'tags _id channelname description') 
    .then(channel=>{
        res.json({channel})
    }).catch(err=>{console.log(err);})
});

router.post('/create_channel',(req,res)=>{
    const {channelname,description,tags}=req.body;
    if(!channelname || !description ||!tags ){
        return res.status(422).json({error:"Please add all fields"});
    } 
    
    const channel=new Channel({
        channelname,description,tags
    })
    channel.save() 
    .then(result=>{
        res.json("Success")
    }).catch(err=>{console.log(err);})
});


module.exports=router; 