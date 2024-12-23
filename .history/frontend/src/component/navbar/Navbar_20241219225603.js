import React, { useState } from "react";
import { GiWhiteBook } from "react-icons/gi";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false); // State to manage menu visibility

  return (
    <div className="bg-gray-800 text-white">
      <nav className="flex items-center justify-between px-6 py-4">
        {/* Logo Section */}
        <div className="flex items-center">
          <a href="#" className="text-lg font-bold flex items-center">
            <GiWhiteBook className="text-2xl mr-2" />
            ToDos
          </a>
        </div>

        {/* Toggle Button for Mobile */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="block md:hidden text-white focus:outline-none"
        >
          {menuOpen ? (
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
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
          )}
        </button>

        {/* Menu Links */}
        <div
          className={`${
            menuOpen ? "block" : "hidden"
          } md:flex md:items-center md:space-x-4 absolute md:static top-16 left-0 w-full bg-gray-800 md:bg-transparent z-10`}
        >
          <a
            href="#"
            className="block md:inline-block text-center px-4 py-2 hover:bg-gray-700 md:hover:bg-transparent md:hover:text-gray-300"
          >
            Home
          </a>
          <a
            href="#"
            className="block md:inline-block text-center px-4 py-2 hover:bg-gray-700 md:hover:bg-transparent md:hover:text-gray-300"
          >
            About Us
          </a>
          <a
            href="#"
            className="block md:inline-block text-center px-4 py-2 hover:bg-gray-700 md:hover:bg-transparent md:hover:text-gray-300"
          >
            SignUp
          </a>
          <a
            href="#"
            className="block md:inline-block text-center px-4 py-2 hover:bg-gray-700 md:hover:bg-transparent md:hover:text-gray-300"
          >
            SignIn
          </a>
          <a
            href="#"
            className="block md:inline-block text-center px-4 py-2 hover:bg-gray-700 md:hover:bg-transparent md:hover:text-gray-300"
          >
            Logout
          </a>
          <a href="#" className="block md:inline-block px-4 py-2 text-center">
            <img
              className="rounded-full border border-gray-300 shadow-sm w-10 h-10 mx-auto md:mx-0"
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
