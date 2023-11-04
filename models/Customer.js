// importing necessary modules for this application
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

/*
    Defining the mongoose schema for customer
    Ensuring to add validation to necessary fields
*/
const customerSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    profileImage : {
        type : String,
        required : false
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    phoneNumber : {
        type : String,
        required: true
    },
    address : String,
    password : {
        type : String,
        required : true
    },
    order : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Order',
        required : true
    },
    shipping : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Shipping',
    }
});

// hashing the user password before saving the password in the database
customerSchema.pre('save', (next) => {
    const user = this;

    bcrypt.hash(user.password, 10, (hash, error) => {
        user.password = hash;   // replace password with hash after hashing the password 10 times
        if (error) console.error(error);
    });
    next();
});

// model and export the user schema
const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;