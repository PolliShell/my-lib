const express = require("express");
const cors = require("cors");
const session = require("express-session");
const bodyParser = require("body-parser");
const bookRoutes = require("./routes/bookRoutes");
const genreRoutes = require("./routes/genresRoutes");
const authorRoutes = require("./routes/authorRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes")
const cartRoures=require("./routes/cartRoutes");
const favoritesRoutes = require("./routes/favoritesRoutes");
require("dotenv").config();

const app = express();

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

app.use("/books", bookRoutes);
app.use("/authors", authorRoutes);
app.use("/auth", authRoutes);
app.use("/genre", genreRoutes);
app.use("/user", userRoutes);
app.use("/cart", cartRoures);
app.use("/favorites", favoritesRoutes);

const PORT = process.env.APP_PORT;

app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});

