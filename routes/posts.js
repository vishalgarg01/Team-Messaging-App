const express=require('express');
var router = express.Router();
var Post = require('../models/post');

router.use(express.json());
router.get('/posts/:channelId',(req,res)=>{
    Post.find({channelId:req.params.channelId})
    .then(posts=>{
        res.json({posts})
    }).catch(err=>{console.log(err);}) 
})
router.post('/createPost',(req,res)=>{
    const {data,username,channelId} =req.body;
    console.log(data) 
    const post =new Post({
        post:data,channelId,postedBy:username
    })
    post.save()
    .then((result)=>{
        res.json({message:"saved successfully"});
    })
    .catch(err=>{console.log(err)})
    
})
module.exports=router; 