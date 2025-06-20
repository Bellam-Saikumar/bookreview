import React from "react";
import './Header.css';
import { book_assets } from "../../assets/assetsFinal";

function Header() {
    return (
        <div className="header">
            <div className="header-contents">
                <h2>Discover & Review Your Next Favorite Book</h2>
                <p>
                    Explore a vast collection of books across various genres, read honest reviews from fellow readers, and share your own thoughts. 
                    Whether you're into thrillers, romance, fantasy, or non-fiction — your next great read is just a click away.
                </p>
                <button>Browse Books</button>
            </div>
            <div className="header-image">
        <img src={book_assets.comic_home} alt="Book Cover" />
      </div>
        </div>
    )
}

export default Header;
