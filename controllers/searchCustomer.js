const Customer = require("../models/Customer");

module.exports = async (req, res) => {
  try {
    const { search } = req.body;
    const customers = await Customer.find({
      $or: [
        { firstName: { $regex: search, $options: "i" } },
        { middleName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ],
    });
    return res.render("searchCustomer", { customers });
  } catch (error) {
    if (error) {
      console.error(`Error occured when querying all customers: ${error}`);
      return res.redirect("/errors/500");
    }
  }
};
