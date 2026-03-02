import { getSectionDetails } from "../../API/ContentManagement/CM_Repository";
import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import FAQS_img from "../../Components/Images/FAQs-amico.png"

export default function FAQs() {

  const { sectionTitle, bulletHeader } = useParams();
  const location = useLocation();
  const { categoryID, index } = location.state || {}; // retrieve from Link state
  const [searchTerm, setSearchTerm] = useState("");

  console.log("sectionTitle:", sectionTitle);
  console.log("bulletHeader:", bulletHeader);
  console.log("categoryID:", categoryID);
  console.log("index:", index);


  const [originalData, setOriginalData] = useState({
    details: [],
    bullets: [],
    images: [],
    contact: {},
  });

  const filteredBullets = originalData?.bullets?.filter((bullet) => {
    const term = searchTerm.toLowerCase();
    return (
      bullet.Header?.toLowerCase().includes(term) ||
      bullet.Detail?.toLowerCase().includes(term)
    );
  });
  useEffect(() => {
    const fetchSectionDetails = async () => {
      try {
        const res = await getSectionDetails("FAQS_MAIN");
        console.log("res:", res)

        const fetchedData = {
          details: res?.Details ?? [],
          bullets: (res?.Bullets ?? []).map((b) => ({
            ...b,
            isDeleted: false, // 🌸 add flag for bullets
          })),
          images: (res?.Images ?? []).map((img) => ({
            ...img,
            isDeleted: false, // 🌼 add flag for images
          })),
          contact: res?.Contact ?? {},
        };

        setOriginalData(fetchedData);

      } catch (error) {
        console.error("❌ Failed to load section details:", error);
      }
    };

    fetchSectionDetails();
  }, [categoryID]);

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (i) => {
    setActiveIndex(activeIndex === i ? null : i);
  };

  return (
    <div>
      <div className="relative pt-24 px-50 py-10 flex items-center justify-between bg-purple-200">

        {/* 🌸 LEFT SIDE - TEXT */}
        <div className="max-w-l">
          <h4 className="text-xl font-semibold text-pink-700">
            {originalData?.details?.[
              originalData?.details?.[index]?.Header ? index : 0
            ]?.Header}
          </h4>

          <h1 className="text-5xl font-bold text-gray-800 max-w-3xl">
            {originalData?.details?.[
              originalData?.details?.[index]?.Header ? index : 0
            ]?.Title
              ?.toLowerCase()
              .replace(/\b\w/g, char => char.toUpperCase())}
          </h1>

          <p className="mt-4 text-gray-700 text-xl font-medium max-w-2xl">
            {originalData?.details?.[
              originalData?.details?.[index]?.Header ? index : 0
            ]?.Content}
          </p>
          <div className="mt-6">
            {/* <input
    type="text"
    placeholder="Search questions or answers..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="w-full max-w-md px-4 py-3 border border-pink-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
  /> */}
          </div>
        </div>

        {/* 🌷 RIGHT SIDE - IMAGE */}
        <div className="flex justify-end">
          <img
            src={FAQS_img}
            alt="FAQs"
            className="w-[480px] object-cover"
          />
        </div>

      </div>
      <div className="px-50 py-16 bg-white">
        <div className="max-w-4xl mx-auto space-y-4">

          {originalData?.bullets?.map((bullet, i) => (
            <div
              key={i}
              className="border border-pink-200 rounded-xl overflow-hidden shadow-sm"
            >
              {/* 🌸 Question Header */}
              <button
                onClick={() => toggleAccordion(i)}
                className="w-full flex justify-between items-center px-6 py-4 text-left bg-pink-50 hover:bg-pink-100 transition"
              >
                <span className="font-semibold text-gray-700 text-lg">
                  {bullet.Header}
                </span>

                {/* 🌷 Plus Icon */}
                <span
                  className={`text-2xl font-bold text-pink-600 transition-transform duration-300 ${activeIndex === i ? "rotate-45" : ""
                    }`}
                >
                  +
                </span>
              </button>

              {/* 🌼 Answer Content */}
              <div
                className={`px-6 overflow-hidden transition-all duration-300 ${activeIndex === i
                    ? "max-h-96 py-4 opacity-100"
                    : "max-h-0 opacity-0"
                  }`}
              >
                <p className="text-gray-600 leading-relaxed">
                  {bullet.Detail}
                </p>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  )
}