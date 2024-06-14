const Parse = require("../../config/parseConfig");
const { getAuthorById } = require("../author/authorControllers");

const getAll = async (req, res) => {
  try {
    const Genres = Parse.Object.extend("genres");
    const genres = await new Parse.Query(Genres).find();

    if (!genres.length) {
      return res.status(404).send("Genres not found");
    }

    res.json(genres);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const getBookGenres = async (req, res) => {
  const bookId = req.params.id;

  try {
    const BooksInfo = Parse.Object.extend("books_info");
    const book = await new Parse.Query(BooksInfo)
      .equalTo("book_id", bookId)
      .first();

    if (!book) {
      return res.status(404).send("Book not found");
    }

    const genresIds = book.get("genres");

    const Genres = Parse.Object.extend("genres");
    const genres = await new Parse.Query(Genres)
      .containedIn("objectId", genresIds)
      .find();

    if (!genres.length) {
      return res.status(404).send("Genres not found");
    }

    res.json(genres);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const getBooksByGenre = async (req, res) => {
  const genreId = req.params.id;

  try {
    const BooksInfo = Parse.Object.extend("books_info");
    const booksInfo = await new Parse.Query(BooksInfo)
      .containedIn("genres", [genreId])
      .find();

    if (!booksInfo.length) {
      return res.status(200).json([]);
    }

    const bookIds = booksInfo.map((b) => b.get("book_id"));

    const Books = Parse.Object.extend("books");
    const books = await new Parse.Query(Books)
      .containedIn("objectId", bookIds)
      .find();

    const booksWithAuthors = await Promise.all(
      books.map(async (book) => {
        const bookData = book.toJSON();
        const author = await getAuthorById(bookData.author_id);
        bookData.author_name = author.full_name;
        return bookData;
      })
    );

    res.status(200).json(booksWithAuthors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getBooksByGenre,
  getAll,
  getBookGenres,
};
