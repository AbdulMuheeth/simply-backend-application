const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()

// making the login post route
router.post('/',(req,res)=>{

    // simply considering the static one field as the existing valid user to login
    const user = {
        username:"muheeth",
        password:"pass"
    }

    // signing in the above document using jwt
    const accesstoken = jwt.sign(user,process.env.SECRET_KEY);

    res.send(accesstoken);
})


module.exports =  router;