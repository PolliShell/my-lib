const express = require("express");
const router = express.Router();
const commentController = require("../../controllers/comment/commentControllers");
const { authenticate } = require("../../controllers/auth/authControllers");

router.get("/user/:user_id", commentController.getCommentsByUserId);
router.get("/book/:book_id", commentController.getCommentsByBookId);
router.post("/", authenticate, commentController.addComment);

module.exports = router;
