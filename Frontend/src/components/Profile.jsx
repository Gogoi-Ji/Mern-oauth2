// client/src/components/Profile.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return <p className="text-center mt-10 text-gray-600">No user data found.</p>;
  }

  return (
    <div className="flex flex-col items-center mt-10 space-y-4">
      <img
        src={user.picture}
        alt={user.name}
        className="w-24 h-24 rounded-full shadow-md"
      />
      <h2 className="text-2xl font-semibold">{user.name}</h2>
      <p className="text-gray-700">{user.email}</p>

      <button
        onClick={logout}
        className="mt-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
