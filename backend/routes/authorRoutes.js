const express = require("express");
const router = express.Router();
const authorController = require("../controllers/author/authorControllers");

router.get("/", authorController.getAllAuthors);

module.exports = router;
