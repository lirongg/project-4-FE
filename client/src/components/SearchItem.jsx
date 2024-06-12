import React, { useState } from 'react';
import { searchItems } from '../utilities/users-api';

const Search = ({ setItems }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const data = await searchItems(searchQuery);
      setItems(data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search items..."
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default Search;
