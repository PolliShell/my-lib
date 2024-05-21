const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth/authControllers");
const validateForm = require("../controllers/validateForm/validateForm");

router.post("/login",  authController.login);
router.post("/signup", authController.signup);

module.exports = router;
