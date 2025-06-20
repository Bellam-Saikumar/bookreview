import React, { useEffect, useState } from 'react';
import './FeatureBooks.css';
import axios from 'axios';

function FeatureBooks({ category, url }) {
  const [books, setBooks] = useState([]);

  const fetchFeaturedBooks = async () => {
  try {
    const res = await axios.get(`${url}/api/books`);
    console.log("Books API response:", res.data); // ✅ Debug here

    if (res.data.success) {
      let filteredBooks = res.data.data;
      if (category && category !== "All") {
        filteredBooks = filteredBooks.filter(book => book.category === category);
      }
      setBooks(filteredBooks.slice(0, 3));
    }
  } catch (error) {
    console.error("Error fetching featured books:", error);
  }
};


  useEffect(() => {
    fetchFeaturedBooks();
  }, [category]); // refetch when category changes

  return (
    <div className="featured-books">
      <h2>{category === "All" ? "Featured Books" : `Top Books in ${category}`}</h2>
      <div className="book-list">
        {books.length > 0 ? (
          books.map((book) => (
            <div className="book-card" key={book._id}>
              <img src={`${url}/uploads/${book.image}`} alt={book.title} className="book-image" />
              <div className="book-info">
                <h3>{book.title}</h3>
                <p className="author">by {book.author}</p>
                <p className="category">{book.category}</p>
                <p className="description">{book.description}</p>
                <div className="bottom-row">
                  <span className="rating">⭐ {book.rating}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No books available in this category.</p>
        )}
      </div>
    </div>
  );
}

export default FeatureBooks;
