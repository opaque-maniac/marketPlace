const mongoose = require('mongoose');

const shippingSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true
      },
      city: {
        type: String,
        required: true
      },
      state: {
        type: String,
        required: true
      },
      postalCode: {
        type: String,
        required: true
      },
      country: {
        type: String,
        required: true
      }
});

const Shipping = mongoose.model('Shipping', shippingSchema);
module.exports = Shipping;