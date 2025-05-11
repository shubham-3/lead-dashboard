import React from 'react'
import { Link } from 'react-router'
import useLogout from '../hooks/useLogout.jsx';

const Navbar = () => {
      const logout = useLogout();

  return (
     <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="text-2xl font-bold text-blue-700">
          LeadTracker
        </div>
        <div className="space-x-4">
            <Link to="/" className="text-blue-600 hover:text-blue-800 font-medium">
            Home
          </Link>
          <Link to="/dashboard" className="text-blue-600 hover:text-blue-800 font-medium">
            Dashboard
          </Link>
        <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded">
          Logout
        </button>
        </div>
      </nav>
  )
}

export default Navbar