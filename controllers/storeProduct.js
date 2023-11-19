const Product = require("../models/Product");
const multer = require("multer");
const Staff = require("../models/Staff");

const upload = multer({ dest: "public/uploads/" });

module.exports = async (req, res) => {
  try {
    const { name, description, price, quantity } = req.body;
    const images = req.files.map((file) => {
      return file.filename;
    });
    const product = await Product.create({
      name,
      description,
      price,
      images,
      quantity,
    });
    if (product) {
      return res.redirect("/products/all");
    } else {
      return res.redirect("/errors/500");
    }
  } catch (error) {
    if (error) {
      console.error(`Error occured when trying to get all products: ${error}`);
      return res.redirect("/errors/500");
    }
  }
};
