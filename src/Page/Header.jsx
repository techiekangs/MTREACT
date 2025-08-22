import Statistic from './Statistic.jsx';

export default function Home() {
  return (
    <header
      className="relative min-h-screen bg-cover bg-center pt-100 pb-150 rounded-b-4xl"
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1503676260728-1c00da094a0b")'
      }}
    >
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-white text-4xl font-bold flex items-center">
          <span className="flex-1 h-1 border-t-4 border-white"></span>
          <span className="mx-15 whitespace-nowrap">Better Teacher. Better Education.</span>
          <span className="flex-1 h-1 w-50 border-t-4 border-white"></span>
        </h1>
        <h2 className="text-white text-7xl font-bold ">        
          Better Teacher. Better Education.
        </h2>
      </div>
     <Statistic />
    </header>
    
  );
}
