import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import Navbar from './Components/Navbar/Navbar.jsx';
import SideNav from './Components/SideNavBar/SideNav.jsx';
import App from './App.jsx';
import { Suspense, lazy, useState } from "react";
import SplashScreen from "./Page/SplashScreen.jsx";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar />
      <div className="flex">
        {/* <SideNav /> */}
        <main className="flex-1">
          <App />
        </main>
      </div>
    </BrowserRouter>
  </StrictMode>,
);