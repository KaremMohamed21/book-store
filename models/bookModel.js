const { model, Schema } = require("mongoose");

const bookSchema = Schema({
  title: {
    type: String,
    required: [true, "Book title is required"],
    trim: true
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "Category"
  },
  description: {
    type: String,
    trim: true
  },
  bookNumber: {
    type: Number,
    required: [true, "book number is required"]
  },
  Author: {
    type: String,
    required: [true, "Author is required"]
  },
  price: {
    type: Number,
    required: true
  },
  coverImage: {
    type: String,
    default: "default.jpg"
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: Date.now()
  }
});

// Update at default
bookSchema.pre("save", (next) => {
  if (!this.isModified()) return next();

  this.updatedAt = Date.now();
  next();
});

const Book = model("Book", bookSchema);

module.exports = Book;
