const { model, Schema } = require("mongoose");

const categorySchema = Schema({
  name: {
    type: String,
    required: [true, "Category name is required"],
    trim: true
  },
  description: {
    type: String,
    trim: true
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

const Category = model("Category", categorySchema);

module.exports = Category;
