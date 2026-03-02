import { useState, useEffect } from 'react';
import { getSection, getSectionContents } from "../../.././API/ContentManagement/CM_Repository";
import { fetchFTPImage } from "../../../API/ContentManagement/NAS_Repository";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import api from "../../../API/api.js";

export default function News() {
  const [news, setNews] = useState({
    bullets: [],
    images: [],
  });
  const [loading, setLoading] = useState(true);
  const [section, setSection] = useState([]);



  useEffect(() => {
    const fetchSectionContents = async () => {
      try {
        const res = await getSectionContents("NEWS_MAIN");
        const response = await getSection("NEWS_MAIN");
        console.log("response:", response);
        console.log("res:", res);
        // ✅ Pick only the Sections array
        setSection(Array.isArray(response.Sections) ? response.Sections : []);

        const fetchedData = {
          bullets: (res?.Bullets ?? []).map((b) => ({
            ...b,
            isDeleted: false,
          })),
          images: (res?.Images ?? []).map((img) => ({
            ...img
          })),
        };
        console.log("fetcheddata:", fetchedData);
        setNews(fetchedData);

        // Load FTP images
        if (fetchedData.images.length > 0) {
          await loadAllFTPImages(fetchedData.images);
        }
      } catch (error) {
        console.error("❌ Failed to load sections:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSectionContents();
  }, []);

  // useEffect(() => {
  //   const fetchSections = async () => {
  //     try {
  //       const response = await getSection("NEWS_MAIN");

  //       // ✅ Pick only the Sections array
  //       setSection(Array.isArray(response.data.Sections) ? response.data.Sections : []);
  //       console.log("✅ Section loaded:", response.data.Sections);
  //     } catch (error) {
  //       console.error("❌ Failed to load section:", error);
  //     }
  //   };

  //   fetchSections();
  // }, []);
  const loadAllFTPImages = async (imagesList) => {
    const updated = await Promise.all(
      imagesList.map(async (img) => {
        console.log("WOAHHH", img.IMG_URL);

        const base64Url = await fetchFTPImage(img.IMG_URL, img.FILE_NAME);
        console.log("WOAHJHHHH");

        return {
          ...img,
          ftpBase64: base64Url,
        };
      })
    );

    setNews(prev => ({
      ...prev,
      images: updated
    }));
  };

  if (loading) {
    return <div className="p-5">Loading...</div>;
  }

  return (
    <div className="flex flex-col p-5 w-full">
      <div className="text-2xl font-bold text-gray-700">News</div>
      <div className="w-full border-b-gray-100"></div>
      {section && section.length > 0 && section[0] && (
        <Link
          to={`/ContentManagement/Pages/Editor/${section[0].Title
            .trim()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]/g, '')
            .toLowerCase()}`}
          state={{
            layoutStyle: section[0].LayoutStyle,
            sectionID: section[0].SECTION_ID
          }}

          className="bg-sky-800 text-white p-2 rounded-md w-36 mt-2 "
        >
          <FontAwesomeIcon icon="plus"  className="mr-2 text-white" /> Add {section[0].Title}
        </Link>
      )}
      <div className="flex flex-col gap-0 w-full">
        {news.images.map((img, index) => (
          <div key={img.CONTENT_ID} className="flex flex-row gap-4 border-b border-gray-300 pb-4 pt-4 w-full">
            {/* Image Block */}
            <div className="flex-shrink-0">
              {img.ftpBase64 ? (
                <img
                  src={img.ftpBase64}
                  alt={img.FILE_NAME}
                  className="w-24 h-24 rounded-lg object-cover"
                />
              ) : (
                <div className="w-24 h-24 flex items-center justify-center">
                  <span className="text-gray-500">Loading...</span>
                </div>
              )}
            </div>

            {/* Bullets Block */}
            <div className="flex flex-col flex-1 min-w-0">
              <h3 className="text-lg font-bold text-sky-900 mb-2">
                {news.bullets[index]?.Header || "Event Title"}
              </h3>
              <p className="text-sky-900 text-sm">
                {news.bullets[index]?.Detail || "Event description goes here..."}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}