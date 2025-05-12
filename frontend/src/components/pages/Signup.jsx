import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router';
import SignupSVG from '../../assets/signup1.svg';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/auth/signup`,
        formData,
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );

      if (res.status === 201 || res.status === 200) {
        alert('Signup successful!');
        console.log(res.data);
        navigate('/');
      }
    } catch (err) {
      console.error('Signup error:', err);
      const message =
        err.response?.data?.message || 'Something went wrong.';
      alert(message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-sky-100 to-blue-200 px-4">
      <div className="bg-white shadow-xl rounded-xl flex max-w-4xl w-full overflow-hidden">
        {/* ✅ SVG Section */}
        <div className="hidden md:flex w-1/2 items-center justify-center bg-blue-600 p-6">
         <img src={SignupSVG} alt="Signup" />
        </div>

        {/* ✅ Form Section */}
        <form
          onSubmit={handleSubmit}
          className="w-full md:w-1/2 p-8"
        >
          <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Create Account</h2>

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full mb-6 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold p-3 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Sign Up
          </button>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-blue-600 font-semibold hover:underline"
            >
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
