const Customer = require("../models/Customer");

module.exports = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    customer.status = false;
    await customer.save();
    res.redirect("/admin/customers/all");
  } catch (error) {
    if (error) {
      console.error(`Error occured when unblocking a customer: ${error}`);
      return res.redirect("/errors/500");
    }
  }
};
