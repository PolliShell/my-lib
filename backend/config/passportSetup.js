// const passport = require("passport");
// const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const Parse = require("parse/node");
// const User = Parse.Object.extend("_User");
//
// passport.use(
//     new GoogleStrategy(
//         {
//           clientID: process.env.GOOGLE_CLIENT_ID,
//           clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//           callbackURL: "/auth/google/callback",
//         },
//         async (accessToken, refreshToken, profile, done) => {
//           try {
//             // Поиск пользователя по email
//             const existingUser = await new Parse.Query(User)
//                 .equalTo("email", profile.emails[0].value)
//                 .first();
//
//             if (existingUser) {
//               return done(null, existingUser);
//             }
//
//             // Создание нового пользователя
//             const user = new User();
//             user.set("username", profile.displayName);
//             user.set("email", profile.emails[0].value);
//             user.set("password", ""); // Пароль не используется
//             user.set("emailVerified", true);
//             user.set("authData", { google: profile.id });
//
//             await user.save(null, { useMasterKey: true });
//             return done(null, user);
//           } catch (err) {
//             console.error("Ошибка в стратегии Google аутентификации:", err);
//             return done(err);
//           }
//         }
//     )
// );
//
// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });
//
// passport.deserializeUser(async (id, done) => {
//   try {
//     const user = await new Parse.Query(User).get(id, { useMasterKey: true });
//     done(null, user);
//   } catch (err) {
//     done(err);
//   }
// });
//
// module.exports = passport;
