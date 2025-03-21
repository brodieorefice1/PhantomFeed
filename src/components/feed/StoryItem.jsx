import React from 'react';
import { motion } from 'framer-motion';

const StoryItem = ({ story, onClick }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="flex-shrink-0 w-20 flex flex-col items-center cursor-pointer"
      onClick={onClick}
    >
      <div className="relative">
        <div className={`w-16 h-16 rounded-full p-[2px] ${
          story.viewed
            ? 'bg-gray-300 dark:bg-gray-600'
            : 'bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500'
        }`}>
          <div className="w-full h-full rounded-full overflow-hidden border-2 border-white dark:border-gray-800">
            <div 
              className="w-full h-full bg-gray-200 dark:bg-gray-700"
              style={{
                backgroundImage: `url(${story.thumbnail})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
          </div>
        </div>
      </div>
      <span className="mt-1 text-xs text-gray-600 dark:text-gray-300 text-center truncate w-full">
        {story.author.username}
      </span>
    </motion.div>
  );
};

export default StoryItem;