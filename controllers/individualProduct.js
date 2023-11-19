const Product = require("../models/Product");

module.exports = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).lean();
    if (product) {
      return res.render("individualProduct", {
        product,
      });
    } else {
      return res.redirect("/errors/404");
    }
  } catch (error) {
    if (error) {
      console.error(`Error occured when trying to get all products: ${error}`);
      return res.redirect("/errors/500");
    }
  }
};
