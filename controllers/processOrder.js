const Order = require("../models/Order");
const Cart = require("../models/Cart");

module.exports = async (req, res) => {
  try {
    const cart = await Cart.findOne({ customerId: req.session.userId });
    const products = cart.products;
    const order = await Order.create({
      customerId: req.session.userId,
      products: products,
    });
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
