const express = require("express");
const router = express.Router();
const userController = require("../controllers/user/userControllers");

router.get("/profile/:id", userController.getUserById);

module.exports = router;
