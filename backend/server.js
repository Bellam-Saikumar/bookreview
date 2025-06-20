import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import userRouter from './routes/userRoutes.js';
import bookRouter from './routes/bookRoutes.js';
import reviewRouter from './routes/reviewRoutes.js';
import 'dotenv/config';

// App config
const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(cors({
   origin: process.env.ALLOWED_ORIGINS.split(','),
  credentials: true
}));
app.use(express.json());
app.use("/uploads", express.static("uploads")); // serve images

// DB Connection
connectDB();

// API Routes
app.use("/api", userRouter);         // login, register, profile update
app.use("/api/books", bookRouter);        // book add/list/get
app.use('/api', reviewRouter);


// Root route
app.get('/', (req, res) => {
    res.send("Book Review API is running.");
});

// Start server
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
