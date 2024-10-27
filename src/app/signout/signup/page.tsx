'use client';

import { useState } from 'react';
import Link from 'next/link';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-white">
      {/* App name */}
      <h1 className="jua text-4xl text-orange-500">PetBuddy</h1>

      {/* Title */}
      <h2 className="jua text-4xl text-black-800 mt-4">Registration</h2>
      <p className="poppins text-xs text-black-600 mt-2">Enter your information</p>

      {/* Username */}
      <div className="poppins w-full max-w-xs mt-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">Username*</label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      {/* Email */}
      <div className="poppins w-full max-w-xs mt-4">
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
      <div className="poppins w-full max-w-xs mt-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">Password*</label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {/* Confirm Password */}
      <div className="poppins w-full max-w-xs mt-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Confirm Password*</label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      {/* Terms and Conditions Checkbox */}
      <div className="poppins flex items-center mt-4">
        <input
          type="checkbox"
          checked={termsAccepted}
          onChange={(e) => setTermsAccepted(e.target.checked)}
          className="mr-2"
        />
        <p className="text-xs text-gray-700">
          I acknowledge that I have read the{' '}
          <span className="text-blue-500 underline cursor-pointer" onClick={toggleModal}>
            Terms and Conditions
          </span>.
        </p>
      </div>

      {/* Register Button */}
      <button
        className="poppins bg-orange-500 text-white py-2 px-4 rounded mt-6"
        onClick={() => {
          if (username && email && password && confirmPassword && termsAccepted) {
            if (password === confirmPassword) {
              window.location.href = '/signout/signup/createProfile';
            } else {
              alert('Passwords do not match');
            }
          } else {
            alert('Please fill in all fields and accept the terms and conditions');
          }
        }}
      >
        Register
      </button>

      {/* Modal */}
      {isModalVisible && (
        <div className="poppins fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-5 w-11/12 max-w-lg">
            <h3 className="text-xl font-bold mb-3">Terms and Conditions</h3>
            <p className="text-base text-justify">This is the modal content.</p>
            <button
              className="mt-4 bg-orange-500 text-white py-2 px-4 rounded"
              onClick={toggleModal}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Link to Login */}
      <p className="poppins mt-4">
        Already have an account?{' '}
        <Link href="/signout/login" className="text-blue-500 underline">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;