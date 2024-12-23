import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [userProfile, setUserProfile] = useState(null);
  const [todos, setTodos] = useState([]); // State to store the user's todos
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
          fetchTodos(response.data.profile._id); // Fetch the todos once the profile is fetched
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

  // Function to fetch the todo list for the logged-in user
  const fetchTodos = async (userId) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setError("No token found. Please sign in again.");
        navigate("/signin");
        return;
      }

      const response = await axios.get(`http://localhost:8000/api/todos/${userId}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      console.log("Fetched Todos:", response.data.todos); // Log the todos

      if (response.data.status) {
        setTodos(response.data.todos); // Set the todos data
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError("Failed to fetch todos.");
    }
  };

  if (loading) {
    return (
      <div className="bg-grey-lighter min-h-screen flex flex-col items-center justify-center">
        <div className="loader">Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <div className="bg-blue-500 text-white text-center py-4">
        <h1 className="text-3xl">Welcome to Your Profile</h1>
        <p className="text-xl">Manage your information and settings</p>
      </div>

      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Profile</h1>
          {error && <div className="text-red-500 mb-4">{error}</div>}

          {userProfile && (
            <div className="profile-details text-center">
              <img
                src="https://cdn3.vectorstock.com/i/1000x1000/30/97/flat-business-man-user-profile-avatar-icon-vector-4333097.jpg"
                alt="Profile Avatar"
                className="rounded-full w-24 h-24 mx-auto mb-4"
              />
              <h2 className="text-xl mb-4">Welcome, {userProfile.username}</h2>
              <div className="mb-4">
                <strong>Email:</strong> {userProfile.email}
              </div>
              <div className="mb-4">
                <strong>Created At:</strong> {new Date(userProfile.createdAt).toLocaleDateString()}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2 mt-6">
        {todos.length > 0 ? (
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h2 className="text-2xl font-bold mb-4">Your Todo List</h2>
            <ul className="list-disc pl-5">
              {todos.map((todo) => (
                <li key={todo._id} className="mb-2">
                  <strong>{todo.heading}</strong>: {todo.text}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full text-center">
            <p>No todos available.</p>
          </div>
        )}
      </div>

      <button
        className="w-full text-center py-3 rounded bg-red-500 text-white hover:bg-red-700 focus:outline-none my-4"
        onClick={() => {
          localStorage.removeItem("accessToken");
          navigate("/signin");
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Profile;