const express = require("express");
const router = express.Router();
const passport = require("passport");
const { generateAccessToken } = require("../controllers/auth/authControllers");

router.get(
  "/",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/callback",
  passport.authenticate("google", {
    failureRedirect: "/error",
  }),
  (req, res) => res.json({ user: req.user })
);

router.get("/success", async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/");
  }

  const accessToken = generateAccessToken({ id: req.user.id });

  res.json({
    success: true,
    user: req.user.toJSON(),
    accessToken,
  });
});

router.get("/error", (req, res) => {
  res.status(401).json({ success: false, message: "Error logging in" });
});

module.exports = router;
