// MyProfile.jsx

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DisplayItems from '../../components/DisplayItem';
import { getUserListing, deleteUser } from '../../utilities/users-api';
import DeleteItemButton from '../../components/DeleteItemButton';
import "./Profile.css";

function MyProfile({ user, setUser }) { // Receive user and setUser as props
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
      navigate('/signup');
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEditProfile = () => {
    navigate('/profile/edit');
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="profile-page">
      <h2>My Profile</h2>
      <p>Welcome, {user.name}!</p>

      <button onClick={handleEditProfile} className="edit-profile-button">
        Edit Profile
      </button>

      <div className="items-container">
        <h3>My Items</h3>
        <Link to="/create">+ Add a Critter</Link>
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

      <button onClick={handleDeleteUser} className="delete-user-button">
        Delete User
      </button>
    </div>
  );
}

export default MyProfile;
