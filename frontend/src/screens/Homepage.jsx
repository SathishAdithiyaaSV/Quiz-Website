// src/HomePage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/constants/Navbar';
const BACKEND_URL =
  import.meta.env.VITE_APP_BACKEND_URL ?? 'http://localhost:3000';

const HomePage = () => {
  const [rooms, setRooms] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    async function getRooms() {
      const response = await fetch(`${BACKEND_URL}/api/users`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${getJwt()}`
          },
      });

      const json = await response.json();
      if(json.rooms)
      {
        setRooms(json.rooms);
        setLoggedIn(true);
      }
      else if(json.error)
        setLoggedIn(false);
  }
  try {
    getRooms();
  } catch (error) {
    console.log(error);
  }
  }, []);

  const getJwt = () => {
    return localStorage.getItem('jwtToken');
  };


  const [roomId, setRoomId] = useState('');


  return (
    <div>
    <div className="dark min-h-screen bg-gray-900 text-white">
    <Navbar currentPage={0} loggedIn={loggedIn}/>
      <main className="p-4">
      <div className="mt-8 flex justify-center items-center">
          <span className="mr-4">Got a code? Please join</span>
          <input 
            type="text" 
            value={roomId} 
            onChange={(e) => setRoomId(e.target.value)} 
            className="p-2 bg-gray-800 rounded text-white"
            placeholder="Enter room ID"
          />
          <button 
            className="ml-2 bg-blue-600 p-2 rounded"
          >
            <Link to={'/room/' + roomId}>
            Join
            </Link>
          </button>
        </div>
        <h1 className="text-2xl font-bold mb-4">Your rooms</h1>
        {!loggedIn && (<p>Please <Link to='/login'>Login</Link> to see your rooms</p>)}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rooms.map(room => (
            <Link to={'/room/' + room._id.toString()}>
            <div key={room._id} className="bg-gray-800 p-4 rounded shadow-md">
              <h2 className="text-xl font-bold">{room.name}</h2>
              <p>Room Id : {room._id.toString()}</p>
            </div>
            </Link>
          ))}
        </div>  
      </main>
    </div>
    </div>
  );
}

export default HomePage;
