const path = require("path");

module.exports = () => {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, "../public/images/")); // Using path.join to ensure a correct path
    },
    filename: (req, file, cb) => {
      const fileName = `${Date.now()}${path.extname(file.originalname)}`;
      cb(null, fileName);
    },
  });
};
