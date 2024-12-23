import React, { useState } from "react";
import axios from "axios";
import "./signup.css";

function Signup() {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const { username, email, password } = formData;

    // if (password !== confirm_password) {
    //   setError("Passwords do not match.");
    //   return;
    // }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/signup",
        { username, email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setSuccess("Account created successfully! Please log in.");
        setFormData({
          fullname: "",
          email: "",
          password: "",
        });
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || "Signup failed.");
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Sign up</h1>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          {success && <div className="text-green-500 mb-4">{success}</div>}
          <form onSubmit={handleSignup}>
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="fullname"
              placeholder="Full Name"
              value={formData.username}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="email"
              placeholder="Email"
              value={formData.email}
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

            <input
              type="password"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="confirm_password"
              placeholder="Confirm Password"
              value={formData.confirm_password}
              onChange={handleChange}
              required
            />

            <button
              type="submit"
              className="w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-700 focus:outline-none my-1"
            >
              Create Account
            </button>
          </form>
        </div>

        <div className="text-grey-dark mt-6">
          Already have an account?{" "}
          <a
            className="no-underline border-b border-blue text-blue-400 hover:underline hover:text-blue-600"
            href="/signin"
          >
            Log in
          </a>
          .
        </div>
      </div>
    </div>
  );
}

export default Signup;
