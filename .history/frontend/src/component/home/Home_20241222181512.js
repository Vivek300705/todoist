import React from "react";
import "./home.css";

function Home() {
  return (
    <div className="text-center h-screen  flex flex-col justify-center items-center bg-gray-100">
      <h1 className="font-bold text-4xl mb-6">Plan. Achieve. Simplify.</h1>
      <div className="text-2xl mb-8">
        <b>
          &quot; Organize your day, achieve your goals, and stay productive—your <br /> ultimate To-Do list starts here for a better tomorrow! &quot;
        </b>
        <p className="text-lg mt-4 font-medium">
          &quot; अपना दिन व्यवस्थित करें, अपने लक्ष्यों को पूरा करें, और उत्पादक बने रहें—बेहतर कल के लिए यहां से शुरुआत करें! &quot;
        </p>
      </div>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded" href>
        Make Todolist
      </button>
    </div>
  );
}

export default Home;
