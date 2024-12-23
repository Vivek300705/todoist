import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./component/navbar/Navbar";
import Home from "./component/home/Home";
import About from "./component/Aboutus/Aboutus";
import Profile from "./component/profile/profile";
import Signup from "./component/signup/signup";
import Signin from "./component/signin/signin"
import "./App.css";
// import footer from "./component/footer/footer"
import Footer from "./component/footer/footer";
import todo from "./component/todos/todo";


function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/todo" element={<todo/>} />
          <Route path="*" element={<div>404 - Page Not Found</div>} />
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
