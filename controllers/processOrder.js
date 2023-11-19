const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Customer = require("../models/Customer");

module.exports = async (req, res) => {
  try {
    const customer = await Customer.findById(parseInt(req.session.userId));
    const cart = await Cart.findOne({ customerId: req.session.userId });
    const products = cart.products;
    products.map(async (product) => {
      if (product.quantity === 0) {
        await products.splice(products.indexOf(product), 1);
      }
    });
    if (customer.location === "nairobi") {
      let order = await Order.create({
        customerId: req.session.userId,
        products: products,
        shippingDate: Date.now() + 1 * 24 * 60 * 60 * 1000,
      });
    } else {
      let order = await Order.create({
        customerId: req.session.userId,
        products: products,
      });
    }
    if (order) {
      await Cart.findByIdAndUpdate(cart._id, {
        products: [],
      });
      return res.redirect("/products/all");
    } else {
      return res.redirect("/myCart");
    }
  } catch (error) {
    if (error) {
      console.error(`Error occured when trying to get all products: ${error}`);
      return res.redirect("/errors/500");
    }
  }
};
