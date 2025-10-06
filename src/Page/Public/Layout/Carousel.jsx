import * as Icon from "lucide-react";

export default function Public_Carousel({ details, bullets, images }) {
  return (
    <div className="relative flex flex-col justify-center items-center p-10 h-screen snap-start text-center overflow-hidden">
      {/* Decorative Blob 1 */}
      <div className="absolute top-[-100px] left-[-100px] w-[580px] h-[580px] md:w-[450px] md:h-[450px] 
        bg-pink-200 rounded-[60%_40%_70%_30%/40%_60%_30%_70%] rotate-[12deg] opacity-40"
      />

      {/* Decorative Blob 2 */}
      <div className="absolute bottom-[-120px] right-[-100px] w-[500px] h-[500px] md:w-[380px] md:h-[380px] 
        bg-pink-300 rounded-[70%_30%_50%_50%/40%_60%_30%_70%] rotate-[18deg] opacity-40"
      />
      {/* Decorative Blob Right */}
      <div className="absolute top-[200px] right-[300px] w-[100px] h-[100px] 
        bg-pink-200 rounded-[60%_40%_70%_30%/40%_60%_30%_70%] rotate-[15deg] opacity-50"
      />
      {/* Content */}
      <h4 className="text-xl font-semibold text-pink-700">Every Teacher Matters</h4>
      {details.length > 0 ? (
        <>
          <h1 className="text-5xl font-bold text-gray-900 max-w-3xl">
            {details[0].Title}
          </h1>
          <p className="mt-4 text-gray-500 text-xl font-medium max-w-2xl">
            {details[0].Content}
          </p>
        </>
      ) : (
        <div className="bg-purple-200 p-10 flex flex-col justify-center rounded-r-2xl">
          No details.
        </div>
      )}
      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 w-full max-w-6xl relative z-10">
        {bullets.length > 0 && bullets.map((b, j) => (
          <div className="bg-purple-100 rounded-2xl shadow-lg p-6 text-left" key={j}>
            <div className="w-14 h-14 flex items-center justify-center rounded-lg bg-purple-200 mb-4">
              {images[j]?.IMG_URL ? (
                <img
                  src={images[j]?.IMG_URL}
                  alt="Teachers"
                  className="w-full h-full object-cover rounded-l-2xl"
                />
              ) : (

                <Icon.BookOpen className="w-7 h-7 text-pink-500" />

              )}
            </div>
            <h3 className="text-xl font-bold text-gray-900">{b.Header}</h3>
            <p className="mt-2 text-gray-600">{b.Detail}</p>
          </div>

        ))}
      </div>
    </div>
  );
}
