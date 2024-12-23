import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const [userData, setUserData] = useState(null); // For storing profile data
  const [error, setError] = useState(''); // For handling errors
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        // Get the access token from localStorage or cookies
        const token = localStorage.getItem('accessToken') || document.cookie.replace(/(?:(?:^|.*;\s*)accessToken\s*=\s*([^;]*).*$)|^.*$/, "$1");

        // If no token is available, redirect to login page
        if (!token) {
          navigate('/signin');
          return;
        }

        // Fetch user profile data from the backend
        const response = await axios.get('http://localhost:8000/api/profile', {
          headers: {
            Authorization: `Bearer ${token}`, // Send the access token in the header
          },
          withCredentials: true, // If you're using cookies
        });

        // If response is successful, update the user data
        setUserData(response.data); // Set the profile data in state
      } catch (err) {
        // Handle errors (network issues, invalid token, etc.)
        if (err.response && err.response.data) {
          setError(err.response.data.message || 'Error fetching profile');
        } else {
          setError('An error occurred. Please try again.');
        }
        navigate('/signin'); // Optionally, redirect to login page
      }
    };

    fetchProfileData(); // Call the function to fetch data on mount
  }, [navigate]); // Dependency array ensures that it runs only once

  return (
    <div className="profile-container">
      {error && <div className="error-message">{error}</div>} {/* Display any error messages */}

      {userData ? ( // Render profile data when it's available
        <div className="profile-details">
          <h1>{userData.fullname}</h1>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Username:</strong> {userData.username}</p>
        </div>
      ) : (
        <div>Loading profile...</div> // Show a loading message while waiting for the data
      )}
    </div>
  );
}

export default Profile;
