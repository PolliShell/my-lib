const Parse = require("../../config/parseConfig");
const {getAuthorById} = require("../author/authorControllers");

const getAll = async (req, res) => {
  const Books = Parse.Object.extend("books");
  const query = new Parse.Query(Books);
  try {
    const results = await query.find();
    const booksWithAuthors = await Promise.all(results.map(async (result) => {
      const bookData = result.toJSON();
      const authorId = bookData.author_id;
      const author = await getAuthorById(authorId); // Функция, которая получает информацию об авторе по его ID
      bookData.authorName = author.full_name; // Добавляем имя автора к данным о книге
      return bookData;
    }));
    res.json(booksWithAuthors);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};


const getById = async (req, res) => {
  const { id } = req.params;
  const Books = Parse.Object.extend("books");
  const query = new Parse.Query(Books);
  query.equalTo("objectId", id);
  try {
    const result = await query.first();
    if (result) {
      res.json(result.toJSON());
    } else {
      res.status(404).send("Book not found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const getBooksByAuthorId = async (req, res) => {
  const { author_id } = req.params;
  const Books = Parse.Object.extend("books");
  const query = new Parse.Query(Books);
  query.equalTo("author_id", author_id);
  try {
    const results = await query.find();
    res.json(results.map(result => result.toJSON()));
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const addBook = async (req, res) => {
  const { title, description, publicationYear, author_id } = req.body;

  if (!author_id) {
    return res.status(400).json({ error: "Author is required" });
  }
  if (!req.file || !req.file.location) {
    return res.status(400).json({ error: "Cover image is required" });
  }
  const coverImageUrl = req.file.location;

  const Books = Parse.Object.extend("books");
  const book = new Books();
  book.set("title", title);
  book.set("description", description);
  book.set("publication_year", Number(publicationYear)); // Ensure it's a number
  book.set("cover_image", coverImageUrl);
  book.set("author_id", author_id);

  try {
    const result = await book.save();
    res.json({ message: "Book added successfully!", book: result.toJSON() });
  } catch (err) {
    console.error("Failed to add book to database:", err);
    res.status(500).json({ error: "Failed to add book to database" });
  }
};

module.exports = {
  getAll,
  getById,
  getBooksByAuthorId,
  addBook,
};
