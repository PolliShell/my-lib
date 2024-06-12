const express = require("express");
const cors = require("cors");
const session = require("express-session");
const bodyParser = require("body-parser");
const passport = require("passport");

require("dotenv").config();
require("./config/passportSutup");

const bookRoutes = require("./routes/bookRoutes");
const genreRoutes = require("./routes/genresRoutes");
const authorRoutes = require("./routes/authorRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const cartRoutes = require("./routes/cartRoutes");
const favoritesRoutes = require("./routes/favoritesRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const googleRoutes = require("./routes/googleRoutes");
const commentRoutes = require("./routes/commentRoutes");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ credentials: true }));

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
app.use("/genre", genreRoutes);
app.use("/user", userRoutes);
app.use("/cart", cartRoutes);
app.use("/favorites", favoritesRoutes);
app.use("/payment", paymentRoutes);

const PORT = process.env.APP_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
