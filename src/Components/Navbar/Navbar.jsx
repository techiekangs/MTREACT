import { NavLink,  useLocation } from 'react-router-dom';

function Navbar() {
    const location = useLocation();
    const path = location.pathname;

   const hideFlexBlock =
    path === "/ContentManagement/Login" || path === "/ContentManagement/Register";
  return (
    <nav className="bg-transparent absolute top-0 left-0 w-full z-50 p-3">
      <div className=" mx-auto px-10 py-3">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <NavLink to="/" className="text-2xl font-bold text-pink-200 hover:text-pink-500 cursor-pointer">
            🌸 Philippine Teachers
          </NavLink>

          {/* Navigation Links */}
          {!hideFlexBlock && (
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
  to="/Login"
  className={({ isActive }) =>
    `px-4 py-2 rounded font-medium text-white transition-all duration-300 shadow-md
     ${isActive
        ? "bg-gradient-to-r from-pink-800 to-pink-600" // Active = darker gradient
        : "bg-gradient-to-r from-pink-600 to-pink-800 hover:from-pink-800 hover:to-pink-800"}`
  }
>
  Sign Up / Login
</NavLink>
          </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;