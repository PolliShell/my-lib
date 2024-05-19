const db = require("../../config/db");
const Book = require("../../models/book");

const getAll = async (req, res) => {
  try {
    const books = await Book.find();

    if (!books.length) {
      res.status(404).send("Books not found");
    }

    res.status(200).json(books);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const getById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query("SELECT * FROM book WHERE id = $1", [id]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const getBooksByAuthorId = async (req, res) => {
  const { author_id } = req.params;
  console.log(`Requested seller_id: ${author_id}`);
  try {
    const result = await db.query("SELECT * FROM book WHERE author_id = $1", [
      author_id,
    ]);
    console.log(`SQL Query Result:`, result.rows);
    res.json({ products: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const addBook = async (req, res) => {
  const { title, description, publicationYear, author_id } = req.body; // Ensure author_id is included
  if (!author_id) {
    return res.status(400).json({ error: "Author is required" }); // Handle missing author_id
  }

  // Handle file upload
  if (!req.file || !req.file.location) {
    return res.status(400).json({ error: "Cover image is required" });
  }
  const coverImageUrl = req.file.location;

  try {
    const result = await addBookToDatabase(
      title,
      description,
      publicationYear,
      coverImageUrl,
      author_id
    );
    console.log("Book added to database:", result);
    res.json({ message: "Book added successfully!", book: result });
  } catch (error) {
    console.error("Failed to add book to database:", error);
    res.status(500).json({ error: "Failed to add book to database" });
  }
};

async function addBookToDatabase(
  title,
  description,
  publicationYear,
  coverImageUrl,
  author_id
) {
  const query = {
    text: "INSERT INTO book (title, description, publication_year, cover_image, author_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    values: [title, description, publicationYear, coverImageUrl, author_id],
  };

  try {
    const result = await db.pool.query(query);
    return result.rows[0];
  } catch (error) {
    console.error("Error adding book to database:", error);
    throw error;
  }
}

module.exports = {
  getAll,
  getById,
  getBooksByAuthorId,
  addBook,
};
