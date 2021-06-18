const express = require("express");
const { requireSignIn, adminMiddleware } = require("../common-middleware");
const router = express.Router();
const { addCategory, getCategories } = require("../controller/categories");
router.post("/create", requireSignIn, adminMiddleware, addCategory);
router.get("/categories", getCategories);
module.exports = router;
