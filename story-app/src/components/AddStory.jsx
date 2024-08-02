import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddStory = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [source, setSource] = useState(null);
    const [category, setCategory] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const categories = [
        'adventure',
        'mystery',
        'romance',
        'science fiction',
        'horror',
        'fantasy',
    ];

    useEffect(() => {
        fetch('http://localhost/story-app/backend/addStory.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ action: 'check_admin' }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.isAdmin) {
                    setIsAdmin(true);
                } else {
                    navigate('/');
                }
            })
            .catch(error => console.error('Error checking admin status:', error));
    }, [navigate]);


    const handleAddStory = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('category', category);
        formData.append('action', 'add_story');
        if (image) formData.append('image', image);
        if (source) formData.append('source', source);
    
        try {
            const response = await fetch('http://localhost/story-app/backend/addStory.php', {
                method: 'POST',
                body: formData,
                credentials: 'include',
            });
    
            // Log response status and headers for debugging
            console.log('Response Status:', response.status);
            console.log('Response Headers:', response.headers.get('Content-Type'));
    
            // Check if the response is JSON
            const contentType = response.headers.get('Content-Type');
            if (contentType && contentType.includes('application/json')) {
                const data = await response.json();
                console.log('Response Data:', data);
    
                if (data.success) {
                    // Clear form and set success message
                    setTitle('');
                    setDescription('');
                    setImage(null);
                    setSource(null);
                    setCategory('');
                    setMessage(data.message); // Success message
                } else {
                    // Handle server-side errors
                    setMessage(`Server error: ${data.message}`);
                }
            } else {
                // Handle unexpected response format
                const text = await response.text();
                setMessage(`Unexpected response format: ${text}`);
            }
        } catch (error) {
            // Handle network or fetch errors
            console.error('Fetch Error:', error);
            setMessage('An error occurred while adding the story');
        }
    };
    
    

    

    if (!isAdmin) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto p-4 w-1/2">
            <h1 className="text-2xl font-bold mb-4 text-white">Add a New Story</h1>
            <form onSubmit={handleAddStory} className="bg-black bg-opacity-65 p-6 rounded-lg shadow-md">
                <div className="mb-4">
                    <label className="block text-white text-sm font-bold mb-2">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg focus:outline-none"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-white text-sm font-bold mb-2">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg focus:outline-none"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-white text-sm font-bold mb-2">Image</label>
                    <input
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])}
                        className="w-full px-4 py-2 rounded-lg text-blue-900"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-white text-sm font-bold mb-2">Source (HTML file)</label>
                    <input
                        type="file"
                        onChange={(e) => setSource(e.target.files[0])}
                        className="w-full px-4 py-2 rounded-lg text-blue-900"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-white text-sm font-bold mb-2">Category</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg"
                        required
                    >
                        <option value="">Select a category</option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="text-center">
                    <button
                        type="submit"
                        className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-500 transition-colors duration-300"
                    >
                        Add Story
                    </button>
                </div>
                {message && <div className="text-white mt-4">{message}</div>}
            </form>
        </div>
    );
};

export default AddStory;
