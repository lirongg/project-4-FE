import React from 'react';
import { Link } from 'react-router-dom';
import SignOut from './SignOut';

const Navbar = ({ user, setUser }) => {
  return (
    <nav>
      <div className="logo">
      <div>Welcome, {user.name} </div>
        <Link to="/">Home</Link>
      </div>
      <div className="nav-links">
        <Link to="/">Dashboard</Link>
        <br />
        <Link to="/myprofile">My Profile</Link>
        <br />
        <Link to="/view">View Items</Link>
        <br />

        <SignOut user={user} setUser={setUser} />


        
      </div>
    </nav>
  );
};

export default Navbar;
