const db = require('../../config/db');
const {pool} = require("../../config/db");

const getAll = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM fandom');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};

const getById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query('SELECT * FROM fandom WHERE id = $1', [id]);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};

const getFandomByAuthorId = async (req, res) => {
    const { author_id } = req.params;
    console.log(`Requested seller_id: ${author_id}`);
    try {
        const result = await db.query('SELECT * FROM fandom WHERE author_id = $1', [author_id]);
        console.log(`SQL Query Result:`, result.rows);
        res.json({ books: result.rows });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};

const addFandom = async (req, res) => {
    const { title, description, cover_img, author_id } = req.body;
    if (!author_id) {
        return res.status(400).json({ error: 'Author is required' });
    }

    if (!req.file || !req.file.location) {
        return res.status(400).json({ error: 'Cover image is required' });
    }
    const coverImageUrl = req.file.location;

    try {
        const result = await addFandomToDatabase(title, description, cover_img, coverImageUrl, author_id);
        console.log('Fandom added to database:', result);
        res.json({ message: 'Fandom added successfully!', book: result });
    } catch (error) {
        console.error('Failed to add fandom to database:', error);
        res.status(500).json({ error: 'Failed to add fandom to database' });
    }
};

async function addFandomToDatabase(title, description, cover_img, author_id) {
    const query = {
        text: 'INSERT INTO book (title, description,cover_img, author_id) VALUES ($1, $2, $3, $4) RETURNING *',
        values: [title, description, cover_img, author_id],
    };

    try {
        const result = await pool.query(query);
        return result.rows[0];
    } catch (error) {
        console.error('Error adding fandom to database:', error);
        throw error;
    }
}

module.exports={
    getAll,
    getById,
    getFandomByAuthorId,
    addFandom,
}