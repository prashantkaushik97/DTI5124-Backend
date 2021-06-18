const express = require("express");
const { requireSignIn, userMiddleware } = require("../common-middleware");
const router = express.Router();
const {} = require("../controller/cart");
router.post("/addtocart", requireSignIn, userMiddleware);
router.get("/cart");
module.exports = router;
