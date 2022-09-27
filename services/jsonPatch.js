const express = require('express');
const router = express.Router();

// using the fast-json-patch module for applying the operation using operation object to the json object 
const applyOperation = require('fast-json-patch').applyOperation; 

const verifyToken = require('./jwtVerifier');

// verifying the route with the verifyToken // the 2 word bearer token need to be passed as the header with key as authorization
// Before performing the operations in the route it first verifies the token and if it is valid then only it performs operations in the route
// else they are rejected
router.post('/',verifyToken, async (req,res)=>{
    // console.log(req.body);
    let jsonObj = req.body[0];  // json object to which operations need to be applied
    // console.log(jsonObj)
    let patchObj = req.body[1];     // operation object which on contains only single operation
    let resultantObj = applyOperation(jsonObj,patchObj);   // applying the jsonoperation to the json object 

    res.send(resultantObj.newDocument); // displaying the result 
})

module.exports = router