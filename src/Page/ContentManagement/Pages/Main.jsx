import { useEffect, useState, useMemo } from "react";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import api from "../../../API/api.js";

export default function SectionsTable() {
  const [sections, setSections] = useState([]);
  const [selectedPage, setSelectedPage] = useState("all");

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
        console.log("✅ Sections loaded:", response.data.Sections);
      } catch (error) {
        console.error("❌ Failed to load sections:", error);
      }
    };

    fetchSections();
  }, []);

  const pageOptions = useMemo(() => {
    const ids = sections.map((s) => s.PAGE_ID);
    return ["all", ...new Set(ids)];
  }, [sections]);

  // 🌺 Filtered sections based on selected page
  const filteredSections =
    selectedPage === "all"
      ? sections
      : sections.filter((sec) => sec.PAGE_ID === selectedPage);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        {/* 🌸 Dynamic Heading */}
        <h1 className="text-4xl font-bold text-sky-700">
          {selectedPage === "all" ? "Sections" : `${selectedPage} - Sections`}
        </h1>

        {/* 🌼 Page Filter Dropdown */}
        <select
          value={selectedPage}
          onChange={(e) => setSelectedPage(e.target.value)}
          className="border border-sky-300 rounded px-3 py-2 text-sky-100 focus:ring focus:ring-sky-200 bg-sky-700"
        >
          {pageOptions.map((page) => (
            <option key={page} value={page}>
              {page === "all" ? "All Pages" : `${page}`}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-sky-200 rounded-xl shadow-lg overflow-hidden">
          <thead className="bg-gradient-to-r from-sky-700 to-sky-900 text-sky-50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">Title</th>
              <th className="px-4 py-3 text-left font-semibold">Last Modified</th>
              <th className="px-4 py-3 text-left font-semibold">Modified By</th>
              <th className="px-4 py-3 text-center font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-sky-100">
            {filteredSections.length > 0 ? (
              filteredSections.map((sec, idx) => (
                <tr
                  key={idx}
                  className="group hover:bg-sky-300  transition-colors duration-150 odd:bg-white even:bg-sky-50"
                >
                  <td className="px-4 py-3 font-medium text-sky-700 group-hover:text-sky-100">
                    <Link
                      to="/ContentManagement/Pages/About"
                      state={{ layoutStyle: sec.LayoutStyle, sectionID: sec.SECTION_ID }}
                      className="hover:text-sky-100 hover:underline transition-colors"
                    >
                      {sec.Title}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-gray-600 group-hover:text-sky-100">
                    {sec.LastModified
                      ? new Date(sec.LastModified).toLocaleString()
                      : ""}
                  </td>
                  <td className="px-4 py-3 text-gray-600 group-hover:text-sky-100">{sec.ModifiedBy}</td>
                  <td className="px-4 py-3 text-center space-x-3 group-hover:text-sky-100">
                    {sec.ViewURL && (
                      <a
                        href={sec.ViewURL.replace("~", "")}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        View
                      </a>
                    )}
                    {sec.EditURL && (
                      <a
                        href={sec.EditURL}
                        className="text-green-600 hover:text-green-800 font-medium"
                      >
                        Edit
                      </a>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="text-center px-4 py-8 text-gray-500 italic"
                >
                  🌼 No sections found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}