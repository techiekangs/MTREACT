import { useEffect, useState } from "react";

import Statistic from './Statistic.jsx';
import { CheckCircle } from "lucide-react";

import Classic from "../Public/Layout/Classic";
import Carousel from "../Public/Layout/Carousel";
import Card from "../Public/Layout/Card";

import { getSectionDetails } from "../../API/ContentManagement/CM_Repository";
export default function About({ category, layoutStyle }) {
  console.log("Category", category);
  console.log("Layout Style", layoutStyle);
  const [originalData, setOriginalData] = useState({
    details: [],
    bullets: [],
    images: [],
    contact: {},
  });
  const layouts = {
    1: Classic,
    2: Carousel,
    3: Card,
  };
  const SelectedLayout = layouts[layoutStyle] || Classic;
  useEffect(() => {
    const fetchSectionDetails = async () => {
      try {
        const res = await getSectionDetails(category);
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
  }, [category]);

  return (
      <SelectedLayout
                details={originalData.details}
                bullets={originalData.bullets}
                images={originalData.images}
      />
    // <div className="grid grid-cols-1 md:grid-cols-2 gap-15 items-center p-25 mt-16 h-screen snap-start">
    //   {/* Left side - Text */}
    //   <div>
    //     <h4 className="text-xl font-semibold text-pink-700">About Us</h4>
    //     <h1 className="text-5xl font-bold text-gray-900">
    //       TRUSTED SERVICES DEDICATED TO TEACHERS
    //     </h1>
    //     <p className="mt-4 text-gray-500 text-xl font-medium">
    //       Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    //       Vestibulum urna dolor, sollicitudin quis nisi vitae, venenatis scelerisque risus.
    //       Donec fringilla eget leo et pretium. Quisque nec posuere purus. Praesent porttitor varius rhoncus.
    //       Proin eleifend ex non auctor mollis.
    //     </p>
    //     <ul className="mt-6 space-y-4 text-gray-700 text-lg">
    //       <li className="flex items-start space-x-3">
    //         <CheckCircle className="text-pink-600 w-6 h-6 mt-1" />
    //         <span>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    //         </span>
    //       </li>
    //       <li className="flex items-start space-x-3">
    //         <CheckCircle className="text-pink-600 w-6 h-6 mt-1" />
    //         <span>
    //           Vestibulum urna dolor, sollicitudin quis nisi vitae, venenatis scelerisque risus.
    //         </span>
    //       </li>
    //       <li className="flex items-start space-x-3">
    //         <CheckCircle className="text-pink-600 w-6 h-6 mt-1" />
    //         <span>
    //           Donec fringilla eget leo et pretium. Quisque nec posuere purus.
    //         </span>
    //       </li>
    //       <li className="flex items-start space-x-3">
    //         <CheckCircle className="text-pink-600 w-6 h-6 mt-1" />
    //         <span>
    //           Proin eleifend ex non auctor mollis.
    //         </span>
    //       </li>
    //     </ul>
    //     {/* <div className="my-8 border-t-2 border-pink-200 w-full mx-auto" />
    //      <Statistic />  */}
    //   </div>
    //   <div className="relative flex justify-center items-center group">
    //     {/* Blob */}
    //     <div className="absolute w-[580px] h-[580px] md:w-[450px] md:h-[450px] bg-purple-200 rounded-[60%_40%_70%_30%/40%_60%_30%_70%] opacity-40 rotate-[12deg]
    //                     transition-transform duration-500 ease-in-out
    //                     group-hover:scale-115 group-hover:rotate-[25deg]" />

    //     {/* Image */}
    //     <img
    //       src="https://images.unsplash.com/photo-1523580846011-d3a5bc25702b"
    //       alt="Teachers"
    //       className="relative z-10 rounded-xl shadow-lg w-[420px] md:w-[480px] object-cover
    //                 transition-transform duration-500 ease-in-out
    //                 group-hover:scale-105"
    //     />
    //   </div>

    // </div>
  );
}
