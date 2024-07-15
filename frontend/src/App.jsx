import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './screens/Login';
import Signup from './screens/Signup';
import CreateRoom from './screens/CreateRoom';
//import Signup from './components/Signup';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="max-w-md w-full space-y-8">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/create" element={<CreateRoom />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
