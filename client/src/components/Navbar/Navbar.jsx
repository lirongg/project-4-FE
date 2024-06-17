import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SignOut from '../SignOut';
import Search from '../SearchItem'; // Import the Search component
import './Navbar.css';

const Navbar = ({ user, setUser }) => {
  const username = user ? user.name : '';
  const [items, setItems] = useState([]); // State to hold search results

  const navigate = useNavigate();

  // Function to handle navigation after searching items
  const handleSearchItems = (searchResults) => {
    setItems(searchResults);
    // You can also navigate to a search results page if you have one
    // navigate('/search-results');
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <div>Welcome, {username}</div>
      </div>
      <div className="nav-links">
        <Link to="/">Dashboard</Link>
        <Link to="/myprofile">My Profile</Link>
        <Link to="/view">View Items</Link>
        <Link to="/create">Create Item</Link> {/* Link to the Create Item page */}
      </div>
      <div className="search-bar">
        <Search setItems={handleSearchItems} /> {/* Integrate the Search component */}
      </div>
      <div className="sign-out">
        <SignOut user={user} setUser={setUser} />
      </div>
    </nav>
  );
};

export default Navbar;
