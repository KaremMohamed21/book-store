const Book = require("./../models/bookModel");
const AppError = require("./../utils/AppError");
const catchAsync = require("./../utils/catchAsync");
const multer = require("multer");

// image upload
// Create disk storage
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/imgs");
  },
  filename: (req, file, cb) => {
    req.body.coverImage = `book-${Date.now()}-cover.${file.mimetype.split("/")[1]}`;
    cb(null, req.body.coverImage);
  }
});

// Create file filter
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images."));
  }
};

// create upload object
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

exports.uploadCoverImage = upload.single("coverImage");

// Create new book
exports.createNewBook = catchAsync(async (req, res, next) => {
  const book = await Book.create(req.body);

  if (!book) return next(new AppError("Error Creating!", 500));

  res.status(201).json({
    status: "success",
    data: {
      book
    }
  });
});

// Get all books
exports.getAllBooks = catchAsync(async (req, res, next) => {
  const books = await Book.find();

  if (!books) return next(new AppError("there are no books", 404));

  res.status(200).json({
    status: "success",
    data: {
      books
    }
  });
});

// Get book by Id
exports.getBookById = catchAsync(async (req, res, next) => {
  const book = await Book.findById(req.params.id);

  if (!book) return next(new AppError("there is no book with that id", 404));

  res.status(200).json({
    status: "success",
    data: {
      book
    }
  });
});

// update book by Id
exports.updateBookById = catchAsync(async (req, res, next) => {
  if (!req.files) {
    req.body.coverImage = req.body.currentImageName;
  }

  const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!book) return next(new AppError("There is no book with that id", 404));

  res.status(200).json({
    status: "success",
    data: {
      book
    }
  });
});

// delete book by id
exports.deleteBookById = catchAsync(async (req, res, next) => {
  await Book.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: "success",
    message: "Deleted!"
  });
});
