const Parse = require("../../config/parseConfig");

const addComment = async (req, res) => {
    const user = req.user; // Должно приходить из аутентификационного middleware
    const { book_id, content, rating } = req.body;

    if (!user) {
        return res.status(401).json({ error: "Unauthorized. Please log in to add a comment." });
    }

    if (!book_id || !content) {
        return res.status(400).json({ error: "Book ID and content are required." });
    }

    const Comments = Parse.Object.extend("comments");
    const comment = new Comments();

    // Устанавливаем значения полей
    comment.set("user_id", user.id);
    comment.set("book_id", book_id);
    comment.set("content", content);

    // Опциональная оценка (rating)
    if (rating !== undefined) {
        const numericRating = Number(rating);
        if (numericRating >= 1 && numericRating <= 5) {
            comment.set("rating", numericRating);
        } else {
            return res.status(400).json({ error: "Rating must be a number between 1 and 5." });
        }
    }

    try {
        const savedComment = await comment.save();
        res.status(201).json({ message: "Comment added successfully!", comment: savedComment.toJSON() });
    } catch (err) {
        console.error("Failed to add comment to database:", err);
        res.status(500).json({ error: "Failed to add comment to database" });
    }
};

const getCommentsByUserId = async (req, res) => {
    const { user_id } = req.params;
    const Comments = Parse.Object.extend("comments");
    const query = new Parse.Query(Comments);
    query.equalTo("user_id", user_id);

    try {
        const comments = await query.find();

        if (!comments.length) {
            return res.status(404).json({ error: "Comments not found for this user" });
        }

        const commentData = comments.map(comment => comment.toJSON());
        res.status(200).json(commentData);
    } catch (err) {
        console.error("Failed to retrieve comments:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const getCommentsByBookId = async (req, res) => {
    const { book_id } = req.params;
    const Comments = Parse.Object.extend("comments");
    const query = new Parse.Query(Comments);
    query.equalTo("book_id", book_id);

    try {
        const comments = await query.find();

        if (!comments.length) {
            return res.status(404).json({ error: "Comments not found for this book" });
        }

        const commentData = comments.map(comment => comment.toJSON());
        res.status(200).json(commentData);
    } catch (err) {
        console.error("Failed to retrieve comments:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = {
    getCommentsByUserId,
    getCommentsByBookId,
    addComment
};
