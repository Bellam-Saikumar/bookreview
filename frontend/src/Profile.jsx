import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { StoreContext } from "../../Context/StoreContext";

const ProfilePage = () => {
  const { url, token } = useContext(StoreContext);
  const [profile, setProfile] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(true);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${url}/api/user/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProfile(res.data);
      } catch (err) {
        console.error("Error fetching profile", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [url, token]);

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.put(
        `${url}/api/user/update-password`,
        { currentPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        setMessage("Password updated successfully.");
        setCurrentPassword("");
        setNewPassword("");
      } else {
        setMessage("Failed to update password.");
      }
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Error updating password.");
    }
  };

  if (loading) return <p>Loading profile...</p>;

  return (
    <div style={{ padding: "30px", maxWidth: "500px", margin: "auto" }}>
      <h2>User Profile</h2>
      <p><strong>Username:</strong> {profile.name}</p>
      <p><strong>Email:</strong> {profile.email}</p>

      <hr style={{ margin: "20px 0" }} />

      <h3  style={{ marginBottom: "px"}}>Update Password</h3>
      <form onSubmit={handlePasswordUpdate}>
        <input
          type="password"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
          style={{ width: "100%", marginBottom: "10px", padding: "10px" }}
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          style={{ width: "100%", marginBottom: "10px", padding: "10px" }}
        />
        <button type="submit" style={{ padding: "10px 20px" }}>
          Update Password
        </button>
      </form>

      {message && (
        <p style={{ color: message.startsWith("✅") ? "green" : "red", marginTop: "10px" }}>
          {message}
        </p>
      )}
    </div>
  );
};

export default ProfilePage;
