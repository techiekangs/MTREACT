import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-pink-200 shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <NavLink to="/" className="text-2xl font-bold text-pink-700 hover:text-pink-500 cursor-pointer">
            🌸 MySite
          </NavLink>

          {/* Navigation Links */}
          <div className="flex space-x-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-pink-900 hover:text-pink-600 transition-colors ${isActive ? 'font-bold text-pink-600' : ''}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `text-pink-900 hover:text-pink-600 transition-colors ${isActive ? 'font-bold text-pink-600' : ''}`
              }
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `text-pink-900 hover:text-pink-600 transition-colors ${isActive ? 'font-bold text-pink-600' : ''}`
              }
            >
              Contact
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;