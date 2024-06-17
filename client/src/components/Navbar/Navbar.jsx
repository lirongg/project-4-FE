import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SignOut from "../SignOut";
import "./Navbar.css";

const Navbar = ({ user, setUser }) => {
  const username = user ? user.name : "";

  return (
    <nav className="navbar">
      <div className="logo">
        <div>Welcome, {username}</div>
      </div>
      <div className="nav-links">
        <Link to="/">Dashboard</Link>
        <Link to="/myprofile">My Profile</Link>
        <Link to="/view">View Items</Link>
        <Link to="/create">Create Item</Link>{" "}
        {/* Link to the Create Item page */}
      </div>
      <div className="sign-out">
        <SignOut user={user} setUser={setUser} />
      </div>
    </nav>
  );
};

export default Navbar;
