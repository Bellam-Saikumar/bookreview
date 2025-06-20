import React, { useContext, useState } from 'react';
import './Navbar.css';
import { book_assets } from '../../assets/assetsFinal';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';

function Navbar({ setShowLogin }) {
  const [menu, setMenu] = useState("home");
  const navigate = useNavigate();
  const { token, setToken } = useContext(StoreContext);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate('/');
     setMenu("home");
    setToken("");
  };

  return (
    <div className='navbar'>
      <Link to='/'>
        <img src={book_assets.logo} className="logo" alt="BookVerse Logo" />
      </Link>

      <ul className="navbar-menu">
        <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Home</Link>
       <a
  href="#"
  onClick={(e) => {
    e.preventDefault();
    if (!token) {
      alert("Please login to browse books.");
      setShowLogin(true);
    } else {
      setMenu("browse");
      navigate("/books");
    }
  }}
  className={menu === "browse" ? "active" : ""}
>
  Browse Books
</a>
        <a href='#app-download' onClick={() => setMenu("app")} className={menu === "app" ? "active" : ""}>Mobile App</a>
        <a href='#footer' onClick={() => setMenu("contact")} className={menu === "contact" ? "active" : ""}>Contact Us</a>
      </ul>

      <div className="navbar-right">
        {!token ? (
          <button onClick={() => setShowLogin(true)}>Sign In</button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="Profile" />
            <ul className="nav-profile-drop">
              <li onClick={() => navigate("/profile")}>
                <img src={assets.user_icon} alt="Profile" />
                <p>Profile</p>
              </li>
              <hr />
              <li onClick={handleLogout}>
                <img src={assets.logout_icon} alt="Logout"  />
                <p >Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
