const express = require("express");
const router = express.Router();
const reviewsController = require("../../controllers/reviews/reviewsControllers");
const { authenticate } = require("../../controllers/auth/authControllers");

router.get("/user/:user_id", reviewsController.getCommentsByUserId);
router.get("/by-book/:id", reviewsController.getReviewsByBookId);
router.post("/", authenticate, reviewsController.addComment);

module.exports = router;
