import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editUser, setEditUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://fabula.great-site.net/userManagement.php');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://fabula.great-site.net/userManagement.php', {
        user,
        email,
        password,
      });
      if (response.data.success) {
        fetchUsers();
        setUser('');
        setEmail('');
        setPassword('');
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const handleEditUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('http://fabula.great-site.net/userManagement.php', {
        user: editUser,
        email,
        password,
      });
      if (response.data.success) {
        fetchUsers();
        setEditMode(false);
        setUser('');
        setEmail('');
        setPassword('');
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDeleteUser = async (user) => {
    try {
      const response = await axios.delete('http://fabula.great-site.net/userManagement.php', {
        data: { user },
      });
      if (response.data.success) {
        fetchUsers();
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const startEditUser = (user) => {
    setEditMode(true);
    setEditUser(user.user);
    setUser(user.user);
    setEmail(user.email);
    setPassword('');
  };

  //check if admin
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
    <div className="container mx-auto mt-4 mb-4 p-6 bg-black bg-opacity-55 rounded-lg shadow-md lg:w-1/2">
      <h1 className="text-2xl font-bold mb-6 text-white">Manage Users</h1>
      <form onSubmit={editMode ? handleEditUser : handleAddUser} className="space-y-4 mb-6 ">
        <div>
          <label className="block text-sm font-bold mb-2 text-white">User</label>
          <input
            type="text"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-200 focus:outline-none"
            required
            disabled={editMode}
          />
        </div>
        <div>
          <label className="block text-sm font-bold mb-2 text-white">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-200 focus:outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-bold mb-2 text-white">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-200 focus:outline-none"
            required={!editMode}
          />
        </div>
        <div>
          <button
            type="submit"
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-500 transition-colors duration-300"
          >
            {editMode ? 'Update User' : 'Add User'}
          </button>
          {editMode && (
            <button
              type="button"
              className="ml-4 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition-colors duration-300"
              onClick={() => {
                setEditMode(false);
                setUser('');
                setEmail('');
                setPassword('');
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
      <table className="w-full bg-white rounded-lg shadow-md">
  <thead>
    <tr className="bg-gray-200 text-left">
      <th className="py-2 px-4">#</th>
      <th className="py-2 px-4">User</th>
      <th className="py-2 px-4">Email</th>
      <th className="py-2 px-4">Actions</th>
    </tr>
  </thead>
  <tbody>
    {users.map((user, index) => (
      <tr key={user.user} className="border-t">
        <td className="py-2 px-4">{index + 1}</td> 
        <td className="py-2 px-4">{user.user}</td>
        <td className="py-2 px-4">{user.email}</td>
        <td className="py-2 px-4">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors duration-300 mr-2"
            onClick={() => startEditUser(user)}
          >
            Edit
          </button>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition-colors duration-300"
            onClick={() => handleDeleteUser(user.user)}
          >
            Delete
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

    </div>
  );
};

export default ManageUsers;
