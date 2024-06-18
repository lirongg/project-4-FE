import React from "react";
import { Link } from "react-router-dom";
import SignOut from "../SignOut";
import logo from "../../assets/logo.png"; // Adjust the path to your logo file
import "./Navbar.css";

const Navbar = ({ user, setUser }) => {
  const username = user ? user.name : "";

  return (
    <nav className="navbar">
      <div className="logo-container">
        <img src={logo} alt="ClutterCritter Logo" className="navbar-logo" />
        <div className="welcome-text">Welcome, {username}</div>
      </div>
      <div className="nav-links">
        <Link to="/">Dashboard</Link>
        <Link to="/myprofile">My Profile</Link>
        <Link to="/view">View Items</Link>
        <Link to="/create">Create Item</Link>
      </div>
      <div className="sign-out">
        <SignOut user={user} setUser={setUser} />
      </div>
    </nav>
  );
};

export default Navbar;
