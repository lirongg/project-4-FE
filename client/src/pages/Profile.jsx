import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DisplayItems from '../components/DisplayItem';
import { getUserListing, deleteUser } from '../utilities/users-api';
import { deleteItem } from '../utilities/items-api';

function MyProfile(props) {
  const { user, setUser } = props;
  const navigate = useNavigate();

  const [userItems, setUserItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null); // State to hold the selected item for editing
  const token = localStorage.getItem('token');

  // Fetch user items
  const fetchUserItems = async () => {
    try {
      if (!token) {
        alert('Unauthorized user!');
        return;
      }
      const userId = user._id;
      const data = await getUserListing(userId);
      setUserItems(data);
    } catch (error) {
      console.error('Error fetching items', error);
    }
  };

  // Fetch user items when user changes
  useEffect(() => {
    if (user) {
      fetchUserItems();
    }
  }, [user]);

  // Handle item deletion
  const handleDeleteItem = async (id) => {
    try {
      await deleteItem(id);
      fetchUserItems();
    } catch (error) {
      console.log(error);
    }
  };

  // Handle user deletion
  const handleDeleteUser = async () => {
    try {
      await deleteUser(user._id);
      setUser(null);
      localStorage.removeItem('token');
      navigate('/'); // Navigate to home page or login page
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div>
      <h2>My Profile</h2>
      {user ? (
        <div>
          <p>Welcome, {user.name}!</p>
          <Link to="/create">+ Create New Item</Link>
          <div>
            {userItems.length > 0 ? (
              userItems.map((item) => (
                <div key={item._id}>
                  <DisplayItems item={item} />
                  <button onClick={() => handleDeleteItem(item._id)}>Delete</button>
                  <Link to={`/edit/${item._id}`}>
                    <button>Edit</button>
                  </Link>
                </div>
              ))
            ) : (
              <p>No items found.</p>
            )}
          </div>
          <button onClick={handleDeleteUser}>Delete User</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default MyProfile;
