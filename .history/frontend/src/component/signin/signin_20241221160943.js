import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function Signin() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate(); // Initialize navigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        "http://localhost:8000/api/signin",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // Includes cookies if required for auth
        }
      );

      if (response.status === 200) {
        setSuccess("Sign in successful!");
        // Redirect to the profile page after successful sign-in
        navigate("/profile");
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || "Sign-in failed.");
      } else {
        setError("An error occurred. Please try again.");
      }
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
              value={formData.username}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
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
      </div>
    </div>
  );
}

export default Signin;