const Cart = require("../models/cart");
exports.addItemToCart = (req, res) => {
  const cart = new Cart({
    user: req.user_id,
    cartItems: req.body.cartItems,
  });
  cart.save((error, product) => {
    if (error) return res.status(400).json({ error });
    if (cart) {
      res.status(201).json({ cart });
    }
  });
};
