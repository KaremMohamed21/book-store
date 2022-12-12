const redisClient = require("./../utils/redis");
const catchAsync = require("./../utils/catchAsync");
const { v4 } = require("uuid");
const Book = require("./../models/bookModel");

exports.addToCart = catchAsync(async (req, res, next) => {
  // get the book
  const book = await Book.findById(req.params.id);

  // check if there's cart
  let cartId;
  if (!req.headers.cartId) {
    cartId = v4();
  } else {
    cartId = req.headers.cartId;
  }

  // Set data to redis cart
  let itemsData = [];
  if (redisClient.exists(cartId) !== 1) {
    itemsData.push(book);
    await redisClient.hSet(cartId, "items", JSON.stringify(itemsData));
    await redisClient.hSet(cartId, "quantity", 1);
    await redisClient.hSet(cartId, "totalPrice", book.price);
  } else {
    itemsData = JSON.parse(await redisClient.hGet(cartId, "items"));
    itemsData.push(book);
    await redisClient.hSet(cartId, "items", JSON.stringify(itemsData));
  }

  let finalData = await redisClient.hGetAll(cartId);

  // increase item quantity
  res.status(200).json({
    status: "success",
    cartId,
    message: "Added!"
  });
});

exports.getCartById = catchAsync(async (req, res, next) => {
  const data = await redisClient.hGetAll(req.params.id);

  res.status(200).json({
    status: "success",
    data
  });
});
