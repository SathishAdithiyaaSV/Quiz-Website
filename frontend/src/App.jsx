import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './screens/Login';
import Signup from './screens/Signup';
import CreateRoom from './screens/CreateRoom';
import Game from './screens/Game';
import HomePage from './screens/Homepage';
import Profile from './screens/Profile';
import ParticleSimulator from './screens/Particle';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <Router>
      <div className="min-h-screen flex bg-gray-900">
        <div className="w-full">
          <Routes>
            <Route path="/" element={<HomePage loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/create" element={<CreateRoom loggedIn={loggedIn}/>} />
            <Route path="/profile" element={<Profile />} /> 
            <Route path="/particle" element={<ParticleSimulator />} /> 
           <Route path="/room/:roomId" element={<Game />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
