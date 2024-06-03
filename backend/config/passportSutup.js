const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const Parse = require("parse/node"); // Import Parse
const User = Parse.Object.extend("_User");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if the user already exists in your Parse database
        const query = new Parse.Query(User);
        query.equalTo("email", profile.emails[0].value); // Assuming email is unique
        let user = await query.first();

        if (!user) {
          // If the user doesn't exist, create a new user
          user = new User();
          user.set("username", profile.displayName);
          user.set("password", ""); // You may need to set a dummy password here
          user.set("email", profile.emails[0].value);
          user.set("emailVerified", true); // Assuming Google users are always verified
          // Additional fields can be set based on your requirements
          user.set("authData", { google: profile.id }); // Store Google ID in authData
          await user.save(null, { useMasterKey: true });
        }

        return done(null, user);
      } catch (err) {
        console.error("Error in Google authentication strategy:", err);
        return done(err); // Pass the error to the callback
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const query = new Parse.Query(User);
    const user = await query.get(id, { useMasterKey: true });
    done(null, user);
  } catch (err) {
    console.error("Error in deserializing user:", err);
    done(err); // Pass the error to the callback
  }
});

module.exports = passport;
