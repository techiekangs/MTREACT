import { useEffect, useState, useMemo } from "react";

import Home from './Header.jsx';
import Statistic from './Statistic.jsx';
import About from './About.jsx';
import Advocacy from './Advocacy.jsx';
import Testimony from './Testimony.jsx';

import api from "../../API/api.js";


export default function Main() {

  const [sections, setSections] = useState([]);
  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await api.get("/ContentManagement/Detail/Sections", {
          params: { SectionId: 0 },
          headers: {
            Authorization: "bearer " + localStorage.getItem("token"),
            IpAddress: "::1",
            AppName: "MT",
          },
        });

        // ✅ Pick only the Sections array
        setSections(Array.isArray(response.data.Sections) ? response.data.Sections : []);
        console.log("✅ Sections loaded:", sections);
      } catch (error) {
        console.error("❌ Failed to load sections:", error);
      }
    };

    fetchSections();
  }, []);
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
          <section key={section.CONTENT_ID || index} className="snap-start">
            <About category={section.SECTION_ID} layoutStyle={section.LayoutStyle} title={section.Title}/>
          </section>
        ))}
    </div>
  );
}
