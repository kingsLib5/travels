// src/components/Reveal.jsx
import React from 'react';
import { motion } from 'framer-motion';

export default function Reveal({ children, className = '', distance = 12, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
