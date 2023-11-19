const Customer = require("../models/Customer");
const Cart = require("../models/Cart");

module.exports = async (req, res) => {
  try {
    const { firstName, lastName, email, password, location } = req.body;
    const customer = await Customer.create({
      firstName,
      lastName,
      email,
      password,
      location: () => {
        if (location === "1") {
          return "nairobi";
        } else {
          return "outside nairobi";
        }
      },
    });
    if (customer) {
      req.session.userId = customer._id;
      const cart = await Cart.create({
        customerId: customer._id,
      });
      return res.redirect("/products/all");
    } else {
      return res.redirect("/register");
    }
  } catch (error) {
    if (error) {
      console.error(`Error occured when trying to get all products: ${error}`);
      return res.redirect("/errors/500");
    }
  }
};
