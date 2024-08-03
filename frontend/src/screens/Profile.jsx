// src/Profile.js
import React, {useState, useEffect} from 'react';
import Navbar from '../components/constants/Navbar';
const BACKEND_URL =
  import.meta.env.VITE_APP_BACKEND_URL ?? 'http://localhost:3000';

const Profile = () => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        async function getProfile() {
          const response = await fetch(`${BACKEND_URL}/api/users/profile`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${getJwt()}`
              },
          });
    
          const json = await response.json();
          setUsername(json.username);
          setEmail(json.email);
      }
      try {
        getProfile();
      } catch (error) {
        console.log(error);
      }
      }, []);

      const getJwt = () => {
        return localStorage.getItem('jwtToken');
      };


  return (
    <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4">Profile</h1>
        <div className="mb-4">
          <span className="text-gray-400">Username:</span>
          <p className="text-lg font-semibold">{username}</p>
        </div>
        <div>
          <span className="text-gray-400">Email:</span>
          <p className="text-lg font-semibold">{email}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
