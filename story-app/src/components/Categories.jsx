import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  { id: 1, name: 'adventure', description: 'Explore thrilling adventures and epic quests.' },
  { id: 2, name: 'mystery', description: 'Dive into intriguing mysteries and solve puzzles.' },
  { id: 3, name: 'romance', description: 'Experience heartfelt romances and love stories.' },
  { id: 4, name: 'science Fiction', description: 'Journey through futuristic and sci-fi worlds.' },
  { id: 4, name: 'horror', description: 'Experience the pure horror of these thrilling stories.' },
  { id: 4, name: 'fantasy', description: 'The fairies, magical creatures and unbeliavably dreamy worlds are awaiting.' },
];

const Categories = () => {
  return (
    <>
    <div className="p-6 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-white">Story Categories</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map(category => (
          <div key={category.id} className="bg-black bg-opacity-55 rounded-lg shadow-lg overflow-hidden">
            <img
              src={`https://via.placeholder.com/400x250?text=${category.name}`}
              alt={category.name}
              className="w-full h-32 object-cover bg"
            />
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-2 text-gray-100">{category.name}</h2>
              <p className="text-gray-100">{category.description}</p>
              <button className="mt-4 px-4 py-2 bg-purple-900 text-white rounded hover:bg-purple-600">
              <Link to={`/category/${category.name}`}>
            Explore
          </Link>
              </button>
              
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}

export default Categories;
