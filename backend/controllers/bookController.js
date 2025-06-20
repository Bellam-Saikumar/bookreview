import bookModel from '../models/bookModel.js';
import path from "path";
import fs from "fs";

// Add a new book (admin only)
const addBook = async (req, res) => {
   try {
    const { title, author, description, category, rating } = req.body;
    let image = req.file?.filename;

    if (!title || !author || !description || !category || !rating || !image) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }
    const newBook = new bookModel({
      title,
      author,
      description,
      category,
      rating,
      image
    });
    await newBook.save();

    res.json({ success: true, message: "Book added successfully", data: newBook });
  } catch (error) {
    console.error("Error in addBook:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};




const getAllBooks = async (req, res) => {
try {
    const books = await bookModel.find();
    res.status(200).json({ success: true, data: books });
  } catch (error) {
    console.error("getAllBooks error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Get a book by ID
const getBookById = async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await bookModel.findById(bookId);
    if (!book) {
      return res.status(404).json({ success: false, message: "Book not found" });
    }
    res.json({ success: true, data: book });
  } catch (error) {
    console.error("Error in getBookById:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};



export const removeBook = async (req, res) => {
  try {
    const { id } = req.body;
    console.log("📩 Delete Book Request Body:", req.body);

    if (!id) {
      return res.status(400).json({ success: false, message: "Book ID is required" });
    }
    const book = await bookModel.findById(id);
    if (!book) {
      return res.status(404).json({ success: false, message: "Book not found" });
    }
    const imagePath = path.join("uploads", book.image);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
    await bookModel.findByIdAndDelete(id);
    res.json({ success: true, message: "Book removed successfully" });
  } catch (error) {
    console.error("Error in removeBook:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export { addBook, getAllBooks, getBookById };
