import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './screens/Login';
import Signup from './screens/Signup';
import CreateRoom from './screens/CreateRoom';
import Game from './screens/Game';
import HomePage from './screens/Homepage';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="w-full">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/create" element={<CreateRoom />} />
           <Route path="/room/:roomId" element={<Game />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
