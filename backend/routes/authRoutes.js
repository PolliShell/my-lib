const express = require("express");
const validateForm = require("../controllers/validateForm/validateForm");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../config/db");
const path = require("path");
router
  .route("/login")
  .get(async (req, res) => {
    res.sendFile(path.join(__dirname, "login.html"));
  })
  .post(async (req, res) => {
    const potentialLogin = await pool.query(
      "SELECT id, username, passhash FROM users u WHERE u.username=$1",
      [req.body.username]
    );

    if (potentialLogin.rowCount > 0) {
      const isSamePass = await bcrypt.compare(
        req.body.password,
        potentialLogin.rows[0].passhash
      );
      if (isSamePass) {
        req.session.user = {
          username: req.body.username,
          id: potentialLogin.rows[0].id,
        };
        res.json({ loggedIn: true, username: req.body.username });
      } else {
        res.json({ loggedIn: false, status: "Wrong username or password!" });
        console.log("not good");
      }
    } else {
      console.log("not good");
      res.json({ loggedIn: false, status: "Wrong username or password!" });
    }
  });

router
  .route("/signup")
  .get(async (req, res) => {
    res.sendFile(path.join(__dirname, "signup.html"));
  })
  .post(async (req, res) => {
    const existingUser = await pool.query(
      "SELECT username from users WHERE username=$1",
      [req.body.username]
    );

    if (existingUser.rowCount === 0) {
      const hashedPass = await bcrypt.hash(req.body.password, 10);
      const newUserQuery = await pool.query(
        "INSERT INTO users(username, passhash) values($1,$2) RETURNING id, username",
        [req.body.username, hashedPass]
      );
      req.session.user = {
        username: req.body.username,
        id: newUserQuery.rows[0].id,
      };

      res.json({ loggedIn: true, username: req.body.username });
    } else {
      res.json({ loggedIn: false, status: "Username taken" });
    }
  });
module.exports = router;
