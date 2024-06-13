const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const Parse = require("parse/node");
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
            // Логируем профиль, полученный от Google
            console.log("Google profile:", profile);

            // Проверяем, есть ли пользователь в базе данных
            const query = new Parse.Query(User);
            query.equalTo("email", profile.emails[0].value);
            let user = await query.first();

            if (!user) {
              // Если пользователя нет, создаем нового
              user = new User();
              user.set("username", profile.displayName);
              user.set("password", ""); // Должны ли мы установить пароль?
              user.set("email", profile.emails[0].value);
              user.set("emailVerified", true);
              user.set("authData", { google: profile.id });

              // Сохраняем пользователя в базе данных
              await user.save(null, { useMasterKey: true });
              console.log("Created new user:", user);
            }

            // Возвращаем пользователя для дальнейшей обработки
            return done(null, user);
          } catch (err) {
            console.error("Error in Google authentication strategy:", err);
            return done(err); // Возвращаем ошибку в callback
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
    const query = new Parse.Query(User);
    const user = await query.get(id, { useMasterKey: true });
    done(null, user);
  } catch (err) {
    console.error("Error in deserializing user:", err);
    done(err); // Возвращаем ошибку в callback
  }
});

module.exports = passport;
