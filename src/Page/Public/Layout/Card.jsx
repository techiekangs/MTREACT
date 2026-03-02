import { useState } from "react";
import { CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
export default function Public_Card({ details, bullets, images, title }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!details || details.length === 0)
    return <p className="p-10 bg-purple-100 rounded-xl">No details.</p>;

  const validImages = images && images.length > 0 ? images : [];
  const isValid =
    new Date(details[0]?.Expiration_Date) > new Date();

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? details.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === details.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <>
      {isValid && (
        <div className="relative grid grid-cols-1 md:grid-cols-2 rounded-xl overflow-hidden shadow-lg h-screen pt-50 pb-50 p-65">
          {/* Decorative Shape */}
          <div
            className="absolute bottom-[75px] left-[175px] w-[200px] h-[200px] md:w-[200px] md:h-[200px] 
            bg-pink-300 rounded-[70%_30%_50%_50%/40%_60%_30%_70%] rotate-[18deg] opacity-40"
          />



          {/* RIGHT SIDE - IMAGE */}
          <div className="relative flex items-center justify-center z-10 rounded-l-2xl overflow-hidden">
            {validImages.length > 0 ? (
              <img
                src={validImages[currentIndex]?.IMG_URL}
                alt="Display"
                className="w-full h-full object-cover transition-all duration-500 ease-in-out"
              />
            ) : (
              <p className="flex items-center justify-center h-full text-gray-400">
                No Image Displayed
              </p>
            )}
          </div>

          {/* LEFT SIDE - TEXT + BULLETS + CARD + ARROWS */}
          <div className="flex flex-col justify-center bg-purple-200 p-10 rounded-r-2xl relative z-20">
            <h4 className="text-xl font-semibold text-pink-700">
              {details[currentIndex]?.Header}
            </h4>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2">
              {details[currentIndex]?.Title}
            </h1>
            <p className="mt-4 text-gray-500 text-xl font-medium">
              {(() => {
                const text = details[0]?.Content || "";
                const maxLength = 300;

                if (text.length <= 150) return text; // short text — show all

                if (text.length > maxLength) {
                  const truncated = text.slice(0, maxLength);
                  const lastSentenceEnd = truncated.lastIndexOf(".");
                  const finalText =
                    lastSentenceEnd !== -1
                      ? truncated.slice(0, lastSentenceEnd + 1)
                      : truncated;

                  return (
                    <>
                      {finalText}{" "}
                      <Link to={`/0/${title}/`}          // lowercase for consistency
                        state={{ categoryID: details[currentIndex].CATEGORY_ID, index: currentIndex }}>
                        <span className="text-pink-700 hover:underline hover:text-pink-900 font-semibold cursor-pointer transition-all duration-200 inline-flex items-center">
                          Read more

                        </span><span className="ml-1 text-2xl leading-none font-light text-pink-700 hover:text-pink-900 ">→</span>
                      </Link>
                    </>
                  );
                }

                return text;
              })()}


            </p>


            {/* BULLETS
            <ul className="mt-6 space-y-4 text-gray-900 text-lg">
              {bullets
                .filter((b) => b.Detail === currentIndex)
                .map((b, j) => (
                  <li className="flex items-start space-x-3" key={j}>
                    <CheckCircle className="text-pink-700 w-6 h-6 mt-1" />
                    <span>{b.Detail}</span>
                  </li>
                ))}
            </ul> */}

            {/* CARD BELOW BULLETS */}
            <div className=" text-pink-700 mt-4">
              <div className="border-t border-pink-700 w-1/4 pt-4 pb-1"></div>
              {/* <h2 className="text-lg font-semibold">Card Info</h2> */}
              <h2 className="text-sm opacity-90">
                {bullets[currentIndex]?.Header}
              </h2>
              <p className="text-sm opacity-90">
                {bullets[currentIndex]?.Detail}
              </p>
            </div>

            {/* ARROWS (MOVED HERE) */}
            <div className="flex gap-3 items-center mt-6">
              <button
                onClick={handlePrev}
                className="bg-white bg-opacity-70 hover:bg-opacity-100 p-2 rounded-full shadow-md"
              >
                <ChevronLeft className="text-pink-700 w-6 h-6" />
              </button>
              <button
                onClick={handleNext}
                className="bg-white bg-opacity-70 hover:bg-opacity-100 p-2 rounded-full shadow-md"
              >
                <ChevronRight className="text-pink-700 w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
