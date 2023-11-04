const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name : {
        type : String,
        requried : true
    },
    description : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    category : {type : String, required : true},
    images : [
        {
            type : String,
            required : true
        }
    ],
    SKU : {
        type : Number,
        default : new Number,
        required : true
    },
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Customer',
        required : true
    }
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;