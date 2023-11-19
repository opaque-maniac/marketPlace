const Order = require("../models/Order");

module.exports = async (req, res) => {
  try {
    let shippingToday = [];
    const today = Date.now();
    const orders = await Order.find({}).lean();
    orders.forEach((order) => {
      if (today === order.shippingDate) {
        shippingToday.push(order);
      }
    });
    return res.render("shippingToday", {
      shippingToday,
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
