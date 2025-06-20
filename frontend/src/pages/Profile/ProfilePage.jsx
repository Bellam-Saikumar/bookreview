import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // ✅ named import
import { StoreContext } from "../../Context/StoreContext";

const ProfilePage = () => {
  const { url, token } = useContext(StoreContext);

  const [profile, setProfile] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(true);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  // ✅ Decode user ID from token
  let userId = "";
  try {
    const decoded = jwtDecode(token);
    userId = decoded.id || decoded._id || decoded.userId;
  } catch (error) {
    console.error("Invalid or expired token:", error);
  }

  // ✅ Fetch profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      if (!userId) {
        setMessage("❌ Invalid token. Please log in again.");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(`${url}/api/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.data.success) {
          setProfile(res.data.user);
        } else {
          setMessage("❌ Failed to load profile.");
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        setMessage("❌ Error fetching profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [url, token, userId]);

  // ✅ Handle password update
  const handlePasswordUpdate = async (e) => {
  e.preventDefault();
  setMessage("");

  try {
    const res = await axios.put(
      `${url}/api/users/${userId}`,
      {
        currentPassword,
        newPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (res.data.success) {
      setMessage("✅ Password updated successfully.");
      setCurrentPassword("");
      setNewPassword("");
    } else {
      setMessage("❌ " + (res.data.message || "Failed to update password."));
    }
  } catch (err) {
    const errorMsg = err.response?.data?.message || "❌ Error updating password.";
    console.error("Password update error:", err);
    setMessage("❌ " + errorMsg);
  }
};


  if (loading) return <p>Loading profile...</p>;

  return (
    <div style={{ padding: "30px", maxWidth: "500px", margin: "0 auto" }}>
      <h2 style={{ marginBottom: "25px", color:"blue", textAlign:"center", fontSize:"30px"}}>User Profile</h2>
      <p style={{ marginBottom: "10px",fontSize:"20px"}}><strong>Username:</strong> {profile.name}</p>
      <p style={{ marginBottom: "10px", fontSize:"20px"}}><strong>Email:</strong> {profile.email}</p>

      <hr style={{ margin: "30px 0" }} />

      <h3  style={{ marginBottom: "20px"}}>Update Password</h3>
      <form onSubmit={handlePasswordUpdate}>
        <input
          type="password"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />
        <button
          type="submit"
          style={{ padding: "10px 20px", cursor: "pointer" }}
        >
          Update Password
        </button>
      </form>

      {message && (
        <p
          style={{
            color: message.startsWith("✅") ? "green" : "red",
            marginTop: "15px",
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default ProfilePage;
