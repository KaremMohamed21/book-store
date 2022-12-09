const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/AppError");
const jwt = require("jsonwebtoken");
const multer = require("multer");

// create and send token
function createAndSendToken(user, req, res) {
  // create the token
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });

  // send the token in the cookie
  const cookieOptions = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
    httpOnly: true
  };

  if (req.secure || req.headers["x-forwarded-proto"] === "https") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  user.password = undefined;

  return token;
}

// create multer disk storage
const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/imgs");
  },
  filename: function (req, file, cb) {
    req.body.image = `user-${Date.now()}-profile.${file.mimetype.split("/")[1]}`;
    cb(null, req.body.image);
  }
});

// create multer filter
const multerFilter = function (req, file, cb) {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images."));
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

exports.uploadUserImage = upload.single("image");

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);

  const token = createAndSendToken(newUser, req, res);

  res.status(201).json({
    status: "success",
    token,
    data: {
      user: newUser
    }
  });
});

exports.login = catchAsync(async (req, res, next) => {
  // extract the email and password from the body
  const { email, password } = req.body;

  // check if there's no email or password
  if (!email || !password) return next(new AppError("Please enter email or password!", 400));

  // check if the email exists and the password is true
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password)))
    return next(new AppError("Invalid email or password", 400));

  // create and sent token
  const token = createAndSendToken(user, req, res);

  // send the response
  res.status(200).json({
    status: "success",
    token,
    data: {
      user
    }
  });
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  if (!users) return next(new AppError("There is no users", 400));

  res.status(200).json({
    status: "success",
    data: {
      users
    }
  });
});

exports.getUserById = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) return next(new AppError("There is no user with that id", 400));

  res.status(200).json({
    status: "success",
    data: {
      user
    }
  });
});

exports.updateUserById = catchAsync(async (req, res, next) => {
  if (!req.file) {
    req.body.coverImage = req.body.currentImageName;
  }

  const user = await User.findByIdAndUpdate(req.user.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!user) return next(new AppError("There is no user with that id", 400));

  res.status(200).json({
    status: "success",
    data: {
      user
    }
  });
});

exports.deleteUserById = catchAsync(async (req, res, next) => {
  await User.findByIdAndDelete(req.user.id);

  res.status(200).json({
    status: "success",
    message: "Deleted!"
  });
});
