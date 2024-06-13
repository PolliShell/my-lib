const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const Parse = require("parse/node");
const { generateAccessToken } = require("../controllers/auth/authControllers");
const User = Parse.Object.extend("_User");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (profile, done) => {
      try {
        const existingUser = await new Parse.Query(User)
          .equalTo("email", profile.emails[0].value)
          .first();

        if (existingUser) {
          return done(null, existingUser);
        }

        const user = new User();
        user.set("username", profile.displayName);
        user.set("password", "");
        user.set("email", profile.emails[0].value);
        user.set("emailVerified", true);
        user.set(accessToken, true);
        // user.set("authData", { google: profile.id });

        await user.save(null, { useMasterKey: true });
        // await user.save();
        return done(null, user);
      } catch (err) {
        console.error("Error in Google authentication strategy:", err);
        return done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  console.log("Serializing user:", user);
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    console.log("Deserializing user with ID:", id);
    const user = await new Parse.Query(User).get(id, { useMasterKey: true });

    done(null, user);
  } catch (err) {
    console.error("Error in deserializing user:", err);
    done(err);
  }
});

module.exports = passport;
