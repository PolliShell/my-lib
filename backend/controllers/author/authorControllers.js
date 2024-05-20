// controllers/authorControllers.js
const db = require("../../config/db");

const getAllAuthors = async (req, res) => {
  try {
    const result = await db.query(
      "SELECT id, full_name, cover_image FROM author"
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getAllAuthors,
};
