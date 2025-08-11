import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';

import Home from './Page/Home'
import About from './Page/About';
import Contact from './Page/Contact';

export default function App() {
  return (
    <div>
      {/* Main content with margin-left for sidebar and padding */}
      <main className="ml-64 p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </div>
  );
}