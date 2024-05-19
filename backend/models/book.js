const { Schema, model } = require("mongoose");

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    hasDiscount: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

const Book = model("Book", bookSchema);

module.exports = Book;
