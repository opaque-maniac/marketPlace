const Product = require("../models/Product");

module.exports = async (req, res) => {
  try {
    const electronics = await Product.find({ category: "electronics" }).lean();
    const fashion = await Product.find({ category: "fashion" }).lean();
    const garden = await Product.find({ category: "garden" }).lean();
    const appliances = await Product.find({ category: "appliances" }).lean();
    if (electronics || fashion || garden || appliances) {
      return res.render("category", {
        electronics,
        fashion,
        garden,
        appliances,
      });
    } else {
      return res.redirect("/errors/500");
    }
  } catch (error) {
    if (error) {
      console.error(`Error occured when lookng up categories:${error}`);
      return res.redirect("/errors/500");
    }
  }
};
