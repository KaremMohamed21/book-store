const { Router } = require("express");
const {
  signup,
  login,
  getAllUsers,
  getUserById,
  updateUserById,
  uploadUserImage,
  deleteUserById
} = require("./../controllers/userController");
const { protect } = require("./../middleware/protect");

const router = Router();

router.post("/signup", uploadUserImage, signup);
router.post("/login", login);

router.route("/").get(getAllUsers).patch(protect, uploadUserImage, updateUserById).delete(protect, deleteUserById);
router.route("/:id").get(getUserById);

module.exports = router;
