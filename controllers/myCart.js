const Cart = require("../models/Cart");

module.exports = async (req, res) => {
  try {
    const cart = await Cart.find({ customerId: req.session.userId }).lean();
    return res.render("myCart", {
      cart,
    });
  } catch (error) {
    if (error) {
      console.error(`Error occured when trying to get all products: ${error}`);
      return res.redirect("/errors/500");
    }
  }
};
