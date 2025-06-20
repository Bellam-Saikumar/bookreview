import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BookReviews = ({ bookId, refresh }) => {
  const [reviews, setReviews] = useState([]);
  const url = "http://localhost:4000";

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(`${url}/api/book/${bookId}`);
        if (res.data.success) {
          setReviews(res.data.data);
        } else {
          console.error('Failed to load reviews');
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, [bookId, refresh]); // Add `refresh` dependency to re-fetch on submit

  return (
    <div style={{ marginTop: '20px' }}>
      <h3>Reviews</h3>
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        reviews.map((review) => (
          <div key={review._id} style={{
            border: '1px solid #ccc',
            padding: '10px',
            borderRadius: '8px',
            marginBottom: '10px',
            backgroundColor: '#f9f9f9'
          }}>
            <strong>{review.userName}</strong>
            <p>Rating: {review.rating} ⭐</p>
            <p>{review.comment}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default BookReviews;
