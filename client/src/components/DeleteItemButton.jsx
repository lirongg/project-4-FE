// DeleteItemButton.jsx

import React from 'react';
import PropTypes from 'prop-types';
import { deleteItem } from '../utilities/items-api';

function DeleteItemButton({ itemId, onDeleteSuccess }) {
  const handleDelete = async () => {
    try {
      console.log('Deleting item:', itemId);
      await deleteItem(itemId);
      onDeleteSuccess(itemId);
      console.log('Item deleted successfully');
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <button onClick={handleDelete}>
      Banish Baggage
    </button>
  );
}

DeleteItemButton.propTypes = {
  itemId: PropTypes.string.isRequired,
  onDeleteSuccess: PropTypes.func.isRequired,
};

export default DeleteItemButton;
