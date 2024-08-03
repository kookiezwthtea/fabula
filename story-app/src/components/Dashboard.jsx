import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://fabula.great-site.net/user_data.php', {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}. User not authorized.`);
        }

        const data = await response.json();
        setUserData(data.userData);
      } catch (error) {
        setError(error.message);
      }
    };

    const fetchFavorites = async () => {
      try {
        const response = await fetch('http://fabula.great-site.net/favouriteStory.php', {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setFavorites(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUserData();
    fetchFavorites();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="container mx-auto p-4 text-white">
        <h1 className="text-2xl font-bold mb-4">Welcome, {userData.user}</h1>
        <div className="bg-black bg-opacity-80 shadow-md rounded p-4 text-white">
          <h2 className="text-xl font-semibold mb-2">Your Dashboard</h2>
          <p><strong>Email:</strong> {userData.email}</p>
        </div>
      </div>

      <div className="container mx-auto p-4 text-white">
        <h1 className="text-2xl font-bold mb-4">Your Favorited Stories</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.length > 0 ? (
            favorites.map((story) => (
              <div key={story.id} className="bg-black bg-opacity-80 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                <h2 className="text-2xl font-semibold mb-2">{story.title}</h2>
                <p className="text-gray-400 mb-4">{story.description}</p>
                <Link to={`/story/${story.id}`} className="inline-block bg-purple-900 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors duration-300">
                  Read more
                </Link>
              </div>
            ))
          ) : (
            <p>No favorited stories yet.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
