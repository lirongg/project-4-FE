import React from 'react';
import { Link } from 'react-router-dom';
import SignOut from './SignOut';
import "./Navbar.css"

const Navbar = ({ user, setUser }) => {
  return (
    <nav className="navbar">
      <div className="logo">
        <div>Welcome, {user.name}</div>
      </div>
      <div className="nav-links">
        <Link to="/">Dashboard</Link>
        <Link to="/myprofile">My Profile</Link>
        <Link to="/view">View Items</Link>
        <SignOut user={user} setUser={setUser} />
      </div>
    </nav>
  );
};

export default Navbar;
