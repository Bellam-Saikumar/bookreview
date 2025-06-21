import React, { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar';
import {  Routes, Route } from 'react-router-dom';
import BooksPage from './pages/BooksPage/BooksPage';
import Home from './pages/Home/Home';
import Footer from './components/Footer/Footer';
import LoginPopup from './components/LoginPopup/LoginPopup';
import BookDetailPage from './pages/BookDetails/BookDetailPage';
import BookReviews from './pages/BookReviews/BookReviews';
import ProfilePage from './pages/Profile/ProfilePage';

function App() {
  const [showLogin, setShowLogin] = useState(false);
 const url="https://bookreview-backend-q0jw.onrender.com";

  return (
    <>
   {
  showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : null
}
    <div className="app">
      <Navbar setShowLogin={setShowLogin}/>

      <Routes>
        <Route path='/' element={<Home/>} />
       <Route path="/books" element={<BooksPage url={url} />} />
        <Route path="/book/:bookId" element={<BookDetailPage />} />
         <Route path="/profile" element={<ProfilePage />} />
      </Routes>
      <Footer />
    </div>
    </>
  )
}

export default App
