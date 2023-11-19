const Staff = require("../models/Staff");

module.exports = async (req, res, next) => {
  const staff = await Staff.findById(req.session.userId);
  if (staff) {
    next();
  } else {
    res.redirect("/login");
  }
};
