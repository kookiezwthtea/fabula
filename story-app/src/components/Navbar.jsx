import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NotificationIcon from './Notifications';
import SearchBar from './Search';

const Navbar = () => {
  const [username, setUsername] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const checkSession = async () => {
    try {
      const response = await fetch('http://localhost/story-app/backend/session_status.php', {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      if (data.username) {
        setUsername(data.username);
      } else {
        setUsername(null);
      }
    } catch (error) {
      console.error('Error fetching session status:', error);
    }
  };

  useEffect(() => {
    checkSession();
    const interval = setInterval(checkSession, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost/story-app/backend/logout.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'logout' }),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      if (result.message === 'Logged out successfully') {
        setUsername(null);
        navigate('/');
      } else {
        console.error('Error logging out:', result.message);
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  //Search Bar

  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const searchRef = useRef(null);

  const handleSearchToggle = () => {
    setIsSearchVisible((prevState) => !prevState);
  };

  const handleSearch = (query) => {
    setHasSearched(true);
    if (query.trim() === "") {
      setSearchResults([]);
      return;
    }

    fetch(`http://localhost/story-app/backend/search.php?query=${query}`)
      .then(response => response.json())
      .then(data => {
        setSearchResults(data);
      })
      .catch(error => console.error('Error fetching search results:', error));
  };

  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setIsSearchVisible(false);
      setSearchResults([]);
      setHasSearched(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  return (
    <nav className="bg-black bg-opacity-75 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium">
              Home
            </Link>
            <Link to="/categories" className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium">
              Categories
            </Link>
            <Link to="/about" className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium">
              About
            </Link>
          </div>

          <div className="flex items-center justify-center flex-shrink-0">
            <Link to="/" className="text-white text-2xl font-bold">
              Fabula
            </Link>
          </div>

          <div className="flex items-center justify-end">

            <div className="relative mr-4 z-10" ref={searchRef}>
              <button
                onClick={handleSearchToggle}
                className=" focus:outline-none p-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-colors duration-300"
                aria-label="Toggle search"
              >
                <i className="fas fa-search fa-lg"></i>
              </button>
              {isSearchVisible && (
                <SearchBar onSearch={handleSearch} />
              )}
              {isSearchVisible && hasSearched && (
                <div className="absolute right-0 mt-16 w-64 bg-white text-black rounded-lg shadow-lg p-4">
                  {searchResults.length > 0 ? (
                    searchResults.map((story) => (
                      <div key={story.id} className="p-2 border-b last:border-0">
                        <Link
                          to={`/story/${story.id}`}
                          className="block text-lg font-semibold"
                          onClick={handleSearchToggle}
                        >
                          {story.title}
                        </Link>
                        <p className="text-sm">
                          {story.description ? story.description.slice(0, 50) : 'No content available'}...
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="p-2 text-center text-gray-500">No results found</div>
                  )}
                </div>
              )}
            </div>

            <NotificationIcon />
            {username ? (
              <>
                <span className="text-white px-3 py-2 rounded-md text-sm font-medium"> <button
                  onClick={toggleDropdown}
                  className="text-white px-3 py-2 rounded-md text-sm font-medium focus:outline-none"
                >
                  {username}
                </button></span>
                {dropdownOpen && (
                  <div className="absolute right-2 mt-20 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Dashboard
                    </Link>
                  </div>
                )}
                <button
                  onClick={handleLogout}
                  className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium">
                  Login
                </Link>
                <Link to="/signup" className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
