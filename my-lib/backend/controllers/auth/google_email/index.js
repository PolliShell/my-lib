/* EXPRESS */
const express = require('express');
const google_email_app = express();
const session = require('express-session');
const path = require('path');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

google_email_app.set('views', path.join(__dirname, 'views'));
google_email_app.set('view engine', 'ejs');

google_email_app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET
}));

google_email_app.use(passport.initialize());
google_email_app.use(passport.session());

google_email_app.get('/auth', function(req, res) {
    res.render('pages/auth');
});

google_email_app.get('/success', (req, res) => {
    res.render('pages/success', { user: req.user });
});

google_email_app.get('/error', (req, res) => res.send("error logging in"));

passport.serializeUser(function(user, cb) {
    cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});

passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }
));

google_email_app.get('/auth/google',
    passport.authenticate('google', { scope : ['profile', 'email'] }));

google_email_app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/error', successRedirect: '/success' }));

module.exports = google_email_app;
