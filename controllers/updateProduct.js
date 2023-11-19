const Product = require("../models/product");

module.exports = async (req, res) => {
  try {
    const product = await Product.findById(parseInt(req.params.id));
    if (!product) {
      return res.redirect("/errors/404");
    }
    res.render("updateProduct", product);
  } catch (error) {
    if (error) {
      console.error(`Error occured when updating product: ${error}`);
      return res.redirect("/errors/500");
    }
  }
};
