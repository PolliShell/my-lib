const Parse = require("../../config/parseConfig");

const nodemailer = require("nodemailer");

const getCartByUser = async (req, res) => {
  const userId = req.user.id;

  try {
    const CartBooks = Parse.Object.extend("cart_books");
    const cartBooks = await new Parse.Query(CartBooks)
      .equalTo("userId", userId)
      .equalTo("isBought", false)
      .find();

    if (!cartBooks.length) {
      return res.status(200).json([]);
    }

    const bookIds = cartBooks.map((b) => b.get("bookId"));

    const Books = Parse.Object.extend("books");
    const books = await new Parse.Query(Books)
      .containedIn("objectId", bookIds)
      .find();

    res.status(200).json(books);
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ error: err.message });
  }
};

const deleteCartBookById = async (req, res) => {
  const userId = req.user.id;
  const { bookId } = req.params;

  if (!bookId) {
    return res.status(400).json({ error: "BookId is required" });
  }

  try {
    const Cart = Parse.Object.extend("cart_books");
    const query = new Parse.Query(Cart)
      .equalTo("userId", userId)
      .equalTo("bookId", bookId)
      .equalTo("isBought", false);
    const cartItem = await query.first();

    if (!cartItem) {
      return res.status(404).send("Cart item not found");
    }

    await cartItem.destroy();
    res.json({ status: true, message: "Book removed from cart successfully!" });
  } catch (err) {
    console.error("Failed to remove book from cart:", err.message);
    res.status(500).json({ error: "Failed to remove book from cart" });
  }
};

const addCartBookByUser = async (req, res) => {
  const { bookId } = req.body;
  const userId = req.user.id;

  if (!userId) {
    return res.status(400).json({ error: "UserId is required" });
  }
  if (!bookId) {
    return res.status(400).json({ error: "BookId is required" });
  }

  try {
    const Cart = Parse.Object.extend("cart_books");
    const isExists = await new Parse.Query(Cart)
      .equalTo("userId", userId)
      .equalTo("bookId", bookId)
      .equalTo("isBought", false)
      .first();

    if (isExists) {
      return res
        .status(400)
        .json({ status: false, error: "Book is already in the cart" });
    }

    const cartItem = await new Cart()
      .set("bookId", bookId)
      .set("userId", userId)
      .set("count", 1)
      .set("isBought", false)
      .save();

    res.json({
      status: true,
      message: "Book added to cart successfully!",
      cart: cartItem.toJSON(),
    });
  } catch (err) {
    console.error("Failed to add book to cart:", err);
    res.status(500).json({ error: err.message });
  }
};

const purchaseBooks = async (req, res) => {
  const userId = req.user.id;

  try {
    const Cart = Parse.Object.extend("cart_books");
    const cartBooks = await new Parse.Query(Cart)
      .equalTo("userId", userId)
      .find();

    if (!cartBooks.length) {
      return res.status(404).send("No books in cart");
    }

    const bookIds = cartBooks.map((b) => b.get("bookId"));

    const Books = Parse.Object.extend("books");
    const books = await new Parse.Query(Books)
      .containedIn("objectId", bookIds)
      .find();

    // update cartBooks bought status
    await Promise.all(
      cartBooks.map(async (b) => {
        b.set("isBought", true);
        return b.save();
      })
    );

    const user = await getUserById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    await sendPurchaseConfirmationEmail(req.user.email, books);

    res.json({ status: true, message: "Successful purchase!" });
  } catch (e) {
    console.error("Failed to purchase books:", e.message);
    res.status(500).json({ error: "Failed to purchase books" });
  }
};

const getUserById = async (userId) => {
  try {
    const query = new Parse.Query(Parse.User);
    const user = await query.get(userId);

    return user;
  } catch (error) {
    console.error(
      `Ошибка при получении пользователя с ID ${userId}: ${error.message}`
    );
    throw error;
  }
};

const sendPurchaseConfirmationEmail = async (userEmail, books) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const booksList = books
    .map(
      (book) => `Title: ${book.get("title")}, Price: ${book.get("price")} грн`
    )
    .join("\n");

  const mailOptions = {
    from: process.env.SMTP_EMAIL,
    to: userEmail,
    subject: "Purchase Confirmation",
    text: `Thank you for your purchase!\n\nYour purchased books:\n${booksList}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Purchase confirmation email sent to:", userEmail);
  } catch (err) {
    console.error("Failed to send email:", err);
  }
};

const getPurchasedBooksByUser = async (req, res) => {
  const userId = req.user.id;

  try {
    const CartBooks = Parse.Object.extend("cart_books");
    const query = new Parse.Query(CartBooks)
      .equalTo("userId", userId)
      .equalTo("isBought", true);

    const purchasedCartBooks = await query.find();

    if (!purchasedCartBooks.length) {
      return res.status(200).json([]);
    }

    const bookIds = purchasedCartBooks.map((b) => b.get("bookId"));

    const Books = Parse.Object.extend("books");
    const query2 = new Parse.Query(Books).containedIn("objectId", bookIds);
    const purchasedBooks = await query2.find();

    res.status(200).json(purchasedBooks.map((book) => book.toJSON()));
  } catch (err) {
    console.error("Failed to retrieve purchased books:", err.message);
    res.status(500).send({ error: err.message });
  }
};

module.exports = {
  getCartByUser,
  addCartBookByUser,
  deleteCartBookById,
  purchaseBooks,
  getPurchasedBooksByUser,
};
