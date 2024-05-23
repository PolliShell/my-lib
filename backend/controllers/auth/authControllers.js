// authControllers.js
const bcrypt = require("bcrypt");
const { Parse } = require("parse/node");
const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
    return jwt.sign(
        { id: user.id, email: user.email },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
    );
};

const generateRefreshToken = (user) => {
    return jwt.sign(
        { id: user.id, email: user.email },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "7d" }
    );
};

// Function to register a new user
const signup = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Create new user
        const newUser = new Parse.User();
        newUser.set("username", username);
        newUser.set("email", email);
        newUser.set("password", password);

        // Generate tokens
        const accessToken = generateAccessToken(newUser);
        const refreshToken = generateRefreshToken(newUser);

        // Set tokens to user object
        newUser.set("accessToken", accessToken);
        newUser.set("refreshToken", refreshToken);

        // Save user
        const savedUser = await newUser.signUp();

        // Return tokens
        res.status(200).json({
            loggedIn: true,
            email: savedUser.get("email"),
            accessToken,
            refreshToken,
        });
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userQuery = new Parse.Query(Parse.User);
        userQuery.equalTo("email", email);
        const user = await userQuery.first();

        if (!user) {
            return res.status(401).json({ loggedIn: false, message: "Invalid email or password" });
        }

        // Authenticate user
        const loggedInUser = await Parse.User.logIn(email, password);

        // Generate tokens
        const accessToken = generateAccessToken(loggedInUser);
        const refreshToken = generateRefreshToken(loggedInUser);

        // Return tokens
        res.json({
            loggedIn: true,
            user: loggedInUser.toJSON(),
            accessToken,
            refreshToken
        });
    } catch (error) {
        console.error("Login error: ", error);
        res.status(401).json({ loggedIn: false, message: "Invalid email or password" });
    }
};

module.exports = { signup,login };
