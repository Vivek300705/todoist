import { useState } from "react";
import { GiWhiteBook } from "react-icons/gi";

export default function Navbar() {
  // State to handle toggle for mobile menu
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle the mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <nav className="bg-white">
        <div className="container mx-auto px-8 py-6 flex items-center justify-between">
          {/* Logo Section */}
          <a className="flex items-center text-teal-600 font-bold text-2xl" href="#">
            <GiWhiteBook className="mr-3 text-3xl" />
            <span>ToDos</span>
          </a>

          {/* Mobile Toggle Button */}
          <button
            className="text-gray-600 hover:text-teal-600 focus:outline-none lg:hidden"
            onClick={toggleMenu} // Toggle the menu on button click
            aria-label="Toggle navigation"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>

          {/* Nav Links (Mobile menu visible based on `isOpen` state) */}
          <div
            className={`lg:flex items-center space-x-8 ${isOpen ? "block" : "hidden"}`}
          >
            <a
              href="#"
              className="text-gray-700 hover:text-teal-600 text-xl font-medium nav-button"
            >
              Home
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-teal-600 text-xl font-medium nav-button"
            >
              About Us
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-teal-600 text-xl font-medium nav-button"
            >
              SignUp
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-teal-600 text-xl font-medium nav-button"
            >
              SignIn
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-teal-600 text-xl font-medium nav-button"
            >
              Logout
            </a>
            <a href="#" className="flex items-center">
              <img
                className="w-14 h-14 rounded-full object-cover"
                src="https://cdn3.vectorstock.com/i/1000x1000/30/97/flat-business-man-user-profile-avatar-icon-vector-4333097.jpg"
                alt="user"
              />
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
}
