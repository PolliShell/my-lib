const express = require("express");
const router = express.Router();
const bookController = require("../controllers/book/bookControllers");
const { upload } = require("../aws/aws");

router.get("/books", bookController.getAll);
router.get("/books/:id", bookController.getById);
router.get("/books/by-author/:author_id", bookController.getBooksByAuthorId);

// Use the upload middleware in the add-book route
router.post(
  "/books/add-book",
  upload.single("coverImage"),
  bookController.addBook
);

module.exports = router;
