const jwt = require('jsonwebtoken');
const Parse = require("../../config/parseConfig");
const {getUserById} = require("../user/userControllers");

const getCartByUserId = async (req, res) => {
    const userId = req.user.id;

    const Cart = Parse.Object.extend("cart_books");
    const query = new Parse.Query(Cart);
    query.equalTo("userId", userId);

    try {
        const carts = await query.find();

        if (!carts.length) {
            return res.status(404).send("Cart not found");
        }

        const cartData = carts.map(cart => cart.toJSON());
        res.json(cartData);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Server Error");
    }
};

const deleteBookFromCartById = async (req, res) => {
    const userId = req.user.id;
    const { bookId } = req.params;

    if (!bookId) {
        return res.status(400).json({ error: "BookId is required" });
    }

    const Cart = Parse.Object.extend("cart_books");
    const query = new Parse.Query(Cart);
    query.equalTo("userId", userId);
    query.equalTo("bookId", bookId);

    try {
        const cartItem = await query.first();

        if (!cartItem) {
            return res.status(404).send("Cart item not found");
        }

        await cartItem.destroy();
        res.json({ message: "Book removed from cart successfully!" });

    } catch (err) {
        console.error("Failed to remove book from cart:", err);
        res.status(500).json({ error: "Failed to remove book from cart" });
    }
};


const addBookToCartByUser = async (req, res) => {
    const {bookId, count = 1, isBought = false} = req.body;
    const userId = req.user.id
    if (!userId) {
        return res.status(400).json({error: "UserId is required"});
    }
    if (!bookId) {
        return res.status(400).json({error: "BookId is required"});
    }

    const Cart = Parse.Object.extend("cart_books");
    const cartQuery = new Parse.Query(Cart);

    try {
        cartQuery.equalTo("userId", userId);
        cartQuery.equalTo("bookId", bookId);
        let cartItem = await cartQuery.first();

        if (cartItem) {
            // Update count if cart item exists
            cartItem.increment("count", count);
        } else {
            // Create new cart item if it doesn't exist
            cartItem = new Cart();
            cartItem.set("bookId", bookId);
            cartItem.set("userId", userId);
            cartItem.set("count", count);
            cartItem.set("isBought", isBought);
        }

        const result = await cartItem.save();
        res.json({message: "Book added to cart successfully!", cart: result.toJSON()});
    } catch (err) {
        console.error("Failed to add book to cart:", err);
        res.status(500).json({error: "Failed to add book to cart"});
    }
};

module.exports = {
    getCartByUserId,
    addBookToCartByUser,
    deleteBookFromCartById
};
