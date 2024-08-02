import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

const ManageStories = () => {
  const [stories, setStories] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const response = await fetch('http://localhost/story-app/backend/addStory.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ action: 'check_admin' }),
        });

        const data = await response.json();

        if (data.isAdmin) {
          setIsAdmin(true);
        } else {
          navigate('/');
        }
      } catch (error) {
        console.error('Error checking admin status:', error);
      }
    };

    checkAdminStatus();
  }, [navigate]);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await fetch('http://localhost/story-app/backend/getAllStories.php');
        if (!response.ok) throw new Error('Failed to fetch stories');
        const data = await response.json();
        setStories(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this story?')) {
      try {
        const response = await fetch('http://localhost/story-app/backend/deleteStory.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id }),
        });

        if (!response.ok) throw new Error('Failed to delete story');
        setStories(stories.filter(story => story.id !== id));
      } catch (error) {
        setError(error.message);
      }
    }
  };

  if (!isAdmin) {
    return <div>Loading...</div>;
  }

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  return (
    <div className="container mx-auto p-4 text-white rounded-lg">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
              <Link
                to={`/admin/edit/${story.id}`}
                className="inline-block bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-400 transition-colors duration-300"
              >
                <i className="fas fa-edit"></i> Edit
              </Link>
              <button
                onClick={() => handleDelete(story.id)}
                className="inline-block bg-red-500 text-white px-4 py-2 rounded hover:bg-red-400 transition-colors duration-300"
              >
                <i className="fas fa-trash-alt"></i> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageStories;
