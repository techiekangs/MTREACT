import Statistic from './Statistic.jsx';
import { useEffect, useState } from "react";

import Classic from "../Public/Layout/Classic";
import Carousel from "../Public/Layout/Carousel";
import Card from "../Public/Layout/Card";

import { getSectionDetails } from "../../API/ContentManagement/CM_Repository";


export default function Home({category, layoutStyle }) {
  console.log("Header-category",category);
   console.log("Header-layoutStyle",layoutStyle);
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
    <header
      className="relative min-h-screen bg-cover bg-center pt-75 rounded-b-4xl"
      style={{
         backgroundImage: `
      linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.9)),
      url("https://images.unsplash.com/photo-1503676260728-1c00da094a0b")
    `
      }}
    >
      <div className="flex flex-col items-center justify-center h-full">
       
         <h1 className=" text-white text-2xl flex items-center font-bold">
          {/* <span className="flex-1 h-1 border-t-4 border-white"></span> */}
          <span className="mx-15 whitespace-nowrap">{originalData.details[0]?.Title}</span>
          {/* <span className="flex-1 h-1 w-50 border-t-4 border-white"></span> */}
        </h1>
         <span className="flex-1 h-1 w-50 border-t-1 border-purple-400 m-5"></span>
        <h2 className="text-white text-7xl font-bold ml-20 mr-20 text-center">        
         {originalData.details[0]?.Content}
        </h2>
        <div className="mt-12 flex gap-10">
  <button className="w-50 px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-pink-600 text-white font-medium text-lg shadow-md hover:scale-105 hover:shadow-xl transform transition-all duration-300 ease-in-out">
    🌸 Learn More
  </button>
  <button className="w-50 px-6 py-3 rounded-full border-2 border-pink-400 bg-transparent text-white font-medium text-lg shadow-md hover:bg-pink-400 hover:text-white hover:scale-105 hover:shadow-xl transform transition-all duration-300 ease-in-out">
    🌼 Get Involved
  </button>
</div>

      </div>
     {/* <Statistic /> */}
    </header>
    
  );
}
