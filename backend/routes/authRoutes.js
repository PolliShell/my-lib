const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth/authControllers");
const validateForm = require("../controllers/validateForm/validateForm");
const path = require("path");

router.post("/login",  authController.login);
router
    .route("/login")
    .get(async (req, res) => {
        res.sendFile(path.join(__dirname, "login.html"));
    })

router.post("/signup", authController.signup);
router
    .route("/signup")
    .get(async (req, res) => {
        res.sendFile(path.join(__dirname, "signup.html"));
    })

module.exports = router;
