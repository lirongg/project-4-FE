import React, { useEffect, useState } from 'react';
import {Link} from "react-router-dom";
import DisplayItems from '../components/DisplayItem';
import { getUserListing } from '../utilities/users-api';


function MyProfile(props) {
  const {user} = props;

  const [userItem, setUserItem] = useState([]);
  const token =localStorage.getItem('token');
  const fetchUserItems = async () => {
    try {
      if(!token) {
        alert('Unauthorised user!');
        return;
      }
      const userId = user._id;
      const data = await getUserListing(userId)
      setUserItem(data);
    } catch (error) {
      console.error("Error fetching items", error);
    }
  }
  useEffect(()=> {
    fetchUserItems();
  },[user]);

  return (
    <div>
      <h2>My Profile</h2>
      {/* Display user information and profile content */}
      {user && (
        <div>
          <p>Welcome, {user.name}!</p>
          <Link to="/create">+ Create New Item</Link>
          <div>
            {userItem.map((item) => (
              <div key={item._id}>
                <DisplayItems item={item} />
                <button onClick={() => handleDelete(item._id)}>Delete</button>
                <Link to={`/edit-listing/${item._id}`}>
                  <button>Edit</button>
                </Link>
              </div>
            ))}
          </div>
          {/* Add more profile details and functionalities */}
        </div>
      )}
    </div>
  );
};

export default MyProfile;
