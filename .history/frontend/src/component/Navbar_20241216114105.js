import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";


function Navbar() {
  return (
    <div><nav className="navbar navbar-expand-lg bg-body-tertiary">
    <div className="container-fluid">
      <a className="navbar-brand" href="#">Navbar</a>
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
                <img src="" alt="" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav></div>
  )
}

export default Navbar