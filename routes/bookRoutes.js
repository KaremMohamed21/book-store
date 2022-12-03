const { Router } = require("express");
const {
  createNewBook,
  getAllBooks,
  getBookById,
  updateBookById,
  uploadCoverImage,
  deleteBookById
} = require("./../controllers/BookController");

const router = Router();

router.route("/").get(getAllBooks).post(uploadCoverImage, createNewBook);
router.route("/:id").get(getBookById).patch(uploadCoverImage, updateBookById).delete(deleteBookById);

module.exports = router;
