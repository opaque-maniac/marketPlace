const express = require("express");
const multer = require("multer");

const app = express();

const port = process.env.PORT || 3000;

const storage = require("./utils/storage");
const upload = multer({ storage: storage() });

app.set("view engine", "ejs");
app.use(express.static("public"));

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
