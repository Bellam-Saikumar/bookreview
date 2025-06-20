# 📚 Book Review Platform


A full-stack Book Review Platform where users can browse books, read and write reviews, and rate books. This application is built using React.js for the frontend and Node.js (Express) with MongoDB for the backend.

## 🚀 Features
## 🌐 Frontend (React)
Home page showcasing featured books
Book listing page with search and category filters
Individual book details page with reviews and ratings
User profile page with editable information
Review submission form with validation
State management using React Context API
Routing using React Router
Integrated API calls to backend with loading and error states

## 🔧 Backend (Node.js, Express, MongoDB)
RESTful API endpoints for books, reviews, and user profiles
Book management (CRUD, admin protected)
Review submission and fetching
User profile retrieval and updates
Data validation using middleware
Error handling for all API routes

## 🧪 API Endpoints

### 📘 Book Endpoints
GET /api/books — Retrieve all books (with pagination) <br>
GET /api/books/:id — Retrieve a single book <br>
POST /api/books — Add a new book (admin only) <br>

### 📝 Review Endpoints
GET /api/reviews?bookId=BOOK_ID — Get reviews for a book <br>
POST /api/reviews — Submit a new review <br>

### 👤 User Endpoints
GET /api/users/:id — Retrieve a user profile <br>
PUT /api/users/:id — Update a user profile <br>

### ⚙️ Setup Instructions
📌 Prerequisites <br>
Node.js and npm <br>
MongoDB (local or Atlas) <br>
Git

### 💻 Frontend Setup & Admin
cd frontend/admin <br>
npm install <br>
npm run dev

### 🛠️ Backend Setup
cd backned <br>
npm install <br>
npm start

# 📷 Screenshots (Optional)
Include screenshots of your home page, book listing, book detail page, and review submission form here.

![Screenshot 2025-06-20 232107](https://github.com/user-attachments/assets/f3b62e09-e7de-4e5a-82eb-68d67583cbf5)

![Screenshot 2025-06-20 231257](https://github.com/user-attachments/assets/ba60cd91-51e8-4c3e-8d12-c9b07f077aa0)

![Screenshot 2025-06-20 232353](https://github.com/user-attachments/assets/b379a866-9a79-4726-867f-76f8caeeeb6e)

![Screenshot 2025-06-20 231834](https://github.com/user-attachments/assets/78958183-80db-41fb-b589-86ffdf844d6f)

![Screenshot 2025-06-20 231849](https://github.com/user-attachments/assets/4f8cfb1d-d73c-4704-90ae-c322b1e1b8b9)

![Screenshot 2025-06-20 232003](https://github.com/user-attachments/assets/475ffa44-01b5-4fd9-9737-49f8bfab6091)

![Screenshot 2025-06-20 232003](https://github.com/user-attachments/assets/9b0c5e74-9d43-4e4c-90cd-a78f1adb2540)

![Screenshot 2025-06-20 232042](https://github.com/user-attachments/assets/faccb8bf-debe-41c9-bcb0-25350b3dba7f)

![Screenshot 2025-06-20 232107](https://github.com/user-attachments/assets/afd7f39a-e71a-4622-a6b9-0c2ba9eb9421)

## Admin
![Screenshot 2025-06-20 231623](https://github.com/user-attachments/assets/8f952ec8-27da-4291-98d8-81089c79c24a)

![Screenshot 2025-06-20 231639](https://github.com/user-attachments/assets/7c744f13-1bdf-405e-aefc-f0121f8abedc)

# 🖥️ Live Demo
🔗 Deployed App <br>
Frontend: https://bookreview-frontend-94pa.onrender.com/ <br>
Admin: https://bookreview-admin.onrender.com/add















