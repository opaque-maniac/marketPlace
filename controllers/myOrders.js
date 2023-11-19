const Order = require("../models/Order");

module.exports = async (req, res) => {
  try {
    const orders = await Order.find({ customerId: req.session.userId }, null, {
      sort: { createdAt: -1 },
    });
    return res.render("myOrders", {
      orders,
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
