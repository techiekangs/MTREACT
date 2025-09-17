import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function SplashScreen({ onFinish }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((old) => {
        if (old >= 100) {
          clearInterval(interval);
          setTimeout(() => onFinish(), 500); // call parent to hide splash
          return 100;
        }
        return old + 5;
      });
    }, 120); // speed of loading

    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-pink-100">
      <h1 className="text-3xl font-bold text-pink-700 mb-6">
        🌸 Loading Magic...
      </h1>

      <div className="w-64 h-4 bg-pink-200 rounded-full overflow-hidden shadow-lg">
        <motion.div
          className="h-full bg-pink-500"
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ ease: "easeInOut" }}
        />
      </div>

      <p className="mt-4 text-pink-700">{progress}%</p>
    </div>
  );
}
