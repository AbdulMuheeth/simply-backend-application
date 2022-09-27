const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
const ejs = require("ejs")
var path = require('path')

const app = express()
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'))
app.use('/uploads', express.static(__dirname + '/uploads'))
app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs');
require('dotenv').config()

// Routers 
const authenticationRouter = require('./services/authentication')
const patchRouter = require('./services/jsonPatch') ;
const imageThumbnailRouter = require('./services/imageThumbnailCreation');
const addressRouter = require('./services/userAddress') ;

// Specifying the path for which specific Router need to be accessed
app.use('/login',authenticationRouter);
app.use('/patchData',patchRouter);
app.use('/createThumbnail',imageThumbnailRouter);
app.use('/addAddress',addressRouter);

// Connecting the node server with mongoDB database using the Mongoose
mongoose.connect(process.env.MONGO_URI,
    { useNewUrlParser: true, useUnifiedTopology: true },( err) => {
        if(err)
            console.log(err);
        console.log('connected to db')
    }
)

// Route for the home path '/'
app.get('/',(req,res)=>{
    res.setHeader('Content-type','text/html');
    res.send(`<h1>Hey!!</h1>`);   
})

// making server listen at the port 5000
app.listen(5000,()=>{
    console.log("Server has started");
})

// using postman to check the result and adding the header and request object for the application