import { GiWhiteBook } from "react-icons/gi";

export default function Navbar() {
  return (
    <div>
      <nav className="bg-white shadow">
        <div className=" mx-auto px-5 flex items-center justify-between">
          {/* Logo Section */}
          <a className="flex items-center text-teal-500 font-bold text-lg" href="#">
            <GiWhiteBook className="mr-2" />
            <span>ToDos</span>
          </a>

          {/* Mobile Toggle */}
          <button
            className="text-gray-500 hover:text-teal-500 focus:outline-none lg:hidden"
            aria-label="Toggle navigation"
          >
            <svg
              className="w-6 h-6"
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

          {/* Nav Links */}
          <div className="hidden lg:flex items-center space-x-6">
            <a
              href="#"
              className="text-gray-700 hover:text-teal-500 font-medium nav-button"
            >
              Home
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-teal-500 font-medium nav-button"
            >
              About Us
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-teal-500 font-medium nav-button"
            >
              SignUp
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-teal-500 font-medium nav-button"
            >
              SignIn
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-teal-500 font-medium nav-button"
            >
              Logout
            </a>
            <a href="#" className="flex items-center">
              <img
                className="w-10 h-10 rounded-full object-cover"
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
