import express from 'express';
import multer from 'multer';
import { addBook, getAllBooks, getBookById,removeBook } from '../controllers/bookController.js';

const router = express.Router();

// Configure file upload
const storage = multer.diskStorage({
  destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null, `${Date.now()}${file.originalname}`)
    }
});
const upload = multer({ storage });

// Routes
router.post('/add', upload.single('image'), addBook);
router.post('/remove/',removeBook);
router.get('/', getAllBooks);       // GET /api/books
router.get('/:id', getBookById);     // GET /api/books/:id ✅ FIXED

export default router;
