import React from 'react';
import { useNavigate } from 'react-router';
import useAuth from '../hooks/useAuth.jsx';
import Navbar from './Navbar.jsx';
import homeSvg from '../../assets/home1.svg'; // Ensure you have this SVG in your assets
const Home = () => {
  const { loading, user } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-xl font-semibold text-blue-600">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <main className="flex flex-col md:flex-row items-center justify-center gap-12 py-20 px-6 max-w-6xl mx-auto">
        {/* Left Text Section */}
        <div className="text-center md:text-left max-w-xl">
          <h1 className="text-5xl font-extrabold text-blue-800 leading-tight mb-4">
            Welcome, {user?.username}!
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            You’ve successfully logged in to <span className="font-semibold text-blue-600">LeadTracker</span>.
            Get started by viewing your campaign performance and leads dashboard.
          </p>

          <button
            onClick={() => navigate('/dashboard')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md text-lg font-semibold transition"
          >
            Go to Dashboard
          </button>
        </div>

        {/* Right Illustration */}
        <div className="w-full max-w-md">
          <img src={homeSvg} alt="home"/>
        </div>
      </main>

      {/* Optional Feature Section */}
      <section className="py-12 px-6 max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6 text-center hover:shadow-lg transition">
          <h3 className="text-lg font-bold text-blue-700 mb-2">Track Leads</h3>
          <p className="text-sm text-gray-600">
            Instantly monitor your leads and optimize conversion performance.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 text-center hover:shadow-lg transition">
          <h3 className="text-lg font-bold text-blue-700 mb-2">Campaign Insights</h3>
          <p className="text-sm text-gray-600">
            Get real-time insights and visualize your campaign growth.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 text-center hover:shadow-lg transition">
          <h3 className="text-lg font-bold text-blue-700 mb-2">Simple Dashboard</h3>
          <p className="text-sm text-gray-600">
            All your performance metrics organized in one clean interface.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
