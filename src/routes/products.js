const express = require("express");
const { requireSignIn, adminMiddleware } = require("../common-middleware");
const shortid = require("shortid");
const path = require("path");
const router = express.Router();
const Product = require("../models/product");
const multer = require("multer");
const { createProduct, getProducts } = require("../controller/product");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

router.post(
  "/create",
  requireSignIn,
  adminMiddleware,
  upload.array("productPicture"),
  createProduct
);
router.get(
  "/",
  getProducts
)
//router.get("/categories", getCategories);
module.exports = router;
