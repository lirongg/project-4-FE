// DeleteItemButton.jsx

import React from 'react';
import PropTypes from 'prop-types';
import { deleteItem } from '../utilities/items-api';
import { useNotification } from '../components/Notifications/NotificationContext';

function DeleteItemButton({ itemId, onDeleteSuccess, itemName }) {
  const { addNotification } = useNotification();

  const handleDelete = async () => {
    try {
      console.log('Deleting item:', itemId);
      await deleteItem(itemId);
      // Use the itemName prop directly for notification
      addNotification(`Item "${itemName}" deleted`);
      onDeleteSuccess(itemId);
      console.log('Item deleted successfully');
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <button type ="button" onClick={handleDelete}>
      Delete Item
    </button>
  );
}

DeleteItemButton.propTypes = {
  itemId: PropTypes.string.isRequired,
  onDeleteSuccess: PropTypes.func.isRequired,
  itemName: PropTypes.string.isRequired, 
};

export default DeleteItemButton;
