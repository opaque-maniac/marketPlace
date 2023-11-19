const Customer = require("../models/Customer");

module.exports = async (req, res) => {
  try {
    const allCustomers = await Customer.find({}).lean();
    return res.render("allCustomers", {
      allCustomers,
    });
  } catch (error) {
    if (error) {
      console.error(`Error occured when querying all customers: ${error}`);
      return res.redirect("/errors/500");
    }
  }
};
