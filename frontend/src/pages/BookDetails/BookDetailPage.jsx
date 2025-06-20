import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BookReviews from '../../pages/BookReviews/BookReviews';

const BookDetailPage = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);

  const [userName, setUserName] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [message, setMessage] = useState('');
  const [refreshReviews, setRefreshReviews] = useState(false);
const url="http://localhost:4000";
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`${url}/api/books/${bookId}`);
         console.log('Book API Response:', res.data);
        setBook(res.data.data);
      } catch (err) {
        console.error('Error fetching book details:', err);
      }
    };

    fetchBook();
  }, [bookId]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${url}/api/reviews`, {
        bookId,
        userName,
        rating,
        comment,
      });

      if (res.data.success) {
        setMessage("Review submitted successfully!");
        setUserName('');
        setRating(0);
        setComment('');
        setRefreshReviews((prev) => !prev);
      } else {
        setMessage("Failed to submit review.");
      }
    } catch (err) {
      console.error('Error submitting review:', err);
      setMessage("Error submitting review.");
    }
  };


  return (
    <div style={{ padding: '30px', maxWidth: '800px', margin: 'auto' }}>
      <h2 style={{ marginBottom: '25px'}}>Book Details</h2>

      {book ? (
        <>
          <div style={{
            display: 'flex',
            gap: '20px',
            marginBottom: '40px',
            alignItems: 'flex-start'
          }}>
            
          <img src={`${url}/uploads/${book.image}`} 
          alt={book.title}
          style={{ width: '180px', height: '250px', objectFit: 'cover', borderRadius: '10px' }}
            />

            <div style={{
               display: "flex",
              flexDirection: "column",
              gap: "10px"
            }}>
                <h3>{book.title}</h3>
                <p><strong>Author:</strong> {book.author}</p>
                <p><strong>Genre:</strong> {book.category}</p>
                <p><strong>Rating:</strong> {book.rating} ⭐</p>
                <p><strong>Description:</strong> {book.description}</p>
            </div>
          </div>

          {/* 🆕 Review Submission Form */}
          <div style={{
            marginBottom: '30px',
            padding: '20px',
            background: '#f9f9f9',
            border: '1px solid #ddd',
            borderRadius: '8px'
          }}>
            <h3 style={{marginBottom:"6px"}}>Submit a Review</h3>
            <form onSubmit={handleReviewSubmit}>
              <input
                type="text"
                placeholder="Your Name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
                style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
              />

              {/* 🆕 Dropdown for Rating */}
              <select
                value={rating}
                onChange={(e) => setRating(parseFloat(e.target.value))}
                required
                style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
              >
                <option value="">Select Rating</option>
                <option value="1">1 ⭐</option>
                <option value="2">2 ⭐⭐</option>
                <option value="3">3 ⭐⭐⭐</option>
                <option value="4">4 ⭐⭐⭐⭐</option>
                <option value="5">5 ⭐⭐⭐⭐⭐</option>
              </select>

              <textarea
                placeholder="Write your review"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
                rows={4}
                style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
              />

              <button type="submit" style={{ padding: '10px 20px' }}>Submit</button>
            </form>

            {message && (
              <p style={{ marginTop: '10px', color: message.includes("success") ? "green" : "red" }}>
                {message}
              </p>
            )}
          </div>

          {/* ✅ Display Reviews */}
          <BookReviews bookId={bookId} refresh={refreshReviews} />
        </>
      ) : (
        <p>Loading book details...</p>
      )}
    </div>
  );
};

export default BookDetailPage;
