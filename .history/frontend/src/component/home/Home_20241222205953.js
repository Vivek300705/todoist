import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken"); // Check if token is in localStorage
    if (token) {
      setIsLoggedIn(true); // Set logged-in state if token exists
    }
  }, []); // Run only once when the component mounts

  const handleMakeTodoList = () => {
    navigate("/todo"); // Redirect to the To-Do page
  };

  return (
    <div className="text-center h-screen flex flex-col justify-center items-center bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-[#1d4ed8] via-[#1e40af] to-[#111827]">
      <div className="text-2xl mb-8 bg-opacity-50 backdrop-blur-md z-0  inset-0 bg-black">
      <h1 className="font-bold text-4xl mb-6">Plan. Achieve. Simplify.</h1>
        <b>
          &quot; Organize your day, achieve your goals, and stay productive—your <br /> ultimate To-Do list starts here for a better tomorrow! &quot;
        </b>
        <p className="text-lg mt-4 font-medium">
          &quot; अपना दिन व्यवस्थित करें, अपने लक्ष्यों को पूरा करें, और उत्पादक बने रहें—बेहतर कल के लिए यहां से शुरुआत करें! &quot;
        </p>
      </div>
      {isLoggedIn && ( // Conditionally render the button based on login status
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
          onClick={handleMakeTodoList}
        >
          Make Todolist
        </button>
      )}
    </div>
  );
}

export default Home;
