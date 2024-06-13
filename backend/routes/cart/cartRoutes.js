const express = require("express");
const router = express.Router();
const cartController = require("../../controllers/cart/cartControllers");
const { authenticate } = require("../../controllers/auth/authControllers");

router.get("/", authenticate, cartController.getCartByUser);
router.post("/add", authenticate, cartController.addCartBookByUser);
router.delete(
  "/delete/:bookId",
  authenticate,
  cartController.deleteCartBookById
);
router.post("/purchase", authenticate, cartController.purchaseBooks);
router.get(
  "/purchased-books",
  authenticate,
  cartController.getPurchasedBooksByUser
);

module.exports = router;
