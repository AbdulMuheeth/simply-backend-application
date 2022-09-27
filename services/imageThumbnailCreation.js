const express = require('express'); 
const router = express.Router(); 
const sharp = require("sharp");     // using the sharp module to perform the resizing and creating the thubmnail
const fs = require('fs')    //
const request = require('request')

const verifyToken = require('./jwtVerifier');

// verifying the route with the verifyToken // the 2 word bearer token need to be passed as the header with key as authorization
// Before performing the operations in the route it first verifies the token and if it is valid then only it performs operations in the route
// else they are rejected
router.get('/', verifyToken, async (req,res)=>{
    
    const unq = Date.now(); // adding the timestamp to make every image to unique from the others

    const resizeImage = async (unq)=>{
        await sharp(`./public/images/image_${unq}.png`) // applying the sharp module function to resize the image to the required resolution
        .resize({
            width: 50,
            height: 50
        }).toFile(`./public/images/newimage_${unq}.png`);   // saving the newly resolutioned image.
        
    }
    
    try {
        
        // 1. downloading the image from the url to the local storage drive
        const download = (url, path, callback) => {
            request.head(url, (err, res, body) => {
                request(url) // creating the request to the image in the url
                .pipe(fs.createWriteStream(path))   // writing the obtained image to the given path
                .on('close', callback)  
            })
        }

        // considering the static image url
        const url = 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=388&q=80'
        // considering the path where the image need to be downloaded
        const path = `./public/images/image_${unq}.JPG`

        
        await download(url, path, () => {
            console.log('image downloaded')

            // after downloading resizing the image
            resizeImage(unq);

            res.send(`<img src="./images/newimage_${unq}.png">`);  // displaying the newly resolutioned image 

        })

    } catch (error) {
        console.log(error);
    }

    
    
});

module.exports = router;