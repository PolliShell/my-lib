const express = require("express");
const router = express.Router();
const favController = require("../../controllers/favorites/favoritesControllers");
const { authenticate } = require("../../controllers/auth/authControllers");

router.get("/", authenticate, favController.getFavorites);
router.post("/add", authenticate, favController.addBookToFavorites);
router.delete(
  "/delete/:bookId",
  authenticate,
  favController.removeBookFromFavorites
);

module.exports = router;
