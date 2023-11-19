const Product = require("../models/Product");
const mutler = require("multer");

const upload = mutler({ dest: "public/uploads" });

module.exports = async (req, res) => {
  try {
    const { name, description, price, quantity } = req.body;
    const images = req.files.map((file) => {
      return file.filename;
    });
    const product = await Product.findByIdAndUpdate({
      name,
      description,
      price,
      quantity,
    });
    if (product) {
      return res.redirect(`/products/${product._id}`);
    } else {
      return res.redirect("/errors/500");
    }
  } catch (error) {
    if (error) {
      console.error(`Error occured when updating product:${error}`);
      return res.redirect("/errors/500");
    }
  }
};
