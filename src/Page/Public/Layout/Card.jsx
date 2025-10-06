
import { CheckCircle } from "lucide-react";
export default function Public_Card({ details, bullets, images}) {
  return (
<div className="relative grid grid-cols-1 md:grid-cols-2 rounded-xl overflow-hidden shadow-lg h-screen pt-55 pb-55 p-65">
      <div className="absolute bottom-[75px] left-[175px] w-[200px] h-[200px] md:w-[200px] md:h-[200px] 
        bg-pink-300 rounded-[70%_30%_50%_50%/40%_60%_30%_70%] rotate-[18deg] opacity-40" 
      />
  {/* Image Side */}
  <div className="h-[500px] md:h-[500px] z-20">
    {images.length > 0 ? (
    <img
      src={images[0]?.IMG_URL}
      alt="Teachers"
      className="w-full h-full object-contain rounded-l-2xl"
    />
    ) : (
      <p>No Image Displayed</p>
      )}
  </div>

  {/* Text Side */}
  {details.length > 0 ? (
  <div className="bg-purple-200 p-10 flex flex-col justify-center rounded-r-2xl">
    <h4 className="text-xl font-semibold text-pink-700">About Us</h4>
    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2">
      {details[0]?.Title}
    </h1>
    <p className="mt-4 text-gray-900 text-lg leading-relaxed">
      {details[0]?.Content}
    </p>
    
    <ul className="mt-6 space-y-4 text-gray-900 text-lg">
      {bullets.length > 0 && bullets.map((b, j) =>  (
        <>
      <li className="flex items-start space-x-3" key={j}>
        <CheckCircle className="text-pink-700 w-6 h-6 mt-1" />
        <span>{b.Detail}</span>
      </li>  
      </>
      ))}
    </ul>
  </div>
   ) : (
  <div className="bg-purple-200 p-10 flex flex-col justify-center rounded-r-2xl">
    No details. 
  </div>
    )}
</div>

  );
}
