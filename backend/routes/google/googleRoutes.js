// const express = require("express");
// const router = express.Router();
// const passport = require("passport");
// const { generateAccessToken } = require("../../controllers/auth/authControllers");
// const axios = require("axios");
//
// // Маршрут для инициирования аутентификации
// router.get("/", passport.authenticate("google", { scope: ["profile", "email"] }));
//
// // Маршрут для обработки callback после аутентификации
// // В вашем маршруте обратного вызова Google OAuth
// router.get(
//     "/callback",
//     passport.authenticate("google", {
//       failureRedirect: "/error",
//     }),
//     async (req, res) => {
//       try {
//         // Получение данных пользователя из вашей базы данных
//         const user = req.user; // Получение пользователя из сессии или из базы данных
//         res.json({ success: true, user });
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//         res.status(500).json({ success: false, message: "Error fetching user data" });
//       }
//     }
// );
//
//
// // Маршрут успешной аутентификации (если используется для проверки)
// router.get("/success", async (req, res) => {
//   if (!req.isAuthenticated()) {
//     return res.redirect("/");
//   }
//
//   const accessToken = generateAccessToken({ id: req.user.id });
//
//   res.json({
//     success: true,
//     user: req.user.toJSON(),
//     accessToken,
//   });
// });
//
// // Маршрут ошибки аутентификации
// router.get("/error", (req, res) => {
//   res.status(401).json({ success: false, message: "Error logging in" });
// });
//
// module.exports = router;