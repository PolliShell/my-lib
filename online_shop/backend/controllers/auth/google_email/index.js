/*  EXPRESS */
const express = require('express');
const google_email_app = express();
const session = require('express-session');
const path = require('path');
google_email_app.set('views', path.join(__dirname, 'views'));
google_email_app.set('view engine', 'ejs');

google_email_app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET
}));

google_email_app.get('/auth', function(req, res) {
    res.render('pages/auth');
});



const passport = require('passport');
let userProfile;

google_email_app.use(passport.initialize());
google_email_app.use(passport.session());

google_email_app.get('/success', (req, res) => {
    res.render('pages/success', {user: userProfile});
});
google_email_app.get('/error', (req, res) => res.send("error logging in"));

passport.serializeUser(function(user, cb) {
    cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GOOGLE_CLIENT_ID = process.env.CLIENT_SECRET;
const GOOGLE_CLIENT_SECRET = process.env.CLIENT_ID;

passport.use(new GoogleStrategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        userProfile=profile;
        return done(null, userProfile);
    }
));

google_email_app.get('/auth/google',
    passport.authenticate('google', { scope : ['profile', 'email'] }));

google_email_app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/error' }),
    function(req, res) {
        res.redirect('/success');
    });

module.exports=google_email_app