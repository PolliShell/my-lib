const express = require("express");
const passport = require("passport");
const router = express.Router();
const path = require("path"); // добавили модуль path
const app = express();
// Указываем Express, что мы будем использовать EJS в качестве движка шаблонов
app.set("view engine", "ejs");

router.get("/", function (req, res) {
  res.render(path.join(__dirname, "views", "pages/auth")); // Используем абсолютный путь к файлу представления
});

router.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
    "/auth/google/callback",
    passport.authenticate("google", {
        failureRedirect: "/error",
        successRedirect: "/success",
    })
);

router.get("/success", (req, res) => {
  res.render(path.join(__dirname, "views", "success"), { user: req.user }); // Используем абсолютный путь к файлу представления
});

router.get("/error", (req, res) => res.send("Error logging in"));

module.exports = router;
