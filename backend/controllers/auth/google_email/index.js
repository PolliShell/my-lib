/*  EXPRESS */
const express = require('express');
const app = express();
const session = require('express-session');

app.set('view engine', 'ejs');

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'SECRET'
}));

// app.get('/', function(req, res) {
//     res.render('pages/auth');
// });
//



const passport = require('passport');
let userProfile;

app.use(passport.initialize());
app.use(passport.session());

app.get('/success', (req, res) => {
    res.redirect(`/user/profile/${req.user.id}`);
});

app.get('/error', (req, res) => res.send("error logging in"));

passport.serializeUser(function(user, cb) {
    cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});


/*  Google AUTH  */

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

app.get('/',
    passport.authenticate('google', { scope : ['profile', 'email'] }));

app.get('/callback',
    passport.authenticate('google', { failureRedirect: '/error' }),
    function(req, res) {
        // Successful authentication, redirect success.
        res.redirect(`/user/profile/${req.user.id}`);
    });

module.exports=app;