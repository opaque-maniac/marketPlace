export const checkForFiles = (req, res, next) => {
  if (req.files.length < 1) {
    return res.status(400).json({
      message: "Please upload at least one file",
    });
  }
  next();
};
