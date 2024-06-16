// MyProfile.jsx

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DisplayItems from '../../components/DisplayItem';
import { getUserListing, deleteUser } from '../../utilities/users-api';
import DeleteItemButton from '../../components/DeleteItemButton'; // Import the new component
import "./Profile.css"

function MyProfile({ user, setUser }) {
  const navigate = useNavigate();
  const [userItems, setUserItems] = useState([]);

  useEffect(() => {
    if (user) {
      fetchUserItems();
    }
  }, [user]);

  const fetchUserItems = async () => {
    try {
      const data = await getUserListing(user._id);
      setUserItems(data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleDeleteSuccess = (id) => {
    setUserItems(userItems.filter(item => item._id !== id));
  };

  const handleDeleteUser = async () => {
    try {
      await deleteUser(user._id);
      setUser(null);
      localStorage.removeItem('token');
      navigate('/signup'); // Navigate to signup page after user deletion
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>My Profile</h2>
      <p>Welcome, {user.name}!</p>
      <Link to="/create">+ Add a Critter</Link>
      <div className="items-container">
        {userItems.length > 0 ? (
          userItems.map((item) => (
            <div key={item._id} className="box-container">
              <DisplayItems item={item} />
              <div className="item-actions">
                <DeleteItemButton itemId={item._id} onDeleteSuccess={handleDeleteSuccess} />
                <Link to={`/edit/${item._id}`}>
                  <button>Tweak Tails</button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p>No items found.</p>
        )}
      </div>
      <button onClick={handleDeleteUser}>Delete User</button>
    </div>
  );
}

export default MyProfile;
