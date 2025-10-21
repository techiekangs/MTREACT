import './App.css';

import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";

import Navbar from './Components/Navbar/Navbar';
import CMNavbar from './Components/Navbar/CM_Navbar';
import SideNav from './Components/SideNavbar/SideNav';

import SplashScreen from "./Components/Splash/SplashScreen";
import Header from './Page/Public/Main';
import About from './Page/Public/About';
import Testimony from './Page/Public/Testimony';
import Contact from './Page/Public/Contact';


import Main from './Page/ContentManagement/User/Main';
import Login from './Page/ContentManagement/User/Login';
import Register from './Page/ContentManagement/User/Register';

import Index from './Page/ContentManagement/Index/Main';
import Dashboard from './Page/ContentManagement/Dashboard/Main';
import Pages from './Page/ContentManagement/Pages/Main';
import CM_About from './Page/ContentManagement/Pages/Editor/Main';
import Edit_About from './Page/ContentManagement/Pages/Editor/EditContent';

import Role from './Page/ContentManagement/Maintenance/Role/Role';
import User from './Page/ContentManagement/Maintenance/User/User';
import User_Manage from './Page/ContentManagement/Maintenance/User/Manage';

import { Sidebar } from 'lucide-react';
export default function App() {
  const [showSplash, setShowSplash] = useState(() => {
    // 🌼 Only show if it hasn't been shown before
    return !localStorage.getItem("splashShown");
  });
  const [isCollapsed, setIsCollapsed] = useState(false);

  const location = useLocation();
  const path = location.pathname;

  // 🌼 Check if user is inside ContentManagement pages
  const inCM = path.startsWith("/ContentManagement");
  const isAuthPage =
    path === "/ContentManagement/Login" || path === "/ContentManagement/Register";

  const handleSplashFinish = () => {
    setShowSplash(false);
    localStorage.setItem("splashShown", "true"); // ✅ Remember across pages
  };
  //redirect
  function ExternalRedirect({ url }) {
  useEffect(() => {
    window.location.href = url;
  }, [url]);

  return null; // nothing to render
}
  return (
    <>
      {showSplash ? (
        <SplashScreen onFinish={handleSplashFinish} />
      ) : (
        <div className="flex flex-col min-h-screen font-['Montserrat']">
          {/* 🌸 Navbar logic */}
          {!inCM && <Navbar />}
          {inCM && isAuthPage && null}

          {/* 🌸 Content Management layout */}
          {inCM && !isAuthPage && (
            <>
              <CMNavbar
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
              />
              <SideNav isCollapsed={isCollapsed} />

              <div
                className={`flex flex-1 transition-all duration-300 ${isCollapsed ? "ml-20" : "ml-64"
                  }`}
              >
                {inCM && !isAuthPage && (
                  <main className="flex-1 mt-16 bg-sky-100">
                    <Routes>
                      <Route
                        path="/ContentManagement"
                        element={<Index isCollapsed={isCollapsed} />}
                      >
                        <Route index element={<Navigate to="Dashboard" replace />} />
                        <Route path="Dashboard" element={<Dashboard />} />
                        <Route path="Pages" element={<Pages />} />
                        <Route path="Pages/Editor/:sectionTitle" element={<CM_About />} />
                        <Route path="Maintenance/Role" element={<Role />} />
                        <Route path="Maintenance/User" element={<User />} />
                        <Route path="Maintenance/User/Manage" element={<User_Manage />} />
                      </Route>
                    </Routes>
                  </main>
                )}
              </div>
            </>
          )}
          {inCM && isAuthPage && (
            <>
              <Navbar />
              <main className="flex-1">
                <Routes>
                  <Route path="/ContentManagement" element={<Main />}>
                    <Route index element={<Navigate to="Login" replace />} />
                    <Route path="Login" element={<Login />} />
                    <Route path="Register" element={<Register />} />
                  </Route>
                </Routes>
              </main>
            </>
          )}

          {/* 🌸 Public pages layout */}
          {!inCM && (
            <div className="flex flex-1">
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Header />} />
                  <Route
  path="/Login"
  element={<ExternalRedirect url="https://manilateachersonline.com/Login" />}
/>
                  <Route path="/About" element={<About />} />
                  <Route path="/Testimonies" element={<Testimony />} />
                  <Route path="/Contact" element={<Contact />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>
            </div>
          )}
        </div>
      )}
    </>
  );
}
