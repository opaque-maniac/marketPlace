const Customer = require("../models/Customer");
const Staff = require("../models/Staff");
const bcrypt = require("bcrypt");

module.exports = async (req, res) => {
  try {
    const { email, password } = req.body;
    const customer = await Customer.findOne({ email: email }).lean();
    const staff = await Staff.findOne({ email: email }).lean();
    if (customer || staff) {
      if (customer) {
        const isMatch = await bcrypt.compare(password, customer.password);
        if (isMatch) {
          req.session.userId = customer._id;
          return res.redirect("/products/all");
        } else {
          return res.redirect("/login");
        }
      } else {
        const isMatch = await bcrypt.compare(password, staff.password);
        if (isMatch) {
          req.session.userId = staff._id;
          return res.redirect("/products/all");
        } else {
          return res.redirect("/login");
        }
      }
    } else {
      return res.redirect("/login");
    }
  } catch (error) {
    if (error) {
      console.error(`Error occured when trying to get all products: ${error}`);
      return res.redirect("/errors/500");
    }
  }
};
