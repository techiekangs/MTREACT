import Statistic from './Statistic.jsx';
import { CheckCircle } from "lucide-react";
export default function About() {
  return (
<div className="relative grid grid-cols-1 md:grid-cols-2 rounded-xl overflow-hidden shadow-lg  h-screen pt-35 pb-35 p-65">
      <div className="absolute bottom-[75px] left-[175px] w-[200px] h-[200px] md:w-[200px] md:h-[200px] 
        bg-pink-300 rounded-[70%_30%_50%_50%/40%_60%_30%_70%] rotate-[18deg] opacity-40" 
      />
  {/* Image Side */}
  <div className="h-[500px] md:h-auto z-20">
    <img
      src="https://images.unsplash.com/photo-1523580846011-d3a5bc25702b"
      alt="Teachers"
      className="w-full h-full object-cover rounded-l-2xl"
    />
  </div>

  {/* Text Side */}
  <div className="bg-purple-200 p-10 flex flex-col justify-center rounded-r-2xl">
    <h4 className="text-xl font-semibold text-pink-700">About Us</h4>
    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2">
      TRUSTED SERVICES DEDICATED TO TEACHERS
    </h1>
    <p className="mt-4 text-gray-900 text-lg leading-relaxed">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
      Vestibulum urna dolor, sollicitudin quis nisi vitae, venenatis scelerisque risus.
      Donec fringilla eget leo et pretium. Quisque nec posuere purus. Praesent porttitor varius rhoncus. 
      Proin eleifend ex non auctor mollis.
    </p>

    <ul className="mt-6 space-y-4 text-gray-900 text-lg">
      <li className="flex items-start space-x-3">
        <CheckCircle className="text-pink-700 w-6 h-6 mt-1" />
        <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
      </li>
      <li className="flex items-start space-x-3">
        <CheckCircle className="text-pink-700 w-6 h-6 mt-1" />
        <span>Vestibulum urna dolor, sollicitudin quis nisi vitae.</span>
      </li>
      <li className="flex items-start space-x-3">
        <CheckCircle className="text-pink-700 w-6 h-6 mt-1" />
        <span>Donec fringilla eget leo et pretium. Quisque nec posuere purus.</span>
      </li>
      <li className="flex items-start space-x-3">
        <CheckCircle className="text-pink-700 w-6 h-6 mt-1" />
        <span>Proin eleifend ex non auctor mollis.</span>
      </li>
    </ul>
  </div>
</div>

  );
}
