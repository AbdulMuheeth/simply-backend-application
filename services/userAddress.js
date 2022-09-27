const express = require('express')
const router = express.Router()

const Address = require("../models/address")

const verifyToken = require('./jwtVerifier');

// verifying the route with the verifyToken // the 2 word bearer token need to be passed as the header with key as authorization
// Before performing the operations in the route it first verifies the token and if it is valid then only it performs operations in the route
// else they are rejected
router.post('/',verifyToken, async (req,res)=>{
    
    // consider the address Object to store it in the DB
    const address = new Address({
        username:req.body.username,
        address:req.body.address
    })

    await address.save();   // saving the address
    console.log(address);  
    res.send("Successfully added user address");
    
})

module.exports = router;