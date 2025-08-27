import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export default function Space() {
  const reduceMotion = useReducedMotion();
  const phrase = 'FLY IN COMFORT';

  const textVariants = {
    initial: { color: 'white' },
    animate: {
      color: ['#fff', '#f0abfc', '#fff'], // Example colors
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: 'loop',
      },
    },
  };

  return (
    <section className="bg-transparent h-[60vh] grid">
      <div className="text-white flex justify-center items-center">
        <motion.h1
          className="text-[45px] font-semibold font-serif tracking-wide select-none"
          variants={textVariants}
          initial="initial"
          animate="animate"
        >
          {phrase}
        </motion.h1>
      </div>
    </section>
  );
}