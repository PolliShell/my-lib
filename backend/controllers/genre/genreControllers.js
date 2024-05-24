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

module.exports={
    getAll,
}