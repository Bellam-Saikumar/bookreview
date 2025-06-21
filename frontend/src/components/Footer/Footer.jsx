import './Footer.css';
import { book_assets } from "../../assets/assetsFinal";

const Footer = () => {
  return (
    <>
      <div className="footer" id="footer">
        <div className="footer-content">

          {/* Left Section */}
          <div className="footer-content-left">
            <img
              src={book_assets.logo}
              alt="logo"
              className="footer-logo"
            />
            <p>
              At bookstore.com, we bring your favorite dishes from the best
              restaurants in town directly to your doorstep. Enjoy fast delivery,
              reliable service, and a wide variety of cuisines — all in one place.
            </p>
            <div className="footer-social-icons">
              <img src={book_assets.facebook_icon} alt="facebook" className="social-icon" />
              <img src={book_assets.twitter_icon} alt="twitter" className="social-icon" />
              <img src={book_assets.linkedin_icon} alt="linkedin" className="social-icon" />
            </div>
          </div>

          {/* Center Section */}
          <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
              <li>Home</li>
              <li>Books</li>
              <li>About us</li>
              <li>Privacy Policy</li>
            </ul>
          </div>

          {/* Right Section */}
          <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
              <li>(+91) 14547-98754</li>
              <li>contact@tomato.com</li>
            </ul>
          </div>
        </div>

        <hr />
        <p className="footer-copyright">
          Copyright &copy; 2025 bookstore.com - All Rights Reserved.
        </p>
      </div>
    </>
  );
};

export default Footer;
