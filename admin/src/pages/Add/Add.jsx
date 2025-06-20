import React, { useState } from "react";
import './Add.css';
import { assets } from "../../assets/assets";
import axios from 'axios';
import { toast } from "react-toastify";

const Add = ({ url }) => {
  const [image, setImage] = useState(false);

  const [data, setData] = useState({
    title: "",
    author: "",
    description: "",
    category: "Fiction",
    rating: "",
    image:""
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("author", data.author);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("rating", Number(data.rating));
    formData.append("image", image);
    
    try {
      const response = await axios.post(`${url}/api/books/add`, formData);
      if (response.data.success) {
        setData({
          title: "",
          author: "",
          description: "",
          category: "Fiction",
          rating: "",
          image:"",
        });
        setImage(false);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch(error) {
      toast.error("Error submitting book data."+error);
    }
  };

  return (
    <div className="add">
      <form className="flex-call" onSubmit={onSubmitHandler}>
        <div className="add-image-upload flex-call">
          <p>Upload Book Cover</p>
          <label htmlFor="image">
            <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="upload" />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </div>

        <div className="add-product-name flex-col">
          <p>Book Title</p>
          <input
            type="text"
            name="title"
            value={data.title}
            onChange={onChangeHandler}
            placeholder="Enter book title"
            required
          />
        </div>

        <div className="add-product-name flex-col">
          <p>Author</p>
          <input
            type="text"
            name="author"
            value={data.author}
            onChange={onChangeHandler}
            placeholder="Enter author name"
            required
          />
        </div>

        <div className="add-product-description flex-col">
          <p>Description</p>
          <textarea
            name="description"
            rows="6"
            value={data.description}
            onChange={onChangeHandler}
            placeholder="Write description here"
            required
          ></textarea>
        </div>

        <div className="add-category-price">
          <div className="add-category">
            <p>Category</p>
            <select name="category" value={data.category} onChange={onChangeHandler}>
              <option value="Fiction">Fiction</option>
              <option value="Non-Fiction">Non-Fiction</option>
              <option value="Mystery">Mystery</option>
              <option value="Biography">Biography</option>
              <option value="Romance">Romance</option>
              <option value="Fantasy">Fantasy</option>
              <option value="Science Fiction">Science Fiction</option>
              <option value="Horror">Horror</option>
            </select>
          </div>

        </div>

        <div className="add-price flex-col">
          <p>Rating (0.0 - 5.0)</p>
          <input
            type="number"
            name="rating"
            value={data.rating}
            step="0.1"
            min="0"
            max="5"
            onChange={onChangeHandler}
            placeholder="e.g., 4.5"
            required
          />
        </div>

        <button type="submit" className="add-btn">ADD BOOK</button>
      </form>
    </div>
  );
};

export default Add;
