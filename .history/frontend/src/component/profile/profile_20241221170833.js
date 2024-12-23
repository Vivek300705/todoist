import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Get the token from localStorage
    const token = localStorage.getItem("accessToken");

    if (!token) {
      setError("No token found. Please log in.");
      return;
    }

    // Fetch user profile from the server
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/profile", {
          headers: {
            Authorization: `Bearer ${token}`, // Sending token in Authorization header
          },
        });

        if (response.status === 200) {
          // Set profile data
          setProfile(response.data.profile);
        }
      } catch (err) {
        // Handle errors if token is invalid or expired
        if (err.response && err.response.data) {
          setError(err.response.data.message || "Failed to fetch profile.");
        } else {
          setError("An error occurred. Please try again.");
        }
      }
    };

    fetchProfile();
  }, []); // Run only once when the component mounts

  // If there's an error, show it
  if (error) {
    return <div className="error">{error}</div>;
  }

  // If the profile is still loading
  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile">
      <h2>User Profile</h2>
      <div className="profile-details">
        <p><strong>Full Name:</strong> {profile.fullname}</p>
        <p><strong>Email:</strong> {profile.email}</p>
        {/* You can add more profile data fields here */}
      </div>
    </div>
  );
}

export default Profile;
