const Parse = require("../../config/parseConfig");

const addBookToFavorites = async (req, res) => {
    const userId = req.user.id;
    const { bookId } = req.body;

    if (!bookId) {
        return res.status(400).json({ error: "Book ID is required" });
    }

    const FavBook = Parse.Object.extend("fav_books");
    const query = new Parse.Query(FavBook);
    query.equalTo("userId", userId);
    query.equalTo("bookId", bookId);

    try {
        const existingFav = await query.first();

        if (existingFav) {
            return res.status(400).json({ error: "Book is already in favorites" });
        }

        const favBook = new FavBook();
        favBook.set("userId", userId);
        favBook.set("bookId", bookId);

        await favBook.save();
        res.status(201).json({ message: "Book added to favorites" });
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

    const FavBook = Parse.Object.extend("fav_books");
    const query = new Parse.Query(FavBook);
    query.equalTo("userId", userId);
    query.equalTo("bookId", bookId);

    try {
        const favBook = await query.first();

        if (!favBook) {
            return res.status(404).json({ error: "Book not found in favorites" });
        }

        await favBook.destroy();
        res.json({ message: "Book removed from favorites" });
    } catch (err) {
        console.error("Failed to remove book from favorites:", err);
        res.status(500).json({ error: "Failed to remove book from favorites" });
    }
};

module.exports = {
    addBookToFavorites,
    removeBookFromFavorites
};
