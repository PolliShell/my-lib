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
    secret: 'SECRET'
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
const GOOGLE_CLIENT_ID = '485902840913-3ibv1jmunjioeak9q375emjf7n914iag.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';

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