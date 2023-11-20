const express = require("express");
const multer = require("multer");
const expressSession = require("express-session");

const app = express();

const port = process.env.PORT || 3000;

const storage = require("./utils/storage");
const upload = multer({ storage: storage() });

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(
  expressSession({
    secret: "keyboard cat",
  })
);

const error404 = require("./controllers/error404");
const error403 = require("./controllers/error403");
const error500 = require("./controllers/error500");
const index = require("./controllers/index");
const login = require("./controllers/login");
const register = require("./controllers/register");
const logout = require("./controllers/logout");
const addToCart = require("./controllers/addToCart");
const allCustomers = require("./controllers/allCustomers");
const allOrders = require("./controllers/allOrders");
const allProducts = require("./controllers/allProducts");
const allStaff = require("./controllers/allStaff");
const blockCustomer = require("./controllers/blockCustomer");
const deleteProduct = require("./controllers/deleteProduct");
const individualProduct = require("./controllers/individualProduct");
const loginProcess = require("./controllers/loginProcess");
const myCart = require("./controllers/myCart");
const myOrders = require("./controllers/myOrders");
const newProduct = require("./controllers/newProduct");
const processOrder = require("./controllers/processOrder");
const registerProcess = require("./controllers/registerProcess");
const searchCustomer = require("./controllers/searchCustomer");
const searchOrder = require("./controllers/searchOrder");
const searchProduct = require("./controllers/searchProduct");
const searchStaff = require("./controllers/searchStaff");
const shippingToday = require("./controllers/shippingToday");
const unblockCustomer = require("./controllers/unblockCustomer");
const blockStaff = require("./controllers/blockStaff");
const unblockStaff = require("./controllers/unblockStaff");
const updateProduct = require("./controllers/updateProduct");
const updateProdcutProcess = require("./controllers/updateProductProcess");
const about = require("./controllers/about");

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
