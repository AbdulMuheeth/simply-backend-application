const jwt = require('jsonwebtoken')

// verifying the token each time 
function verifyToken(req,res,next){
    
    // getting the authorization header to access the JWT token which is second part of the string
    const bearerHeader = req.headers['authorization'];
    const bearerToken = bearerHeader && bearerHeader.split(' ')[1];
    // if no authorization header is found or token is not present
    if (bearerToken == null) return res.status(401).send("Unauthorized, Please Login");
    
    // verifying the token with the secret key used for the creating token to get the original object
    jwt.verify(bearerToken,process.env.SECRET_KEY,(err,user)=>{
        if(err){
            res.status(403).send("Some Error occurred while logging in, Please Try Again!!");
        }
        req.user = user;
        next();
    })

}

module.exports = verifyToken