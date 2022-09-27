const mongoose = require('mongoose'); 

//declaring the the mongoose Schema with the necessary fields
const addressSchema = new mongoose.Schema({
    username:{type:String},
    address:{type:String}
})

// createing model using the above specified mongoose schema
const Address = mongoose.model('address',addressSchema);

module.exports = Address;