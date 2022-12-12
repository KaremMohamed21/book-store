const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const AppError = require("./utils/AppError");
const globalErrorHandler = require("./utils/globalErrorHandler");
const categoryRouter = require("./routes/categoryRoutes");
const bookRouter = require("./routes/bookRoutes");
const userRouter = require("./routes/userRoutes");
const cartRouter = require("./routes/cartRoutes");

const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(logger("dev"));
app.use(cookieParser());

// router
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/book", bookRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/cart", cartRouter);
app.get("/", (req, res) => {
  res.send("<head> <title> Book Store API </title> </head> <h1>Welcome to Book Store API</h1>");
});

// page not found
app.all("*", (req, res, next) => {
  return next(new AppError("Page not found", 404));
});

// Global error handler
app.use(globalErrorHandler);

module.exports = app;
