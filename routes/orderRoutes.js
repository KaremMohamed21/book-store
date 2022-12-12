const { Router } = require("express");
const { createOrder } = require("./../controllers/orderController");
const { protect } = require("./../middleware/protect");
const router = Router();

router.post("/create-order/:id", protect, createOrder);

module.exports = router;
