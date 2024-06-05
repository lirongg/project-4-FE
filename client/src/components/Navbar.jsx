import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ user, handleSignOut }) => {
  return (
    <nav>
      <div className="logo">
      <div>Welcome, {user} </div>
        <Link to="/">Home</Link>
      </div>
      <div className="nav-links">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/myprofile">My Profile</Link>
        <Link to="/search">Search</Link>
        <Link to="/create">Create Item</Link>
        {user && (
          <button onClick={handleSignOut}>Sign Out</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;