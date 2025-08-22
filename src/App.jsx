import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';

import Header from './Page/Main'
import About from './Page/About';
import Contact from './Page/Contact';

export default function App() {
  return (
    <div>
      {/* Main content with margin-left for sidebar and padding */}
      <main className="">
        <Routes>
          <Route path="/" element={<Header />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </div>
  );
}