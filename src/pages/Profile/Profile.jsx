import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DisplayItems from '../../components/DisplayItems/DisplayItem';
import { deleteUser } from '../../utilities/users-api';
import { getUserListing } from '../../utilities/items-api';
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

      <div className="button-group">
        <button onClick={handleEditProfile} className="edit-profile-button">
          Edit Profile
        </button>
        <button onClick={handleDeleteUser} className="delete-user-button">
          Delete Account
        </button>
      </div>

      <div className="items-container">
        <h3>My Items</h3>
        <ul className="items-grid"> 
          {userItems.length > 0 ? (
            userItems.map((item) => (
              <li key={item._id} className="item-container"> {/* Use item-container style */}
                <DisplayItems item={item} />
                <div className="item-actions">
                <Link to={`/edit/${item._id}`}>
                    <button>Edit</button>
                  </Link>
                  <DeleteItemButton itemId={item._id} onDeleteSuccess={handleDeleteSuccess} itemName={item.item} />
                </div>
              </li>
            ))
          ) : (
            <p>No items found.</p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default MyProfile;
