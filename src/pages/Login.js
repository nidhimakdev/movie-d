import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email));
    localStorage.setItem('isLoggedIn', 'true');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center overflow-hidden">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-8 text-pink-500">Movie Mania</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your email"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-600 focus:outline-none focus:bg-indigo-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
