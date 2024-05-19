const express = require("express");
const router = express.Router();
const bookController = require("../controllers/book/bookControllers");
const { upload } = require("../aws/aws");

router.get("/", bookController.getAll);
router.get("/:id", bookController.getById);
router.get("/by-author/:author_id", bookController.getBooksByAuthorId);

// Use the upload middleware in the add-book route
router.post("/add-book", upload.single("coverImage"), bookController.addBook);

module.exports = router;
