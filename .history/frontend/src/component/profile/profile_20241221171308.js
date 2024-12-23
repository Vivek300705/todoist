import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        setError("No token found. Please sign in again.");
        navigate("/signin");
        return;
      }

      try {
        const response = await axios.get("http://localhost:8000/api/profile", {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        if (response.data.status) {
          setUserProfile(response.data.profile); // Set the user profile data
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError("Failed to fetch profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  if (loading) {
    return (
      <div className="bg-grey-lighter min-h-screen flex flex-col items-center justify-center">
        <div className="loader">Loading...</div> {/* Add a loading indicator */}
      </div>
    );
  }

  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Profile</h1>
          {error && <div className="text-red-500 mb-4">{error}</div>}

          {userProfile && (
            <div className="profile-details">
              <h2 className="text-xl text-center mb-4">Welcome, {userProfile.username}</h2>
              <div className="mb-4">
                <strong>Email:</strong> {userProfile.email}
              </div>
              <div className="mb-4">
                <strong>Created At:</strong> {new Date(userProfile.createdAt).toLocaleDateString()}
              </div>
            </div>
          )}

          <button
            className="w-full text-center py-3 rounded bg-red-500 text-white hover:bg-red-700 focus:outline-none my-1"
            onClick={() => {
              localStorage.removeItem("accessToken");
              navigate("/signin");
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
