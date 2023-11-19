const Customer = require("../models/Customer");

module.exports = async (req, res, next) => {
  const customer = await Customer.findById(parseInt(req.params.id));
  if (customer) {
    if (customer.status === false) {
      next();
    } else {
      // blocked user to see the page
      return res.redirect("/errors/403");
    }
  } else {
    return res.redirect("/errors/404");
  }
};
