import React, { useState } from 'react';

const NotificationIcon = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New story "The Haunting of Blackwood Manor" is up.' },
    { id: 2, message: 'Check mystery section for the most favourited unsolved mystery stories.' },
  ]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleClick = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        className="p-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-colors duration-300"
      >
        <i className="fas fa-bell fa-lg"></i>
        {notifications.length > 0 && (
          <span className="absolute top-0 right-0 flex items-center justify-center w-4 h-4 bg-red-500 text-white text-xs font-bold rounded-full">
            {notifications.length}
          </span>
        )}
      </button>
      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white text-black shadow-lg rounded-lg z-10">
          <ul className="p-2">
            {notifications.length === 0 ? (
              <li className="p-2 text-center">No new notifications</li>
            ) : (
              notifications.map(notification => (
                <li key={notification.id} className="p-2 border-b">
                  {notification.message}
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NotificationIcon;
