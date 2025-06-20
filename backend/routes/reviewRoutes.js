import express from 'express';
import { addReview, getReviewsByBookId } from '../controllers/reviewController.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.post('/reviews', addReview);; // POST /api/reviews
router.get('/book/:bookId', getReviewsByBookId); // ✅ GET /api/reviews/:bookId

export default router;
