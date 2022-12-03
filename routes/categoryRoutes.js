const { Router } = require("express");
const {
  createCategory,
  getAllCategories,
  getCategoyById,
  updateCategoryById,
  deleteCategoryById
} = require("./../controllers/categoryController");

const router = Router();

router.route("/").get(getAllCategories).post(createCategory);
router.route("/:id").get(getCategoyById).patch(updateCategoryById).delete(deleteCategoryById);

module.exports = router;
