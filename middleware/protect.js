const User = require("./../models/userModel");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const AppError = require("./../utils/AppError");
const catchAsync = require("./../utils/catchAsync");

exports.protect = catchAsync(async (req, res, next) => {
  // Extract token
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  // check if there's token
  if (!token) return next(new AppError("Please log in or sign up!", 400));

  // check if the token is valid
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // check if the user exists
  const user = await User.findById(decoded.id);
  if (!user) return next(new AppError("Please log in or sign up!", 400));

  // grant access
  req.user = user;
  next();
});
