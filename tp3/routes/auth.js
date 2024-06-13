const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt= require('bcryptjs')
const User= require('../user')
const router = express.Router()



router.post('/register',async(req,res)=>{
    try{
const{username, password}=req.body;
const user= new User({username,password})
await user.save()
res.status(201).send('user registred')
    }catch(error){
res.status(400).send(error.message)
    }
})


//login
router.post('/login',async (req,res)=>{
  try{
    const {username,password}=req.body;
    const user= await User.findOne({username: username});
    if(!user){
       res.status(404).send('user not found')
    }

    const isPasswordMatch= await bcrypt.compare(password, user.password)
        if(!isPasswordMatch){
            return res.status(404).send('user not found')
        }
    const token = jwt.sign({id:user._id},"nodejsexpress")
    res.send({token:token})
  }catch(error) {
    res.status(400).send(error.message)
  }
})

module.exports=router