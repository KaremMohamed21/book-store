const Order = require("../models/orderModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const redisClient = require("./../utils/redis");

exports.createOrder = catchAsync(async (req, res, next) => {
  // get user id from req.user
  const userId = req.user.id;
  // get the cart id from params and get cart data
  const cart = await redisClient.hGetAll(req.params.id);
  // create the order and return it
  const order = await Order.create({
    userId,
    cart,
    totalCost: parseInt(cart.totalPrice)
  });

  res.status(201).json({
    status: "success",
    data: {
      order
    }
  });
});
