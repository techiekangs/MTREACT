import { NavLink, useLocation } from 'react-router-dom';
import { Menu } from "lucide-react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../fontawesome";

export function CM_Navbar({ isCollapsed, setIsCollapsed }) {
  const location = useLocation();
  const path = location.pathname;
  const user = JSON.parse(localStorage.getItem("user"));
  const username = user?.Username;

  console.log("username:", username);
  const hideFlexBlock = path === "/ContentManagement/Login" || path === "/ContentManagement/Register";
  const pageTitles = {
    "/ContentManagement/Dashboard": "Dashboard",
    "/ContentManagement/Pages": "Pages",
    "/ContentManagement/Galleries": "Galleries",
    "/ContentManagement/Maintenance/Users": "Maintenance > Users",
    "/ContentManagement/Maintenance/Roles": "Maintenance > Roles",
    "/ContentManagement/Maintenance/Permission": "Maintenance > Permission",
  };

  let currentPage = pageTitles[path] || "";

  // 🌼 Handle dynamic routes like /ContentManagement/Pages/Editor/vision-mission
  if (path.startsWith("/ContentManagement/Pages/Editor/")) {
    const section = path.split("/").pop(); // get last part
    const readable = section
      .replace(/-/g, " ")        // convert hyphens to spaces
      .replace(/\b\w/g, c => c.toUpperCase()); // capitalize each word
    currentPage = `Pages > ${readable}`;
  }

  return (
    <div className="">
      <header className={`fixed top-0 transition-all duration-300 ease-in-out z-50 p-3 bg-white
  ${isCollapsed ? "left-20 w-[calc(100%-5rem)]" : "left-64 w-[calc(100%-16rem)]"}`}>
        <div className="flex flex-col h-auto px-6">
          <div className="flex justify-between items-center h-16 w-full">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="p-2 hover:bg-gray-100 rounded"
              >
                <Menu className="w-6 h-6 text-sky-700" />
              </button>

              {/* 🌼 Current Page Name */}
              <span className="text-3xl font-semibold text-gray-700">
                {currentPage}
              </span>
            </div>

            {/* Navigation Links */}

            <div className="flex items-center space-x-6">

              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `navlink ${isActive ? 'navlink-active' : ''}`
                }
              >

              </NavLink>
              <button className=""
              >
                <FontAwesomeIcon icon="user" className="mr-2 text-sky-600" />
                {username}
                <span className="ml-2">
                  ▼
                </span>
              </button>
            </div>

          </div>
        </div>
      </header>
    </div>
  );
}

export default CM_Navbar;