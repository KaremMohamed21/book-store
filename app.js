const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const AppError = require("./utils/AppError");
const globalErrorHandler = require("./utils/globalErrorHandler");
const categoryRouter = require("./routes/categoryRoutes");
const bookRouter = require("./routes/bookRoutes");

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

// page not found
app.all("*", (req, res, next) => {
  return next(new AppError("Page not found", 404));
});

// Global error handler
app.use(globalErrorHandler);

module.exports = app;