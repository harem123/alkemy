const v1ControlEmail = require('../controllers/nodemailer.js')
const db = require("../../models/index.js");
const userModel = db.user;


const express = require('express')
const app = express()
const port = 3000

const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
//const dotenv = require('dotenv');
// TODO add try catch
const registerUser = async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    var usr = {
        user_name : req.body.user_name,
        email : req.body.email,
        password : await bcrypt.hash(req.body.password, salt)
      };
      created_user = await userModel.create(usr);
      const mailInfo = {
        from: 'atomsasfreelance@gmail.com',
        to: usr.email,
        subject: 'welcome to goalab',
        text: 'you are registered to goalab' 
    };
    
        v1ControlEmail.sendEmail(mailInfo)
      res.status(201).json({insertionId: created_user.id});
}

const login = async(req,res)=>{
  const user = await userModel.findOne({ where : {email : req.body.email }});
  if(user){
     const password_valid = await bcrypt.compare(req.body.password,user.password);
     if(password_valid){
         token = jwt.sign({ "id" : user.id,"email" : user.email },'my_secret_token');
         res.status(200).json({ token : token});
     } else {
       res.status(400).json({ error : "Password or user Incorrect" });
     }
   
   }else{
     res.status(400).json({ error :  "Password or user Incorrect"});
   }
   
   };

   const protectedSection = (req,res) =>{
    jwt.verify(req.token, 'my_secret_token', (err,data) => {
        if(err) {
            res.sendStatus(403)
        } else {
            res.json({
                text:'welcome to protected area',
                data
            })
        }
    })
}

   function ensureToken (req,res,next) {
    const bearHeader = req.headers["authorization"]
    console.log(bearHeader)
    if (typeof bearHeader != 'undefined') {
        const bearer = bearHeader.split(" ")
        const bearerToken = bearer[1]
        req.token = bearerToken
        next()

    } else  { res.sendStatus(403)}
}


module.exports = {
    registerUser,
    login,
    ensureToken,
    protectedSection
  }


