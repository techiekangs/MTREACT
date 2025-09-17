import { Outlet } from "react-router-dom";

import bgImage from "../../../Components/Images/Vector.png";
import imgType from "../../../Components/Images/Typing-cuate.png";
import imgGroup from "../../../Components/Images/Group discussion-rafiki.png";
import Register from "./Register.jsx";

export default function Main() {
  
  return (
    <div
      className="relative w-ful min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        // backgroundImage:`url(${bgImage})`,
        // backgroundColor: "#e6e6fa  ",
        // backgroundBlendMode: "normal",
        background: "linear-gradient(135deg, #e6e6fa 0%, #fdf0ff 100%)",
      }}
    >

        <img
    src={imgGroup}
    alt="Teachers Group"
    className="absolute bottom-25 left-1/3 transform -translate-x-2/4 w-[45%] lg:w-[60%] opacity-95"
  />
      <div className="container mx-auto md:mx-0 flex flex-col md:flex-row items-center justify-between px-0 md:px-0">
        
        {/* Left Side */}
        <div className="text-white max-w-lg mb-[45%] lg:mb-[30%] -ml-6 -lg:ml-8">
                    
          <h3 className="font-bold text-pink-700 text-xl">
            Content Management      
          </h3>
          <h1 className="text-6xl md:text-6xl font-bold leading-tight whitespace-nowrap text-indigo-950 ">PHILIPPINE TEACHERS</h1>
          {/* <p className="mt-4 text-gray-900">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit
          </p> */}
        </div>
        {/* Right Side - Login Card */}
        <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-sm">
         <Outlet />
        </div>
      </div>
    </div>
  );
}
