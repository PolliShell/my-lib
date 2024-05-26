const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart/cartControllers");
const {authenticate} = require("../controllers/auth/authControllers");

router.get("/", authenticate, cartController.getCartByUserId);
router.post('/add', authenticate, cartController.addBookToCartByUser);
router.delete("/delete/:bookId", authenticate, cartController.deleteBookFromCartById);
// router.post("/purchase", authenticate, cartController.purchaseBooks);

module.exports = router;
