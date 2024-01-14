import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {

  const userData = JSON.parse(localStorage.getItem("user"));
  const img = userData.image

  const handleLogout = () => {
    localStorage.removeItem("token");
  };

  return (
    <div className="navbar-container">
      <div className="logo-container text-4xl font-semibold">
        <h2>Welcome Back</h2>
      </div>

      <div className="button-container flex gap-5">
        {localStorage.getItem("token") === null ? (
          <div className=' flex gap-5'>
            <Link to="/login" className="nav-link">
              <button className="login-button font-semibold hover:bg-green-700 hover:scale-[1.1]">Login</button>
            </Link>

            <Link to="/signup" className="nav-link font-semibold hover:bg-red-400 hover:scale-[1.1]">
              <button className="signup-button hover:bg-red-600 hover:rounded-md">Signup</button>
            </Link>
          </div>
        ) : (
          <div className=' flex gap-5 items-center'>
            <Link to="/login" className="nav-link">
              <button onClick={handleLogout} className=" border login-button font-semibold hover:bg-green-700 hover:scale-[1.1]">Logout</button>
            </Link>

            <Link className="nav-link font-semibold hover:bg-red-700 hover:scale-[1.1]">
              <button className="signup-button hover:rounded-md border hover:bg-red-600 ">View Profile</button>
            </Link>

            <img src={img} alt="Image" className=' w-[50px] h-[50px] rounded-full border shadow-md hover:scale-[1.1]' />

            <img src="" alt="" />
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
