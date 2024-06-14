const express = require("express");
const cors = require("cors");
const session = require("express-session");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require('path');
require("dotenv").config();
require("./config/passportSetup");

const bookRoutes = require("./routes/book/bookRoutes");
const genreRoutes = require("./routes/genres/genresRoutes");
const authorRoutes = require("./routes/author/authorRoutes");
const authRoutes = require("./routes/auth/authRoutes");
const userRoutes = require("./routes/user/userRoutes");
const cartRoutes = require("./routes/cart/cartRoutes");
const favoritesRoutes = require("./routes/favorites/favoritesRoutes");
const paymentRoutes = require("./routes/payment/paymentRoutes");
const googleRoutes = require("./routes/google/googleRoutes");
const commentRoutes = require("./routes/comment/commentRoutes");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ credentials: true }));
app.use(express.static(path.join(__dirname, '../frontend/build')));
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    credentials: true,
    name: "sid",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.ENVIRONMENT === "production",
      httpOnly: true,
      sameSite: process.env.ENVIRONMENT === "production" ? "none" : "lax",
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/books", bookRoutes);
app.use("/comments", commentRoutes);
app.use("/authors", authorRoutes);
app.use("/auth", authRoutes);
app.use("/auth/google", googleRoutes);
app.use("/genres", genreRoutes);
app.use("/user", userRoutes);
app.use("/cart", cartRoutes);
app.use("/favorites", favoritesRoutes);
app.use("/payment", paymentRoutes);

const PORT = process.env.APP_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
