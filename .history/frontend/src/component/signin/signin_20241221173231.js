import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function Signin() {
  const [username, setUsername] = useState(""); // Individual state for username
  const [password, setPassword] = useState(""); // Individual state for password
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate(); // Initialize navigate

  const handleSignin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      // Sending data directly with username and password
      const response = await axios.post(
        "http://localhost:8000/api/signin", // Your API endpoint
        {
          username: username, // Send username
          password: password, // Send password
        },
        {
          headers: {
            "Content-Type": "application/json", // Set headers
          },
          withCredentials: true, // Includes cookies if required for auth
        }
      );

      if (response.data && response.data.accessToken) {
        // Store the access token in localStorage
        localStorage.setItem("accessToken", response.data.accessToken);
        setSuccess("Login successful");

        // Redirect to home and force a page reload
        navigate("/"); // Navigate to the home page
        window.location.reload(); // Force a page reload to update the state
      } else {
        setError("Signin failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Sign In</h1>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          {success && <div className="text-green-500 mb-4">{success}</div>}
          <form onSubmit={handleSignin}>
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)} // Set username
              required
            />

            <input
              type="password"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Set password
              required
            />

            <button
              type="submit"
              className="w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-700 focus:outline-none my-1"
            >
              Sign In
            </button>
          </form>
        </div>

        <div className="text-grey-dark mt-6">
          Don't have an account?{" "}
          <a
            className="no-underline border-b border-blue text-blue-400 hover:underline hover:text-blue-600"
            href="/signup"
          >
            Sign up
          </a>
          .
        </div>
      </div>
    </div>
  );
}

export default Signin;
