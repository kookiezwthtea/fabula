import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import HeroSection from './Hero';

const Homepage = () => {
  const [stories, setStories] = useState([]);
  const [favorites, setFavorites] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState({}); 
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Track login status

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all stories
        const storiesResponse = await fetch('http://fabula.great-site.net/getAllStories.php');
        if (!storiesResponse.ok) throw new Error('Failed to fetch stories');
        const storiesData = await storiesResponse.json();
        setStories(storiesData);

        // Fetch favorites if logged in
        try {
          const favoritesResponse = await fetch('http://fabula.great-site.net/favouriteStory.php', {
            method: 'GET',
            credentials: 'include',
          });

          if (favoritesResponse.status === 401) {
           
            setIsLoggedIn(false);
            setFavorites({});
          } else if (!favoritesResponse.ok) {
            throw new Error('Failed to fetch favorites');
          } else {
            const favoritesData = await favoritesResponse.json();
            const favoritesMap = {};
            favoritesData.forEach(story => {
              favoritesMap[story.id] = true;
            });
            setFavorites(favoritesMap);
          }
        } catch (error) {
          console.error(error);
          
          setFavorites({});
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleFavorite = async (storyId) => {
    if (!isLoggedIn) {
      setMessage(prevMessages => ({
        ...prevMessages,
        [storyId]: 'You must be logged in to favorite a story.',
      }));
      return;
    }

    const isFavorited = favorites[storyId];
    const url = isFavorited
      ? 'http://fabula.great-site.net/unfavouriteStory.php'
      : 'http://fabula.great-site.net/favouriteStory.php';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ story_id: storyId }),
        credentials: 'include',
      });

      if (response.status === 401) {
     
        setIsLoggedIn(false);
        setMessage(prevMessages => ({
          ...prevMessages,
          [storyId]: 'You must be logged in to favorite a story.',
        }));
        return;
      }

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`HTTP error! Status: ${response.status}. Response: ${text}`);
      }

      setFavorites(prevFavorites => ({
        ...prevFavorites,
        [storyId]: !isFavorited,
      }));
      setMessage(prevMessages => ({
        ...prevMessages,
        [storyId]: '',
      }));
    } catch (error) {
      console.error('Error toggling favorite:', error);
      if (error.message.includes('Failed to fetch favorites')) {
        setMessage(prevMessages => ({
          ...prevMessages,
          [storyId]: 'You must be logged in to favorite a story.',
        }));
      }
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  return (
    <div className="container mx-auto p-4 text-white rounded-lg">
      <HeroSection />
      <p className='text-center text-4xl m-4 font-bold leading-tight tracking-tight'>All Stories</p>
      <div id="stories" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map((story) => (
          <div
            key={story.id}
            className="bg-black bg-opacity-80 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-2xl font-semibold mb-2">{story.title}</h2>
              <p className="text-gray-400 mb-4">{story.description}</p>
            </div>
            <div className="flex flex-row justify-between mt-4">
              <button
                onClick={() => toggleFavorite(story.id)}
                className="inline-block transition-colors duration-300 mb-2"
                aria-label={favorites[story.id] ? 'Unfavorite' : 'Favorite'}
              >
                <i
                  className={`fas fa-heart fa-2x ${favorites[story.id] ? 'text-red-500' : 'text-white'}`}
                ></i>
              </button>
              {message[story.id] && (
                <p className="text-red-400">{message[story.id]}</p>
              )}
              <Link
                to={`/story/${story.id}`}
                className="inline-block bg-purple-900 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors duration-300"
              >
                Read more
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Homepage;
