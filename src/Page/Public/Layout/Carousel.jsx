import { useState } from "react";
import * as Icon from "lucide-react";
import { Link } from "react-router-dom";
export default function Public_Carousel({ details = [], bullets = [], images = [], title }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardPage, setCardPage] = useState(0);

  if (!details || details.length === 0)
    return <p className="text-center text-gray-500 mt-10">No details available.</p>;

  const handlePrev = () =>
    setCurrentIndex((p) => (p === 0 ? details.length - 1 : p - 1));

  const handleNext = () =>
    setCurrentIndex((p) => (p === details.length - 1 ? 0 : p + 1));

  const currentDetail = details[currentIndex];
  const isValid = new Date(currentDetail?.Expiration_Date) > new Date();

  const cards = images.map((img, i) => ({
    img,
    bullet: bullets[i] || {},
  }));

  const cardsPerPage = 4;
  const totalPages = Math.ceil(cards.length / cardsPerPage);
  const startIdx = cardPage * cardsPerPage;
  const visibleCards = cards.slice(startIdx, startIdx + cardsPerPage);

  const handleCardPrev = () =>
    setCardPage((p) => (p === 0 ? totalPages - 1 : p - 1));
  const handleCardNext = () =>
    setCardPage((p) => (p === totalPages - 1 ? 0 : p + 1));

  return (
    <>
      {isValid && (
        <div className="relative flex flex-col justify-center items-center p-10 h-screen snap-start text-center overflow-hidden transition-all duration-500 ease-in-out">
          {/* Blobs */}
          <div className="absolute top-[-100px] left-[-100px] w-[580px] h-[580px] md:w-[450px] md:h-[450px] bg-pink-200 rounded-[60%_40%_70%_30%/40%_60%_30%_70%] rotate-[12deg] opacity-40" />
          <div className="absolute bottom-[-120px] right-[-100px] w-[500px] h-[500px] md:w-[380px] md:h-[380px] bg-pink-300 rounded-[70%_30%_50%_50%/40%_60%_30%_70%] rotate-[18deg] opacity-40" />
          <div className="absolute top-[200px] right-[300px] w-[100px] h-[100px] bg-pink-200 rounded-[60%_40%_70%_30%/40%_60%_30%_70%] rotate-[15deg] opacity-50" />

          {/* Main Text */}
          <h4 className="text-xl font-semibold text-pink-700">{currentDetail?.Header}</h4>
          <h1 className="text-5xl font-bold text-gray-900 max-w-3xl">{currentDetail?.Title}</h1>
          <p className="mt-4 text-gray-500 text-xl font-medium max-w-2xl">{currentDetail?.Content}</p>

          {/* Cards */}
          <div className="relative w-full max-w-6xl mt-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {visibleCards.length > 0 ? (
                visibleCards.map(({ img, bullet }, i) => (
                  <div
                    key={i}
                    className="bg-purple-100 rounded-2xl shadow-lg p-6 text-left flex flex-col justify-between h-[360px] transition-all duration-300 hover:shadow-xl"
                  >
                    <div>
                      <div className="w-16 h-16 flex items-center justify-center rounded-lg bg-purple-200 mb-4 overflow-hidden">
                        {img?.IMG_URL ? (
                          <img
                            src={img.IMG_URL}
                            alt="Icon"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Icon.BookOpen className="w-7 h-7 text-pink-500" />
                        )}
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-2">{bullet?.Header}</h3>

                      <p className="text-gray-600 text-justify">
                        {(() => {
                          const text = bullet?.Detail || "";
                          if (text.length <= 80) return text;
                          const maxLength = 150;
                          const truncated = text.slice(0, maxLength);
                          const lastSentenceEnd = truncated.lastIndexOf(".");
                          return lastSentenceEnd > 0
                            ? truncated.slice(0, lastSentenceEnd + 1)
                            : truncated + "...";
                        })()}
                      </p>
                    </div>

                    <div className="mt-6 flex justify-start">
                      <Link
                        to={`/${title}/${bullet?.Header
                          .trim()
                          .replace(/\s+/g, '-')      // replace spaces with hyphens
                          .replace(/[^\w-]/g, '')    // remove special characters
                          .toLowerCase()}`}          // lowercase for consistency
                        state={{ categoryID: currentDetail.CATEGORY_ID, index: i }}
                        className="bg-pink-700 hover:bg-pink-800 text-pink-50 p-3 rounded-full cursor-pointer transition-transform transform hover:scale-110"
                      >
                        <Icon.ArrowRight className="w-6 h-6" />
                      </Link>

                     
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-gray-500">No cards to display.</div>
              )}
            </div>

            {/* Card Navigation Arrows */}
            {totalPages > 1 && (
              <>
                <button
                  onClick={handleCardPrev}
                  className="absolute -left-60 top-1/2 transform -translate-y-1/2 bg-purple-600 hover:bg-purple-700 text-white rounded-full p-5 shadow-lg transition-transform hover:scale-110"
                >
                  <Icon.ChevronLeft className="w-8 h-8" />
                </button>
                <button
                  onClick={handleCardNext}
                  className="absolute -right-60 top-1/2 transform -translate-y-1/2 bg-purple-600 hover:bg-purple-700 text-white rounded-full p-5 shadow-lg transition-transform hover:scale-110"
                >
                  <Icon.ChevronRight className="w-8 h-8" />
                </button>
              </>
            )}
          </div>

          {/* Card Pagination Dots */}
          {totalPages > 1 && (
            <div className="mt-6 flex space-x-2 justify-center">
              {Array.from({ length: totalPages }).map((_, i) => (
                <span
                  key={i}
                  onClick={() => setCardPage(i)}
                  className={`w-3 h-3 rounded-full cursor-pointer transition-all ${i === cardPage ? "bg-pink-700 scale-110" : "bg-gray-400"
                    }`}
                />
              ))}
            </div>
          )}

          {/* Detail-level Navigation */}
          {details.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-8 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white text-gray-700 rounded-full p-3 shadow transition-transform hover:scale-110"
              >
                <Icon.ArrowLeft className="w-7 h-7" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-8 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white text-gray-700 rounded-full p-3 shadow transition-transform hover:scale-110"
              >
                <Icon.ArrowRight className="w-7 h-7" />
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}
