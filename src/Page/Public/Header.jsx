import Statistic from './Statistic.jsx';

export default function Home() {
  return (
    <header
      className="relative min-h-screen bg-cover bg-center pt-100 rounded-b-4xl"
      style={{
         backgroundImage: `
      linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.8)),
      url("https://images.unsplash.com/photo-1503676260728-1c00da094a0b")
    `
      }}
    >
      <div className="flex flex-col items-center justify-center h-full">
       
         <h1 className=" text-white text-2xl flex items-center font-bold">
          {/* <span className="flex-1 h-1 border-t-4 border-white"></span> */}
          <span className="mx-15 whitespace-nowrap">Better Teacher. Better Education</span>
          {/* <span className="flex-1 h-1 w-50 border-t-4 border-white"></span> */}
        </h1>
         <span className="flex-1 h-1 w-50 border-t-1 border-purple-400 m-5"></span>
        <h2 className="text-white text-7xl font-bold ml-20 mr-20 text-center">        
         CHAMPIONING TEACHERS, NURTURING GENERATIONS
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
