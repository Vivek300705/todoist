import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch profile data when the component mounts
    const fetchProfileData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/profile', {
          withCredentials: true, // To include cookies (e.g., JWT token)
        });

        setUserData(response.data); // Save the response data to state
      } catch (err) {
        if (err.response && err.response.data) {
          setError(err.response.data.message || 'Error fetching profile');
        } else {
          setError('An error occurred. Please try again.');
        }
        // Optionally redirect to login page if not authenticated
        navigate('/signin');
      }
    };

    fetchProfileData();
  }, [navigate]); // Empty dependency array ensures this runs only once when the component mounts

  return (
    <div className="profile-container">
      {error && <div className="error-message">{error}</div>}

      {userData ? (
        <div className="profile-details">
          <h1>{userData.fullname}</h1>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Username:</strong> {userData.username}</p>
          {/* Display other profile information here */}
        </div>
      ) : (
        <div>Loading profile...</div>
      )}
    </div>
  );
}

export default Profile;
