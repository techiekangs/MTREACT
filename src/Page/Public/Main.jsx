import { useEffect, useState, useMemo } from "react";

import Home from './Header.jsx';
import Statistic from './Statistic.jsx';
import About from './About.jsx';
import Advocacy from './Advocacy.jsx';
import Testimony from './Testimony.jsx';
import Footer from "./Footer.jsx";
import api from "../../API/api.js";


export default function Main() {

  const [sections, setSections] = useState([]);
  const [ready, setReady] = useState(false);

  
useEffect(() => {
  const fetchSections = async () => {
    try {
      const response = await api.get("/ContentManagement/Detail/Sections", {
        params: { SectionId: "" },
        headers: {
          Authorization: "bearer " + localStorage.getItem("token"),
          IpAddress: "::1",
          AppName: "MT",
        },
      });
      setSections(Array.isArray(response.data.Sections) ? response.data.Sections : []);
      setTimeout(() => setReady(true), 300);
    } catch (error) {
      console.error("❌ Failed to load sections:", error);
    }
  };
  fetchSections();
}, []);

if (!ready) return (
  <div className="flex items-center justify-center h-screen bg-white">
    <div className="w-10 h-10 border-4 border-pink-300 border-t-transparent rounded-full animate-spin" />
  </div>
);
  return (
    <div className="relative h-screen overflow-y-scroll snap-y snap-mandatory">
      {sections.length > 0 && (
        <section className="snap-start">
          <Home
            category={sections[0].SECTION_ID}
            layoutStyle={sections[0].LayoutStyle}
          />
        </section>
      )}
      {sections.filter((section) => section.PAGE_ID == "Homepage" && section.SECTION_ID !== "STATS_MAIN") // 🌸 exclude Homepage
        .map((section, index) => (
          <section key={section.CONTENT_ID || index} className="snap-start" id={section.Title === "Vision & Mission" ? "About" : section.Title}>
            <About category={section.SECTION_ID} layoutStyle={section.LayoutStyle} title={section.Title}/>
          </section>
        ))}
         {/* 🌸 FOOTER — snap-start so it scrolls into view naturally */}
    <section className="snap-start">
      <Footer />
    </section>
    </div>
  );
}
