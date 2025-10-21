import { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
export default function Public_Classic({ details, bullets, images, title  }) {
  const [currentImg, setCurrentImg] = useState(0);
  const [fade, setFade] = useState(true);

  const isValid =
    details.length > 0 && new Date(details[0].Expiration_Date) > new Date();
  const validImages = images && images.length > 0 ? images : [];

  // 🌀 Auto-fade effect every 4 seconds
  useEffect(() => {
    if (validImages.length <= 1) return;
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentImg((prev) =>
          prev === validImages.length - 1 ? 0 : prev + 1
        );
        setFade(true);
      }, 300); // fade-out delay before switching
    }, 4000); // change image every 4 seconds

    return () => clearInterval(interval);
  }, [validImages]);

  return ( 
    <>
{isValid && (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-15 items-center p-25 mt-16 h-screen snap-start relative">
    {/* Left side - Text */}
    <div>
      <h4 className="text-xl font-semibold text-pink-700">
        {details[0].Header}
      </h4>
      <h1 className="text-5xl font-bold text-gray-900">
        {details[0].Title}
      </h1>
<p className="mt-4 text-gray-500 text-xl font-medium">
  {(() => {
    const text = details[0]?.Content || "";
    if (text.length <= 150) return text; // if short enough, display all

    // Cut at 520 characters or less
    const maxLength = 550;
    if (text.length > maxLength) {
      const truncated = text.slice(0, maxLength);

      // Find the last period (.) before 520 characters to end on a sentence
      const lastSentenceEnd = truncated.lastIndexOf(".");
      return truncated.slice(0, lastSentenceEnd + 1);
    }

    return text;
  })()}
</p>


      <ul className="mt-6 space-y-4 text-gray-700 text-lg">
        {bullets.map((b, j) => (
          <li className="flex items-start space-x-3" key={j}>
            <CheckCircle className="text-pink-600 w-6 h-6 mt-1" />
            <span>{b.Detail}</span>
          </li>
        ))}
      </ul>


        <button className="bg-pink-800 rounded-sm cursor-pointer text-pink-50 p-2.5 mt-4">
          <Link
                to={`/${title}/`}          // lowercase for consistency
                state={{ categoryID: details[0].CATEGORY_ID, index: 0 }}
                // className="bg-pink-700 hover:bg-pink-800 text-pink-50 p-3 rounded-full cursor-pointer transition-transform transform hover:scale-110 mt-2"
              >
                Read More
              </Link>
        </button>

    </div>

    {/* Right side - Image with fade transition */}
    <div className="relative flex justify-center items-center group">
      <div className="absolute w-[580px] h-[580px] md:w-[450px] md:h-[450px] bg-purple-200 rounded-[60%_40%_70%_30%/40%_60%_30%_70%] opacity-40 rotate-[12deg]
                      transition-transform duration-500 ease-in-out
                      group-hover:scale-115 group-hover:rotate-[25deg]" />

      {validImages.length > 0 ? (
        <img
          key={validImages[currentImg]?.IMG_URL}
          src={validImages[currentImg]?.IMG_URL}
          alt="Display"
          className={`relative z-10 rounded-xl shadow-lg w-[420px] md:w-[480px] object-cover transition-opacity duration-700 ease-in-out ${
            fade ? "opacity-100" : "opacity-0"
          }`}
        />
      ) : (
        <p className="text-gray-400">No Image Displayed</p>
      )}
    </div>
  </div>
)}

      </>
  );
}
