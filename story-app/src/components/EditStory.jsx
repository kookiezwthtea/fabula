import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditStory = () => {
  const { id } = useParams(); // Get the story ID from URL parameters
  const navigate = useNavigate(); // Hook to navigate programmatically

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [source, setSource] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState(['horror', 'mystery', 'science fiction', 'romance', 'adventure', 'fantasy']); // Define categories yourself
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [successMessage,setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const response = await fetch('http://fabula.great-site.net/editStory.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            action: 'get_story',
            id
          }),
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch story');
        }

        const storyData = await response.json();
        setTitle(storyData.title);
        setDescription(storyData.description);
        setImage(storyData.image);
        setSource(storyData.source);
        setCategory(storyData.category);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStory();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch('http://fabula.great-site.net/editStory.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'edit_story',
          id,
          title,
          description,
          image,
          source,
          category
        }),
        credentials: 'include'
      });

      const data = await response.json();
      if (response.ok) {
        setSuccessMessage('Story updated successfully!');
        setTimeout(() => {
            navigate('/admin/stories');
          }, 3000);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Error updating story: ' + error.message);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="container mx-auto p-4  text-white rounded-lg w-1/2">
      <h1 className="text-2xl font-bold mb-4">Edit Story</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-black bg-opacity-65 p-6 rounded-lg">
        <div>
          <label className="block text-sm font-bold mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-900 focus:outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-bold mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-900 focus:outline-none"
            rows="4"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-bold mb-2">Image URL</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-900 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-bold mb-2">Source URL</label>
          <input
            type="text"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-900 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-bold mb-2">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-900 focus:outline-none"
            required
          >
            {categories.map((cat, index) => (
              <option key={index} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div>
          <button
            type="submit"
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-500 transition-colors duration-300"
          >
            Update Story
          </button>
        </div>
      </form>
      {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>} {/* Success message */}
    </div>
  );
};

export default EditStory;
