import React, { useState, useRef, useEffect } from 'react';

const SearchBar = ({ onSearch, onBlur }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
    setQuery('');
  };

  return (
    <form
      onSubmit={handleSearch}
      className="absolute top-full right-0 mt-2 bg-gray-700 p-2 rounded-lg shadow-lg flex items-center z-10"
      onBlur={onBlur}
    >
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search stories..."
        className="flex-grow px-4 py-2 rounded-l-lg focus:outline-none"
      />
      <button
        type="submit"
        className="bg-purple-600 text-white px-4 py-2 rounded-r-lg hover:bg-purple-500 transition-colors duration-300"
      >
        <i className="fas fa-search"></i>
      </button>
    </form>
  );
};

export default SearchBar;
