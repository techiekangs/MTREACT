import { NavLink, useLocation } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
function Navbar() {
  const location = useLocation();
  const path = location.pathname;
  const hash = location.hash;
  const hideFlexBlock =
    path === "/ContentManagement/Login" || path === "/ContentManagement/Register";
   const handleScroll = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' }); // scroll smoothly
      window.history.replaceState(null, '', `#${id}`); // update URL hash
    }
  };  
  return (
    <nav className="bg-transparent absolute top-0 left-0 w-full z-50 p-3">
      <div className=" mx-auto px-10 py-3">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <NavLink to="/" className="text-2xl font-bold text-pink-400 hover:text-pink-600 cursor-pointer">
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
               <button
              onClick={() => handleScroll('About')}
              className={`navlink ${location.hash === '#About' ? 'navlink-active' : ''}`}
            >
              About
            </button>

            <button
              onClick={() => handleScroll('News')}
              className={`navlink ${location.hash === '#News' ? 'navlink-active' : ''}`}
            >
              News
            </button>

            <button
              onClick={() => handleScroll('Events')}
              className={`navlink ${location.hash === '#Events' ? 'navlink-active' : ''}`}
            >
              Events
            </button>
              <NavLink
                to="FAQs"
                className={({ isActive }) =>
                  `navlink ${isActive ? 'navlink-active' : ''}`
                }
              >
                FAQs
              </NavLink>
              <NavLink
                to="/Contact"
                className={({ isActive }) =>
                  `navlink ${isActive ? 'navlink-active' : ''}`
                }
              >
                Contact
              </NavLink>
              <NavLink
                to="/Careers"
                className={({ isActive }) =>
                  `navlink ${isActive ? 'navlink-active' : ''}`
                }
              >
                Careers
              </NavLink>
              <a
                href="https://manilateachersonline.com/Registration_Page_1"
                className=
                "px-4 py-2 rounded font-medium text-white transition-all duration-300 shadow-md bg-gradient-to-r from-pink-600 to-pink-800 hover:from-pink-800 hover:to-pink-800"

              >
                Register
              </a>
              <a
                href="https://manilateachersonline.com/Login"
                className=
                "px-4 py-2 rounded font-medium text-white transition-all duration-300 shadow-md bg-gradient-to-r from-pink-600 to-pink-800 hover:from-pink-800 hover:to-pink-800"

              >
                Login
              </a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;