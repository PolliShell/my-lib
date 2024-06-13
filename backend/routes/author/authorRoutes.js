const express = require("express");
const router = express.Router();
const authorController = require("../../controllers/author/authorControllers");

router.get("/", authorController.getAllAuthors);

router.get("/:id", async (req, res) => {
  const authorId = req.params.id;
  try {
    const author = await authorController.getAuthorById(authorId);
    res.json(author);
  } catch (error) {
    console.error("Error fetching author:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
