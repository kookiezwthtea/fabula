import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const TwineStory = () => {
  const { id } = useParams(); 
  const [storyUrl, setStoryUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const response = await fetch(`http://localhost/story-app/backend/fetchOneStory.php?id=${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.text();
        setStoryUrl(`/stories/${data}`); 
        setLoading(false);
      } catch (error) {
        setError(error.toString());
        setLoading(false);
      }
    };

    fetchStory();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
  <div className="flex justify-center items-center mt-4 mb-6">
  <div className="text-center w-4/5">
    <iframe
      src={storyUrl}
      title="Twine Story"
      width="100%"
      height="500px"
      className="mb-6"
    />
    <Link to="/" className=" bg-purple-900 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors duration-300">
      Go to Homepage
    </Link>
  </div>
</div>

    </>
    
  );
};

export default TwineStory;
