import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const BACKEND_URL =
  import.meta.env.VITE_APP_BACKEND_URL ?? 'http://localhost:3000';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle login logic with username and password
    const response = await fetch(`${BACKEND_URL}/api/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
          },
        body: JSON.stringify({
          username: username,
          password: password
        }),
      });

      const json = await response.json();
      localStorage.setItem("jwtToken", json.token);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="p-8 bg-gray-800 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              className="w-full p-2 rounded bg-gray-700 border border-gray-600"
              placeholder="Enter your username"
              onChange={ e => setUsername(e.target.value) }
            />
          </div>
          <div className="mb-4 relative">
            <label className="block mb-2" htmlFor="password">Password</label>
            <input
              type={passwordShown ? "text" : "password"}
              id="password"
              className="w-full p-2 rounded bg-gray-700 border border-gray-600"
              placeholder="Enter your password"
              onChange = { e => setPassword(e.target.value) }
            />
            <div
              className="absolute inset-y-0 right-0 p-0 b-0 flex items-center pr-3 cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {passwordShown ? <FaEye /> : <FaEyeSlash />}
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Login
          </button>
          <p className="mt-4 text-center">
          New user? Please <span className="text-blue-500 cursor-pointer" ><Link to={'/signup'} >Sign Up</Link></span>
        </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
