const Staff = require("../models/Staff");

module.exports = async (req, res) => {
  try {
    const allStaff = await Staff.find({}).lean();
    return res.render("allStaff", {
      allStaff,
    });
  } catch (error) {
    if (error) {
      console.error(`Error occured when querying all staff: ${error}`);
      return res.redirect("/errors/500");
    }
  }
};
