// routes/paymentRoutes.js
const express = require("express");
const {
  validateCreditCardMiddleware,
} = require("../../middlewares/paymentMiddleware");

const router = express.Router();

router.post("/makePayment", validateCreditCardMiddleware, (req, res) => {
  res.status(200).json({ message: "Payment successful" });
});

module.exports = router;
