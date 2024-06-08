import React from 'react';

const MyProfile = ({ user }) => {
  return (
    <div>
      <h2>My Profile</h2>
      {/* Display user information and profile content */}
      {user && (
        <div>
          <p>Welcome, {user.name}!</p>
          {/* Add more profile details and functionalities */}
        </div>
      )}
    </div>
  );
};

export default MyProfile;
