const express = require('express');
const router = express.Router();
const authorController = require("../controllers/autor/authorControllers");

router.get('/', authorController.getAllAuthors);

module.exports = router;
