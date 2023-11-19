const Product = require("../models/Product");
const Cart = require("../models/Cart");

module.exports = async (req, res) => {
  try {
    const { quantity } = req.body;
    const product = await Product.findById(req.params.id).lean();
    if (product.status === "out of stock") {
      return res.redirect("/errors/404");
    }
    if (product) {
      const cart = await Cart.findOne({
        customerId: req.session.userId,
      }).lean();
      cart.products.push({
        productId: product._id,
        quantity: quantity,
      });
      await Cart.findByIdAndUpdate(cart._id, cart);
      return res.redirect("/products/all");
    } else {
      return res.redirect("/errors/404");
    }
  } catch (error) {
    if (error) {
      console.error(`Error occured when adding item to user cart: ${error}`);
      return res.redirect("/errors/500");
    }
  }
};
