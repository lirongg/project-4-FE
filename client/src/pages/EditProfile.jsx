// EditProfile.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateUser } from '../utilities/users-api';

function EditProfile({ user, setUser }) { // Ensure user and setUser are received as props
  const navigate = useNavigate();

  const [newName, setNewName] = useState(user?.name || ''); // Use optional chaining to avoid errors
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');

  const handleUpdateProfile = async () => {
    try {
      const updatedUser = { ...user, name: newName };
      await updateUser(updatedUser);
      setUser(updatedUser);
      alert('Profile updated successfully');
      navigate('/profile');
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile. Please try again.');
    }
  };

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword) {
      setError('Please fill in all fields to change the password.');
      return;
    }

    try {
      const userData = { ...user, currentPassword, newPassword };
      await updateUser(userData, true);
      alert('Password changed successfully');
      setCurrentPassword('');
      setNewPassword('');
      navigate('/profile');
    } catch (error) {
      console.error('Error changing password:', error);
      setError('Failed to change password. Please ensure your current password is correct.');
    }
  };

  return (
    <div className="edit-profile-page">
      <h2>Edit Profile</h2>

      <div className="profile-section">
        <h3>Update Name</h3>
        <label>
          Name:
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </label>
        <button onClick={handleUpdateProfile}>Update Name</button>
      </div>

      <div className="password-section">
        <h3>Change Password</h3>
        <label>
          Current Password:
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </label>
        <label>
          New Password:
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </label>
        <button onClick={handleChangePassword}>Change Password</button>
      </div>

      {error && <p className="error-message">{error}</p>}

      <button onClick={() => navigate('/profile')} className="cancel-button">
        Cancel
      </button>
    </div>
  );
}

export default EditProfile;
