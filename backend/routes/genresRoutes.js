const express = require("express");
const router = express.Router();
const genreController = require("../controllers/genre/genreControllers");
const { upload } = require("../aws/aws");
const {getBooksByGenres} = require("../controllers/genre/genreControllers");

router.get("/", genreController.getAll);

module.exports = router;
