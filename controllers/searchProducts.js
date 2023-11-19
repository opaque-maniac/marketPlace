const Product = require("../models/Product");

module.exports = async (req, res) => {
  try {
    const { search } = req.query;
    const products = await Product.find({
      $or: [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ],
    });
    return res.render("searchResults", {
      products,
    });
  } catch (error) {
    if (error) {
      console.error(`Error occured when trying to get all products: ${error}`);
      return res.redirect("/errors/500");
    }
  }
};
