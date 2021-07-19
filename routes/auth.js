const express=require('express');
var router = express.Router();
const jwt=require('jsonwebtoken');
var jwt_secret = "my secret";
const mongoose=require('mongoose');
var User = require('../models/user');

router.use(express.json());

router.post('/signin', (req, res) => 
{
    const {email, password}=req.body
    if(!email || !password ){
        return res.status(422).json({error:"please add all the fields"})
    }
    User.findOne({email:email})
    .then(saveduser=>{
        if(!saveduser){
            return res.status(422).json({error:"invalid email or password"});
        }
        else{
            if(saveduser.password == password){
                const token = jwt.sign({_id:saveduser._id},jwt_secret)
                const {_id,username,email,region} = saveduser
                res.json({token,user:{_id,username,email,region}})
            }
            else{
                return res.status(422).json({error:"invalid password"});
            }
        }
    }).catch(err=>{console.log(err)})
});


router.post('/signup',(req,res)=>{
    const {username,email,password,region}=req.body
    if(!email || !password || !username){
        return res.status(422).json({error:"please add all the fields"})
    }
    User.findOne({email:email})
    .then((saveduser)=>{
        if(saveduser){
            return  res.status(422).json({error:"User already exist"});
        }
        else{
            const user =new User({
                email,password,username,region
            })
            user.save()
            .then((user)=>{
                res.json({message:"saved successfully"});
            })
            .catch(err=>{console.log(err)})
        }
    }) .catch(err=>{console.log(err)})
});
module.exports=router;
