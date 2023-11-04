const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customer : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Customer',
        required : true
    },
    products : [
        {
            product : {
                type : mongoose.Schema.Types.ObjectId,
                ref : 'Product',
                required : true
            },
            quantity : {
                type : Number,
                required : true
            }
        }
    ],
    totalAmout : {
        type : Number,
        required : true
    },
    status : {
        type : String,
        enum : ['Pending', 'Shipped', 'Delivered'],
        default : 'Pending'
    },
    dateOrdered : {
        type : Date,
        default : new Date
    }
})