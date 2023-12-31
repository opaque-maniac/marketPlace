const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
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
      dateAdded: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

module.exports = mongoose.model("Cart", CartSchema);
