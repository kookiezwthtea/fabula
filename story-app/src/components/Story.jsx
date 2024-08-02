// src/components/Story.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const Story = () => {
  const { id } = useParams();
  const [storyData, setStoryData] = useState(null);
  const [currentSegment, setCurrentSegment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost/story-app/backend/getStory.php?story_id=${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setStoryData(data);
        setCurrentSegment(data.segments[0]); // Start with the first segment
        setLoading(false);
      })
      .catch(error => {
        setError(error.toString());
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  const handleChoiceClick = (nextSegmentId) => {
    const nextSegment = storyData.segments.find(segment => segment.id === nextSegmentId);
    setCurrentSegment(nextSegment);
  };

  return (
    <div className="container mx-auto p-4 bg-black bg-opacity-80 text-white rounded-lg shadow-md mt-8 max-w-2xl ">
      <div className="p-6">
        <p className="text-lg font-semibold mb-4">{currentSegment.text}</p>
        <div className="space-y-4">
          {currentSegment.choices.map((choice, index) => (
            <button
              key={index}
              className="block w-full bg-purple-900 text-white py-2 px-4 rounded hover:bg-purple-700 transition-colors duration-300"
              onClick={() => handleChoiceClick(choice.next_segment_id)}
            >
              {choice.choice_text}
            </button>
          ))}
        </div>
        <Link
          to="/"
          className="block mt-4 text-sm text-gray-400 hover:text-gray-200"
        >
          Go Back
        </Link>
      </div>
    </div>
  );
};

export default Story;
