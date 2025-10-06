
import { CheckCircle } from "lucide-react";
export default function Public_Classic({ details, bullets, images}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-15 items-center p-25 mt-16 h-screen snap-start">
      {/* Left side - Text */}
      <div>
        {details.length > 0 ? (
          <>
        <h4 className="text-xl font-semibold text-pink-700">About Us</h4>
        <h1 className="text-5xl font-bold text-gray-900">
          {details[0].Title}
        </h1>
        <p className="mt-4 text-gray-500 text-xl font-medium">
          {details[0].Content}
        </p>
        </>
         ) : (
          <div className="bg-purple-200 p-10 flex flex-col justify-center rounded-r-2xl">
    No details. 
  </div>
    )}
        <ul className="mt-6 space-y-4 text-gray-700 text-lg">
 {bullets.length > 0 && bullets.map((b, j) =>  (
        <li className="flex items-start space-x-3" key={j}>
          <CheckCircle className="text-pink-600 w-6 h-6 mt-1" />
          <span>
            {b.Detail}
          </span>
        </li>
        
      ))}
      </ul>
        {/* <div className="my-8 border-t-2 border-pink-200 w-full mx-auto" />
         <Statistic />  */}
      </div>
      <div className="relative flex justify-center items-center group">
        {/* Blob */}
        <div className="absolute w-[580px] h-[580px] md:w-[450px] md:h-[450px] bg-purple-200 rounded-[60%_40%_70%_30%/40%_60%_30%_70%] opacity-40 rotate-[12deg]
                        transition-transform duration-500 ease-in-out
                        group-hover:scale-115 group-hover:rotate-[25deg]" />

        {/* Image */}
        {images.length > 0 ? (
        <img
          src={images[0]?.IMG_URL}
          alt="Teachers"
          className="relative z-10 rounded-xl shadow-lg w-[420px] md:w-[480px] object-cover
                    transition-transform duration-500 ease-in-out
                    group-hover:scale-105"
        />
      ) : (
      <p>No Image Displayed</p>
      )}
  </div>

    </div>
  );
}
