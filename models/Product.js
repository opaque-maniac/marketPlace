const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  images: [
    {
      type: String,
      required: true,
    },
  ],
  status: {
    type: String,
    enum: ["in stock", "out of stock"],
    default: "in stock",
  },
  dateAdded: {
    type: Date,
    default: Date.now,
  },
  quantity: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    enum: ["electronics", "fashion", "garden", "appliances"],
    required: true,
  },
});

module.exports = mongoose.model("Product", ProductSchema);
