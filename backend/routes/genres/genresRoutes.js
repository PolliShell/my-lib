const express = require("express");
const router = express.Router();
const genreController = require("../../controllers/genre/genreControllers");

router.get("/", genreController.getAll);
router.get("/:id", genreController.getBooksByGenre);

module.exports = router;
