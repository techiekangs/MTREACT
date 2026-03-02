import './App.css';

import { useEffect, useState } from "react";
import {
  Routes,
  Route,
  Navigate,
  useLocation
} from "react-router-dom";

import Navbar from './Components/Navbar/Navbar';
import CMNavbar from './Components/Navbar/CM_Navbar';
import SideNav from './Components/SideNavbar/SideNav';

import SplashScreen from "./Components/Splash/SplashScreen";

import Header from './Page/Public/Main';
import About from './Page/Public/About';
import Testimony from './Page/Public/Testimony';
import FAQs from './Page/Public/FAQs';
import Careers from './Page/Public/Careers';
import Contact from './Page/Public/Contact';
import Read_More from './Page/Public/Extended/Read_More';

import Main from './Page/ContentManagement/User/Main';
import Login from './Page/ContentManagement/User/Login';
import Register from './Page/ContentManagement/User/Register';

import Index from './Page/ContentManagement/Index/Main';
import Dashboard from './Page/ContentManagement/Dashboard/Main';
import Pages from './Page/ContentManagement/Pages/Main';
import CM_About from './Page/ContentManagement/Pages/Editor/Main';

import Role from './Page/ContentManagement/Maintenance/Role/Role';
import User from './Page/ContentManagement/Maintenance/User/User';
import User_Manage from './Page/ContentManagement/Maintenance/User/Manage';

import Gallery from './Page/ContentManagement/Gallery/Main';

export default function App() {

  const [showSplash, setShowSplash] = useState(() => {
    return !localStorage.getItem("splashShown");
  });

  const [isCollapsed, setIsCollapsed] = useState(false);

  const location = useLocation();
  const path = location.pathname;

  const inCM = path.startsWith("/ContentManagement");

  const isAuthPage =
    path === "/ContentManagement/Login" ||
    path === "/ContentManagement/Register";

  const handleSplashFinish = () => {
    setShowSplash(false);
    localStorage.setItem("splashShown", "true");
  };

  function ExternalRedirect({ url }) {
    useEffect(() => {
      window.location.href = url;
    }, [url]);
    return null;
  }

  if (showSplash) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  return (
    <div className="flex flex-col min-h-screen font-['Montserrat']">

      {/* 🌸 Public navbar */}
      {!inCM && <Navbar />}

      {/* 🌸 CM navbar + sidenav */}
      {inCM && !isAuthPage && (
        <>
          <CMNavbar
            isCollapsed={isCollapsed}
            setIsCollapsed={setIsCollapsed}
          />
          <SideNav isCollapsed={isCollapsed} />
        </>
      )}

      {/* 🌼 Main content */}
      <main
        className={`flex-1 ${
          inCM && !isAuthPage
            ? isCollapsed ? "ml-20 mt-16 bg-sky-100" : "ml-64 mt-16 bg-sky-100"
            : ""
        }`}
      >

        <Routes>

          {/* 🌸 CONTENT MANAGEMENT AUTH */}
          <Route path="/ContentManagement" element={<Main />}>
            <Route index element={<Navigate to="Login" replace />} />
            <Route path="Login" element={<Login />} />
            <Route path="Register" element={<Register />} />
          </Route>

          {/* 🌸 CONTENT MANAGEMENT SYSTEM */}
          <Route path="/ContentManagement" element={<Index />}>

            <Route path="Dashboard" element={<Dashboard />} />
            <Route path="Pages" element={<Pages />} />
            <Route path="Pages/Editor/:sectionTitle" element={<CM_About />} />
            <Route path="Gallery" element={<Gallery />} />
            <Route path="Maintenance/Role" element={<Role />} />
            <Route path="Maintenance/User" element={<User />} />
            <Route path="Maintenance/User/Manage" element={<User_Manage />} />

          </Route>


          {/* 🌸 PUBLIC */}
          <Route path="/" element={<Header />} />

          <Route
            path="/Login"
            element={<ExternalRedirect url="https://manilateachersonline.com/Login" />}
          />

          <Route path="/About" element={<About />} />
          <Route path="/Testimonies" element={<Testimony />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Careers" element={<Careers />} />
          <Route path="/FAQs" element={<FAQs />} />

          <Route
            path="/0/:sectionTitle/:bulletHeader"
            element={<Read_More />}
          />

          {/* fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>

      </main>

    </div>
  );
}