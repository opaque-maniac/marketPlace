const Order = require("../models/Order");

module.exports = async (req, res) => {
  try {
    const allOrders = await Order.find({}).sort({ createdAt: -1 }).lean();
    return res.render("allOrders", {
      allOrders,
    });
  } catch (error) {
    if (error) {
      console.error(
        `Error occured when tyring to query orders for customer:${error}`
      );
      return res.redirect("/errors/500");
    }
  }
};
