import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        // Get the access token from localStorage (or cookies if you're using them)
        const token = localStorage.getItem('accessToken') || document.cookie.replace(/(?:(?:^|.*;\s*)accessToken\s*\s*([^;]*).*$)|^.*$/, "$1");

        // If no token, redirect to login page
        if (!token) {
          navigate('/signin');
          return;
        }

        const response = await axios.get('http://localhost:8000/api/profile', {
          headers: {
            Authorization: `Bearer ${token}`, // Send the access token in the Authorization header
          },
          withCredentials: true, // If you're using cookies for the token
        });

        setUserData(response.data); // Save user data to state
      } catch (err) {
        if (err.response && err.response.data) {
          setError(err.response.data.message || 'Error fetching profile');
        } else {
          setError('An error occurred. Please try again.');
        }
        // Optionally, redirect to login page if unauthorized
        navigate('/signin');
      }
    };

    fetchProfileData();
  }, [navigate]);

  return (
    <div className="profile-container">
      {error && <div className="error-message">{error}</div>}

      {userData ? (
        <div className="profile-details">
          <h1>{userData.fullname}</h1>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Username:</strong> {userData.username}</p>
        </div>
      ) : (
        <div>Loading profile...</div>
      )}
    </div>
  );
}

export default Profile;
