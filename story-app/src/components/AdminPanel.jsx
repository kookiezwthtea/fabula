import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const AdminPanel = () => {
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        fetch('http://fabula.great-site.net/addStory.php', {
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

      if (!isAdmin) {
        return <div>Loading...</div>;
      }


  return (
    <div className="container mx-auto p-4 mb-64">
      <h1 className="text-3xl font-bold mb-6 text-white mt-2">Admin Panel</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link
          to="/admin/add-story"
          className="bg-gray-800 text-white p-6 rounded-lg shadow-lg hover:bg-gray-700 transition-colors duration-300"
        >
          <h2 className="text-xl font-semibold mb-2">Add New Stories</h2>
          <p>Add new stories.</p>
        </Link>
        <Link
          to="/admin/stories"
          className="bg-gray-800 text-white p-6 rounded-lg shadow-lg hover:bg-gray-700 transition-colors duration-300"
        >
          <h2 className="text-xl font-semibold mb-2">Manage Stories</h2>
          <p>View, edit, and delete stories.</p>
        </Link>
        <Link
          to="/admin/users"
          className="bg-gray-800 text-white p-6 rounded-lg shadow-lg hover:bg-gray-700 transition-colors duration-300"
        >
          <h2 className="text-xl font-semibold mb-2">Manage Users</h2>
          <p>View, edit, and manage user accounts.</p>
        </Link>
        
        <Link
          to="/admin/settings"
          className="bg-gray-800 text-white p-6 rounded-lg shadow-lg hover:bg-gray-700 transition-colors duration-300"
        >
          <h2 className="text-xl font-semibold mb-2">Settings</h2>
          <p>Manage application and profile settings.</p>
        </Link>
        <Link
          to="/admin/reports"
          className="bg-gray-800 text-white p-6 rounded-lg shadow-lg hover:bg-gray-700 transition-colors duration-300"
        >
          <h2 className="text-xl font-semibold mb-2">Reports</h2>
          <p>Generate and view reports.</p>
        </Link>
        <Link
          to="/admin/notifications"
          className="bg-gray-800 text-white p-6 rounded-lg shadow-lg hover:bg-gray-700 transition-colors duration-300"
        >
          <h2 className="text-xl font-semibold mb-2">Notifications</h2>
          <p>Send and manage notifications.</p>
        </Link>
      </div>
    </div>
  );
};

export default AdminPanel;
