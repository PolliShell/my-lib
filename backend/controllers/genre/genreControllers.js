const Parse = require("../../config/parseConfig");

const {getAuthorById} = require("../author/authorControllers");
const getAll = async (req, res) => {
    const Genres = Parse.Object.extend("genres");
    const query = new Parse.Query(Genres);
    try {
        const genres = await query.find();

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
    const genre = req.params.genre;

    const BooksInfo = Parse.Object.extend('books_info');
    const query = new Parse.Query(BooksInfo);
    query.containedIn('genres', [genre]);

    try {
        const booksInfoResults = await query.find();

        const bookIds = booksInfoResults.map((bookInfo) => bookInfo.get('book_id'));

        const Books = Parse.Object.extend('books');
        const bookQuery = new Parse.Query(Books);
        bookQuery.containedIn('objectId', bookIds);

        const booksResults = await bookQuery.find();

        res.status(200).json(booksResults);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports={
    getBooksByGenre,
    getAll,
}