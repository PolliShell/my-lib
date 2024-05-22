const express = require("express");
const cors = require("cors");
const session = require("express-session");
const bodyParser = require("body-parser");
const bookRoutes = require("./routes/bookRoutes");
const authorRoutes = require("./routes/authorRoutes");
const authRouter = require("./routes/authRoutes");
require("dotenv").config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ credentials: true }));

app.use(session({
    secret: process.env.COOKIE_SECRET,
    credentials: true,
    name: "sid",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.ENVIRONMENT === "production",
        httpOnly: true,
        sameSite: process.env.ENVIRONMENT === "production" ? "none" : "lax"
    }
}));

app.use("/books", bookRoutes);
app.use("/authors", authorRoutes);
app.use("/auth", authRouter);

const PORT = process.env.APP_PORT;

app.listen(PORT, () => {
    console.log('Server is running on port 3000');
});