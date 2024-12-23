import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const [userData, setUserData] = useState(null);  // Store profile data
  const [error, setError] = useState(''); // Error message state
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        // Get the token from localStorage (or wherever it's stored)
        const token = localStorage.getItem('accessToken');
        if (!token) {
          navigate('/signin');  // Redirect if there's no token
          return;
        }

        // Make the API call to fetch the user profile
        const response = await axios.get('http://localhost:8000/api/profile', {
          headers: {
            Authorization: `Bearer ${token}`,  // Send token in header
          },
        });

        // Update userData state with the fetched profile data
        setUserData(response.data);
      } catch (err) {
        // Handle errors (invalid token, network issues, etc.)
        if (err.response && err.response.data) {
          setError(err.response.data.message || 'Error fetching profile');
        } else {
          setError('An error occurred. Please try again.');
        }
        navigate('/signin');  // Redirect to sign-in page if there was an error
      }
    };

    fetchProfileData();  // Call the function to fetch profile on mount
  }, [navigate]);  // Re-run effect on navigate change

  // Loading or error states
  if (error) {
    return <div>{error}</div>;
  }

  if (!userData) {
    return <div>Loading...</div>;  // Display a loading message until data is fetched
  }

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      <div>
        <p><strong>Full Name:</strong> {userData.fullname}</p>
        <p><strong>Email:</strong> {userData.email}</p>
        <p><strong>Username:</strong> {userData.username}</p>
      </div>
    </div>
  );
}

export default Profile;
