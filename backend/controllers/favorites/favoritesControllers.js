const Parse = require("../../config/parseConfig");

const getFavorites = async (req, res) => {
  const userId = req.user.id;

  try {
    const FavBooks = Parse.Object.extend("fav_books");
    const query = new Parse.Query(FavBooks).equalTo("userId", userId);
    const favBooks = await query.find();

    const bookIds = favBooks.map((b) => b.get("bookId"));

    const Books = Parse.Object.extend("books");
    const query2 = new Parse.Query(Books).containedIn("objectId", bookIds);
    const mappedBooks = await query2.find();

    res.status(200).json(mappedBooks);
  } catch (err) {
    console.error("Failed to fetch favorites:", err);
    res
      .status(500)
      .json({ error: "Failed to fetch favorites:", message: err.message });
  }
};

const addBookToFavorites = async (req, res) => {
  const userId = req.user.id;
  const { bookId } = req.body;

  if (!bookId) {
    return res.status(400).json({ error: "Book ID is required" });
  }

  try {
    const FavBook = Parse.Object.extend("fav_books");
    const query = new Parse.Query(FavBook)
      .equalTo("userId", userId)
      .equalTo("bookId", bookId);
    const existingFav = await query.first();

    if (existingFav) {
      return res.status(400).json({ error: "Book is already in favorites" });
    }

    const favBook = new FavBook();
    favBook.set("userId", userId);
    favBook.set("bookId", bookId);

    await favBook.save();

    res.status(201).json({ status: true, message: "Book added to favorites" });
  } catch (err) {
    console.error("Failed to add book to favorites:", err);
    res.status(500).json({ error: "Failed to add book to favorites" });
  }
};

const removeBookFromFavorites = async (req, res) => {
  const userId = req.user.id;
  const { bookId } = req.params;

  if (!bookId) {
    return res.status(400).json({ error: "Book ID is required" });
  }

  try {
    const FavBook = Parse.Object.extend("fav_books");
    const query = new Parse.Query(FavBook)
      .equalTo("userId", userId)
      .equalTo("bookId", bookId);
    const favBook = await query.first();

    if (!favBook) {
      return res.status(404).json({ error: "Book not found in favorites" });
    }

    await favBook.destroy();

    res
      .status(200)
      .json({ status: true, message: "Book removed from favorites" });
  } catch (err) {
    console.error("Failed to remove book from favorites:", err);
    res.status(500).json({ error: "Failed to remove book from favorites" });
  }
};

module.exports = {
  getFavorites,
  addBookToFavorites,
  removeBookFromFavorites,
};
