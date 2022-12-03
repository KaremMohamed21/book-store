const Category = require("./../models/categoryModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/AppError");

// Create new category
exports.createCategory = catchAsync(async (req, res, next) => {
  const category = await Category.create(req.body);

  if (!category) return next(new AppError("Error Creating!", 500));

  res.status(201).json({
    status: "success",
    data: {
      category
    }
  });
});

// find all categories
exports.getAllCategories = catchAsync(async (req, res, next) => {
  const categories = await Category.find();

  if (!categories) return next(new AppError("There is no categories", 404));

  res.status(200).json({
    status: "success",
    data: {
      categories
    }
  });
});

exports.getCategoyById = catchAsync(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category) return next(new AppError("There is no category with that id", 404));

  res.status(200).json({
    status: "success",
    data: {
      category
    }
  });
});

exports.updateCategoryById = catchAsync(async (req, res, next) => {
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    { ...req.body, updatedAt: Date.now() },
    {
      new: true,
      runValidators: true
    }
  );

  if (!category) return next(new AppError("There is no category with that id", 404));

  res.status(200).json({
    status: "success",
    data: {
      category
    }
  });
});

exports.deleteCategoryById = catchAsync(async (req, res, next) => {
  await Category.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: "success",
    message: "Deleted!"
  });
});
