'use client';

import { useState } from 'react';
import Link from 'next/link';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Handle login logic
    console.log('Login with:', email, password);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-white">
      {/* Status Bar */}
      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
        }
      `}</style>

      {/* App name */}
      <h1 className="jua text-4xl font-bold text-orange-500">PetBuddy</h1>

      {/* Title */}
      <h2 className="jua text-4xl text-gray-800 mt-4">Login</h2>
      <p className="poppins text-xs text-gray-600 mt-2">Enter your login information</p>

      {/* Email */}
      <div className="poppins w-full max-w-xs mt-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">Email*</label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {/* Password */}
      <div className="poppins w-full max-w-xs mt-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Password*</label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {/* Login Button */}
      <button
        className="poppins bg-orange-500 text-white py-2 px-4 rounded mt-6"
        onClick={handleLogin}
      >
        Login
      </button>

      {/* Link to Sign Up */}
      <p className="poppins mt-4">
        Don't have an account?{' '}
        <Link href="/signout/signup" className="text-blue-500 hover:underline">
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default Login;