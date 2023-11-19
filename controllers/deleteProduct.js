const Product = require("../models/Product");

module.exports = async (req, res) => {
  try {
    await Product.findByIdAndDelete(parseInt(req.params.id));
    return res.redirect("/products/all");
  } catch (error) {
    if (error) {
      console.error(`Error occured when deleting a product:${error}`);
      return res.redirect("/errors/500");
    }
  }
};
