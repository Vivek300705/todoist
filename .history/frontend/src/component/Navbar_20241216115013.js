import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./Navbar.css";
import { GiWhiteBook } from "react-icons/gi";

function Navbar() {
  return (
    <div><nav className="navbar navbar-expand-lg">
    <div className="container">
      <a className="navbar-brand" href="#"><b><GiWhiteBook/>&nbsp;ToDos</b></a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="#">Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="#">About Us</a>
          </li>
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="#">SignUp</a>
          </li>
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="#">SignIn</a>
          </li>
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="#">Logout</a>
          </li>
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="#">
                <img className='img-fluid user-img' src="https://cdn3.vectorstock.com/i/1000x1000/30/97/flat-business-man-user-profile-avatar-icon-vector-4333097.jpg" alt="user" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav></div>
  )
}

export default Navbar