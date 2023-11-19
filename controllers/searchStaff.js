const Staff = require("../models/Staff");

module.exports = async (req, res) => {
  try {
    const { search } = req.body;
    const staff = await Staff.find({
      $or: [
        { firstName: { $regex: search, $options: "i" } },
        { middleName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ],
    });
  } catch (error) {
    if (error) {
      console.error(`Error occured when searching for staff:${error}`);
      return res.redirect("/errors/500");
    }
  }
};
