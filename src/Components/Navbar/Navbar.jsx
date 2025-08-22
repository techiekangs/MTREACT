import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-transparent absolute top-0 left-0 w-full z-50 p-3">
      <div className=" mx-auto px-10 py-3">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <NavLink to="/" className="text-2xl font-bold text-pink-700 hover:text-pink-500 cursor-pointer">
            🌸 Philippine Teachers
          </NavLink>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
              `navlink ${isActive ? 'navlink-active' : ''}`
            }
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
              `navlink ${isActive ? 'navlink-active' : ''}` 
              }
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
              `navlink ${isActive ? 'navlink-active' : ''}`
              }
            >
              News & Events
            </NavLink>
            <NavLink
              to="/contact"
             className={({ isActive }) =>
              `navlink ${isActive ? 'navlink-active' : ''}`
              }
            >
              FAQs
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
              `navlink ${isActive ? 'navlink-active' : ''}`
              }
            >
              Contact
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
              `navlink ${isActive ? 'navlink-active' : ''}`
              }
            >
              Career
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                ` text-pink-900 hover:text-pink-600 transition-colors 
                border border-pink-600 rounded px-3 py-1 
                ${isActive ? 'bg-pink-600 text-white' 
                : 'border border-pink-600 text-pink-900 hover:bg-pink-600 hover:text-white'}`
              }
            >
              Sign Up/Login
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;