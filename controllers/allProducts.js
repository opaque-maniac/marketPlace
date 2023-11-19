const Product = require("../models/Product");

module.exports = async (req, res) => {
  const itemsPerPage = 20;
  const page = parseInt(req.query.page) || 1;

  try {
    const totalProducts = await Product.countDocuments({});
    const totalPages = Math.ceil(totalProducts / itemsPerPage);

    const products = await Product.find({})
      .skip((page - 1) * itemsPerPage)
      .limit(itemsPerPage)
      .lean();
    return res.render("allProducts", {
      products,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    if (error) {
      console.error(`Error occured when trying to get all products: ${error}`);
      return res.redirect("/errors/500");
    }
  }
};
