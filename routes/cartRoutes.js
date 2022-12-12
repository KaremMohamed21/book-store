const { Router } = require("express");
const { addToCart, getCartById } = require("./../controllers/cartController");
const router = Router();

router.get("/add-to-cart/:id", addToCart);
router.get("/get-cart/:id", getCartById);

module.exports = router;
