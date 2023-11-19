const Customer = require("../models/Customer");

module.exports = async (req, res) => {
  try {
    const customer = await Customer.findById(parseInt(req.params.id));
    if (customer) {
      customer.status = true;
    }
    await customer.save();
    return res.redirect("admin/customers/all");
  } catch (error) {
    if (error) {
      console.error(`Error occured when blocking a customer: ${error}`);
      return res.redirect("/errors/500");
    }
  }
};
