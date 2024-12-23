import React, { useState } from "react";
import { GiWhiteBook } from "react-icons/gi";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-gray-800 text-white">
      <nav className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center">
          <a href="#" className="text-lg font-bold flex items-center">
            <GiWhiteBook className="text-2xl mr-2" />
            ToDos
          </a>
        </div>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="block md:hidden text-white focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
        <div
          className={`${
            menuOpen ? "block" : "hidden"
          } md:flex space-x-4 items-center`}
        >
          <a
            href="#"
            className="hover:text-gray-300 text-white px-3 py-2 rounded-lg"
          >
            Home
          </a>
          <a
            href="#"
            className="hover:text-gray-300 text-white px-3 py-2 rounded-lg"
          >
            About Us
          </a>
          <a
            href="#"
            className="hover:text-gray-300 text-white px-3 py-2 rounded-lg"
          >
            SignUp
          </a>
          <a
            href="#"
            className="hover:text-gray-300 text-white px-3 py-2 rounded-lg"
          >
            SignIn
          </a>
          <a
            href="#"
            className="hover:text-gray-300 text-white px-3 py-2 rounded-lg"
          >
            Logout
          </a>
          <a href="#" className="w-10 h-10">
            <img
              className="rounded-full border border-gray-300 shadow-sm"
              src="https://cdn3.vectorstock.com/i/1000x1000/30/97/flat-business-man-user-profile-avatar-icon-vector-4333097.jpg"
              alt="user"
            />
          </a>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
