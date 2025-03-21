import React from 'react';
import { motion } from 'framer-motion';

const FeatureCard = ({ title, description, icon, color }) => {
  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden h-full"
    >
      <div className="p-6">
        <div className={`inline-flex items-center justify-center p-3 bg-gradient-to-r ${color} rounded-xl shadow-md mb-5`}>
          <div className="text-white">{icon}</div>
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
      </div>
    </motion.div>
  );
};

export default FeatureCard;