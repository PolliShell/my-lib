// authRoutes.js

const express = require('express');
const router = express.Router();
const passport = require('passport');

// Route for handling successful authentication
router.get('/success', (req, res) => {
    res.json({ success: true, user: req.user });
});

// Route for handling authentication error
router.get('/error', (req, res) => {
    res.status(401).json({ success: false, message: "Error logging in" });
});

// Route for initiating Google authentication
router.get('/',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

// Callback route for Google authentication
router.get('/callback',
    passport.authenticate('google', { failureRedirect: '/auth/error' }),
    (req, res) => {
        // Successful authentication, return user data in JSON format
        res.json({ success: true, user: req.user });
    });

module.exports = router;
