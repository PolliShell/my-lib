const Parse = require("../../config/parseConfig");
const { getAuthorById } = require("../author/authorControllers");

const getAll = async (req, res) => {
  const Books = Parse.Object.extend("books");
  const query = new Parse.Query(Books);
  try {
    const books = await query.find();

    if (!books.length) {
      return res.status(404).send("Books not found");
    }

    const booksWithAuthors = await Promise.all(
      books.map(async (book) => {
        const bookData = book.toJSON();
        const author = await getAuthorById(bookData.author_id); // Функция, которая получает информацию об авторе по его ID
        bookData.author_name = author.full_name; // Добавляем имя автора к данным о книге
        return bookData;
      })
    );
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
    const book = await query.first();
    if (!book) {
      return res.status(404).send("Book not found");
    }

    // Fetch additional information from books_info table
    const BooksInfo = Parse.Object.extend("books_info");
    const infoQuery = new Parse.Query(BooksInfo);
    infoQuery.equalTo("book_id", id);
    const bookInfo = await infoQuery.first();

    // Combine book details with additional information
    const combinedBook = {
      objectId: book.id,
      createdAt: book.createdAt,
      updatedAt: book.updatedAt,
      ACL: book.ACL,
      price: book.get("price"),
      title: book.get("title"),
      author_id: book.get("author_id"),
      cover_image: book.get("cover_image"),
      description: book.get("description"),
      ISBN: bookInfo ? bookInfo.get("ISBN") : null,
      language: bookInfo ? bookInfo.get("language") : null,
      cover_type: bookInfo ? bookInfo.get("cover_type") : null,
      format: bookInfo ? bookInfo.get("format") : null,
      number_of_pages: bookInfo ? bookInfo.get("number_of_pages") : null,
      age_restrictions: bookInfo ? bookInfo.get("age_restrictions") : null,
      year_of_publication: bookInfo ? bookInfo.get("year_of_publication") : null,
      publishing_house: bookInfo ? bookInfo.get("publishing_house") : null,
    };

    res.json(combinedBook);
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
    const books = await query.find();
    if (!books.length) {
      return res.status(404).send("Books not found");
    }
    res.json(books.map((book) => book.toJSON()));
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
