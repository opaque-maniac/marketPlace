const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: false,
      },
      quantity: {
        type: Number,
        required: false,
      },
    },
  ],
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  deliveryDate: {
    type: Date,
    required: true,
    default: () => {
      Date.now() + 7 * 24 * 60 * 60 * 1000;
    },
  },
  shippingDate: {
    type: Date,
    required: true,
    default: () => {
      Date.now() + 5 * 24 * 60 * 60 * 1000;
    },
  },
});

module.exports = mongoose.model("Order", OrderSchema);
