import mongoose from "mongoose";

export const connectDB =async() => {
    await mongoose.connect("mongodb+srv://admin:admin@cluster0.xexqzg8.mongodb.net/BookReview").then(()=>console.log('DB connected'));
    
}