import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

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
        ease: 'easeOut',
        staggerChildren: 0.2,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  };

  return (
    <motion.div
      ref={ref}
      className="absolute bottom-[-4rem] left-0 w-full flex justify-center px-4"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      <motion.div
        className="bg-white rounded-2xl shadow-lg p-6 flex space-x-6 w-full max-w-6xl"
        variants={containerVariants}
      >
        <motion.div className="flex-1 text-center" variants={childVariants}>
          <h2 className="text-green-800 text-3xl font-bold">DEV Manila Teachers 1</h2>
          <p>IT Dev 01</p>
        </motion.div>
        <motion.div className="flex-1 text-center" variants={childVariants}>
          <h2 className="text-green-800 text-3xl font-bold">DEV Manila Teachers 2</h2>
          <p>IT Dev 02</p>
        </motion.div>
        <motion.div className="flex-1 text-center" variants={childVariants}>
          <h2 className="text-green-800 text-3xl font-bold">DEV Manila Teachers 3</h2>
          <p>IT Dev 03</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}