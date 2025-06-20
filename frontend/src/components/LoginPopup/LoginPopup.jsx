import React, { useContext, useState } from "react";
import './LoginPopup.css';
import { assets } from "../../assets/assets";
import axios from 'axios';
import { StoreContext } from "../../Context/StoreContext";

const LoginPopup = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Login");
  const { url, setToken } = useContext(StoreContext);

  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData(prev => ({ ...prev, [name]: value.trimStart() }));
  };

  const onLogin = async (event) => {
    event.preventDefault();

    if (!agreed) {
      alert("⚠️ You must agree to the Terms of Use & Privacy Policy.");
      return;
    }

    const endpoint = currState === 'Login' ? '/api/user/login' : '/api/user/register';
    const newUrl = url + endpoint;
    setLoading(true);

    try {
      const response = await axios.post(newUrl, data, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.data.success) {
        if (currState === "Login") {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          setShowLogin(false);
        } else {
          alert("✅ Registration successful! Please log in.");
          setCurrState("Login");
          setData({ name: "", email: "", password: "" });
          setAgreed(false);
        }
      } else {
        alert("⚠️ " + (response.data.message || "Request failed"));
      }

    } catch (error) {
      if (error.response) {
        const message = error.response.data.message || "Request failed";
        console.error("Server Error:", message);

        if (message.toLowerCase().includes("user already exists")) {
          alert("❌ User already exists. Try logging in.");
        } else if (message.toLowerCase().includes("invalid")) {
          alert("❌ Invalid email or password.");
        } else {
          alert("❌ " + message);
        }
      } else if (error.request) {
        console.error("Network Error:", error.request);
        alert("❌ Network error. Please check your connection.");
      } else {
        console.error("Unexpected Error:", error.message);
        alert("❌ Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-pop">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt="Close"
            className="close-icon"
          />
        </div>

        <div className="login-popup-inputs">
          {currState === "Sign Up" && (
            <input
              type="text"
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              placeholder="Your Name"
              required
            />
          )}
          <input
            type="email"
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            placeholder="Your Email"
            required
          />
          <input
            type="password"
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            placeholder="Your Password"
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Please wait..." : (currState === 'Sign Up' ? "Create Account" : "Login")}
        </button>

        <div className="login-popup-condition">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
          />
          <span>By continuing, I agree to the Terms of Use & Privacy Policy.</span>
        </div>

        {currState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrState("Sign Up")}>Click Here</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
