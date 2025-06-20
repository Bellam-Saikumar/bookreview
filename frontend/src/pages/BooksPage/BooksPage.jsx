import React, { useEffect, useState } from 'react';
import './BooksPage.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BooksPage = ({ url }) => {
  const navigate = useNavigate();
  

  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Fetch books from backend
  const fetchBooks = async () => {
    try {
      const res = await axios.get(`${url}/api/books`);
      if (res.data.success) {
        setBooks(res.data.data);
      } else {
        console.error("Failed to fetch books");
      }
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleBookClick = (id) => {
    // if (isLoggedIn) {
    //   navigate(`/book/${id}`);
    // } else {
    //   alert("Please log in to view book details.");
    //   navigate('/login');
    // }
    navigate(`/book/${id}`);
  };

  const allCategories = ['All', ...new Set(books.map(book => book.category))];

  const filteredBooks = books.filter(book => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || book.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="books-page">
      <h2>Explore Books</h2>

      <div className="books-controls">
        <input
          type="text"
          placeholder="Search by Title or Author or Category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {allCategories.map((cat, index) => (
            <option key={index} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="books-grid">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <div
              key={book._id}  
              className="book-card"
              onClick={() => handleBookClick(book._id)} 
              >
            
              <img src={`${url}/uploads/${book.image}`} alt={book.title} />
              <h3>{book.title}</h3>
              <p className="author">by {book.author}</p>
              <p className="category">{book.category}</p>
              <p className="rating">⭐ {book.rating}</p>
            </div>
          ))
        ) : (
          <p>No books match your search or category.</p>
        )}
      </div>
    </div>
  );
};

export default BooksPage;
