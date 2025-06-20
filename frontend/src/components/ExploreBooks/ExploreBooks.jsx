import React from "react";
import './ExploreBooks.css';
// import { assets } from "../../assets/assets";

function ExploreBooks() {
    const categories = [
        {
            name: "Fiction",
            description: "Explore imaginative worlds and unforgettable characters in our fiction collection.",
           
        },
        {
            name: "Non-Fiction",
            description: "Discover books that inform, educate, and inspire with real-world knowledge.",
            
        },
        {
            name: "Mystery & Thriller",
            description: "Dive into suspenseful stories packed with twists and intrigue.",
           
        },
        {
            name: "Romance",
            description: "Get swept away by heartfelt tales of love and relationships.",
           
        },
        {
            name: "Science Fiction",
            description: "Step into futuristic and alternate worlds with thrilling sci-fi adventures.",
           
        }
    ];
    const bgColors = ["#FFE0B2", "#E1BEE7", "#C8E6C9", "#BBDEFB", "#FFCDD2"];
    
    return (
        <div className="explore-menu" id="explore-menu">
            <h1>Explore Our Categories</h1>
            <p className="explore-menu-text">
                Discover books across a wide range of genres. Whether you're into gripping thrillers, heartwarming romance, thought-provoking non-fiction, or magical adventures — we have something for every reader.
            </p>

           <div className="explore-menu-scroller">
                <div className="explore-menu-track">
                    {[...categories, ...categories].map((cat, index) => (
                <div key={index} className="explore-menu-card"
                 style={{ backgroundColor: bgColors[index % bgColors.length] }}
                >
                    <h3>{cat.name}</h3>
                    <p>{cat.description}</p>
                </div>
                ))}
                </div>
                </div>
            <hr />
        </div>
    );
}

export default ExploreBooks;
