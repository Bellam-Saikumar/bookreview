import React, { useEffect, useState } from "react";
import './List.css';
import axios from "axios";
import { toast } from "react-toastify";

const List = ({ url }) => {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    try {
      const response = await axios.get(`${url}/api/books`);
      if (response.data.success) {
        setBooks(response.data.data);
      } else {
        toast.error("Failed to fetch books");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

const removeBook = async (bookId) => {
  try {
    const response = await axios.post(`${url}/api/books/remove`, { id: bookId });
    if (response.data.success) {
      toast.success(response.data.message);
      fetchBooks(); // refresh list
    } else {
      toast.error(response.data.message || "Failed to delete book");
    }
  } catch (error) {
    console.error("❌ Error deleting book:", error);
    toast.error("Something went wrong");
  }
};

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="list add flex-col">
      <p>All Books</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Cover</b>
          <b>Title</b>
          <b>Author</b>
          <b>Category</b>
          <b>Rating</b>
          <b>Action</b>
        </div>
        {books.map((book, index) => (
          <div key={index} className="list-table-format">
            <img src={`${url}/uploads/` + book.image} alt={book.title} />
            <p>{book.title}</p>
            <p>{book.author}</p>
            <p>{book.category}</p>
            <p>{book.rating}</p>
            <p className="delete-btn" onClick={() => removeBook(book._id)}>×</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
