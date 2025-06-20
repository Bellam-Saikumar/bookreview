import reviewModel from "../models/reviewModel.js";

// Submit a new review
export const addReview = async (req, res) => {
  try {
    const { bookId, userName, rating, comment } = req.body;
    
    if (!bookId || !userName || !rating || !comment) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const review = new reviewModel({
      bookId,
      userName,
      rating,
      comment,
    });

    await review.save();
    res.json({ success: true, message: "Review added successfully" });
  } catch (err) {
    console.error("Add review error:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};



// Get all reviews for a book
export const getReviewsByBookId = async (req, res) => {
  const { bookId } = req.params;

  if (!bookId || bookId.length !== 24) {
    return res.status(400).json({ success: false, message: "Invalid bookId" });
  }

  try {
    const reviews = await reviewModel.find({ bookId });
    res.json({ success: true, data: reviews });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

