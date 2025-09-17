import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

function AnimatedCounter({ target, duration = 1500 }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startTime = performance.now();
    let frame;

    const update = (time) => {
      let progress = (time - startTime) / duration;

      if (progress < 1) {
        // generate random numbers while animating
        let randomValue = Math.floor(Math.random() * target * 1.2);
        setDisplayValue(randomValue);
        frame = requestAnimationFrame(update);
      } else {
        // final value
        setDisplayValue(target);
      }
    };

    frame = requestAnimationFrame(update);

    return () => cancelAnimationFrame(frame);
  }, [target, duration]);

  return <span>{displayValue.toLocaleString()}</span>;
}

export default function Statistic() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.3,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.div
      ref={ref}
      className=" w-full flex justify-center"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <motion.div
        className=" flex space-x-6 w-full max-w-6xl"
        variants={containerVariants}
      >
        <motion.div className="flex-1 text-center" variants={childVariants}>
          <h2 className="text-violet-800 text-6xl font-medium">
            {isInView && <AnimatedCounter target={200} />}K
          </h2>
          <p className="">IT Dev 01</p>
        </motion.div>
        <motion.div className="flex-1 text-center" variants={childVariants}>
          <h2 className="text-violet-800 text-6xl font-medium">
            {isInView && <AnimatedCounter target={86} />}B
          </h2>
          <p className="">IT Dev 02</p>
        </motion.div>
        <motion.div className="flex-1 text-center" variants={childVariants}>
          <h2 className="text-violet-800 text-6xl font-medium">
            {isInView && <AnimatedCounter target={100} />}
            +
          </h2>
          <p className="">IT Dev 03</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
