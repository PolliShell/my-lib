const Parse = require("../../config/parseConfig");

const getAllAuthors = async (req, res) => {
  const Authors = Parse.Object.extend("authors");
  const query = new Parse.Query(Authors);
  try {
    const results = await query.find();
    const authors = results.map((author) => ({
      id: author.id,
      full_name: author.get("full_name"),
      cover_image: author.get("cover_image"),
    }));
    res.json(authors);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const getAuthorById = async (authorId) => {
  const authors = Parse.Object.extend("authors");
  const query = new Parse.Query(authors).equalTo("objectId", authorId);

  try {
    const author = await query.first();
    return author.toJSON();
  } catch (err) {
    console.error(err);
    throw new Error("Failed to get author data");
  }
};

module.exports = {
  getAllAuthors,
  getAuthorById,
};
