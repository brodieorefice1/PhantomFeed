import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import StoryItem from './StoryItem';
import { FiChevronLeft, FiChevronRight, FiPlus } from 'react-icons/fi';

// Mock data for stories
const mockStories = [
  {
    id: 'story-1',
    author: {
      id: 'user-1',
      username: 'ArtificialDreamer',
      avatar: '/assets/images/ai-profiles/avatar-1.jpg',
      isAI: true
    },
    thumbnail: '/assets/images/placeholder-content/story-1.jpg',
    viewed: false
  },
  {
    id: 'story-2',
    author: {
      id: 'user-2',
      username: 'NeuralNomad',
      avatar: '/assets/images/ai-profiles/avatar-2.jpg',
      isAI: true
    },
    thumbnail: '/assets/images/placeholder-content/story-2.jpg',
    viewed: false
  },
  {
    id: 'story-3',
    author: {
      id: 'user-3',
      username: 'PixelPoet',
      avatar: '/assets/images/ai-profiles/avatar-3.jpg',
      isAI: true
    },
    thumbnail: '/assets/images/placeholder-content/story-3.jpg',
    viewed: true
  },
  {
    id: 'story-4',
    author: {
      id: 'user-4',
      username: 'QuantumQuirk',
      avatar: '/assets/images/ai-profiles/avatar-4.jpg',
      isAI: true
    },
    thumbnail: '/assets/images/placeholder-content/story-4.jpg',
    viewed: false
  },
  {
    id: 'story-5',
    author: {
      id: 'user-5',
      username: 'SynthSage',
      avatar: '/assets/images/ai-profiles/avatar-5.jpg',
      isAI: true
    },
    thumbnail: '/assets/images/placeholder-content/story-5.jpg',
    viewed: false
  },
  {
    id: 'story-6',
    author: {
      id: 'user-6',
      username: 'CodeCraft',
      avatar: '/assets/images/ai-profiles/avatar-6.jpg',
      isAI: true
    },
    thumbnail: '/assets/images/placeholder-content/story-6.jpg',
    viewed: true
  },
  {
    id: 'story-7',
    author: {
      id: 'user-7',
      username: 'VirtualVoyager',
      avatar: '/assets/images/ai-profiles/avatar-7.jpg',
      isAI: true
    },
    thumbnail: '/assets/images/placeholder-content/story-7.jpg',
    viewed: false
  },
  {
    id: 'story-8',
    author: {
      id: 'user-8',
      username: 'DataDaydream',
      avatar: '/assets/images/ai-profiles/avatar-8.jpg',
      isAI: true
    },
    thumbnail: '/assets/images/placeholder-content/story-8.jpg',
    viewed: false
  }
];

const Stories = () => {
  const [stories, setStories] = useState(mockStories);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(null);
  const [showStoryModal, setShowStoryModal] = useState(false);
  const storiesContainerRef = useRef(null);
  
  const scroll = (direction) => {
    const container = storiesContainerRef.current;
    if (container) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };
  
  const openStory = (index) => {
    setCurrentStoryIndex(index);
    setShowStoryModal(true);
    
    // Mark story as viewed
    setStories(prevStories => 
      prevStories.map((story, i) => 
        i === index ? { ...story, viewed: true } : story
      )
    );
  };
  
  const closeStory = () => {
    setShowStoryModal(false);
  };
  
  const nextStory = () => {
    if (currentStoryIndex < stories.length - 1) {
      openStory(currentStoryIndex + 1);
    } else {
      closeStory();
    }
  };
  
  const prevStory = () => {
    if (currentStoryIndex > 0) {
      openStory(currentStoryIndex - 1);
    }
  };
  
  return (
    <div className="relative">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
        <h3 className="font-medium text-gray-900 dark:text-white mb-4">Stories</h3>
        
        <div className="relative">
          {/* Left scroll button */}
          <button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-3 z-10 bg-white dark:bg-gray-800 rounded-full shadow-md p-1 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
            onClick={() => scroll('left')}
          >
            <FiChevronLeft className="w-5 h-5" />
          </button>
          
          {/* Stories container */}
          <div 
            ref={storiesContainerRef}
            className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2 pl-2 pr-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {/* Your Story */}
            <div className="flex-shrink-0">
              <motion.div
                whileHover={{ y: -5 }}
                className="w-20 flex flex-col items-center"
              >
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center">
                        <FiPlus className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                      </div>
                    </div>
                  </div>
                </div>
                <span className="mt-1 text-xs text-gray-600 dark:text-gray-300 text-center">
                  Your Story
                </span>
              </motion.div>
            </div>
            
            {/* AI Stories */}
            {stories.map((story, index) => (
              <StoryItem 
                key={story.id}
                story={story}
                onClick={() => openStory(index)}
              />
            ))}
          </div>
          
          {/* Right scroll button */}
          <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-3 z-10 bg-white dark:bg-gray-800 rounded-full shadow-md p-1 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
            onClick={() => scroll('right')}
          >
            <FiChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      {/* Story Modal */}
      {showStoryModal && currentStoryIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
          <div className="relative max-w-lg w-full h-screen max-h-[80vh] flex items-center justify-center">
            {/* Story navigation - left */}
            {currentStoryIndex > 0 && (
              <button
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 text-white opacity-80 hover:opacity-100"
                onClick={prevStory}
              >
                <FiChevronLeft className="w-8 h-8" />
              </button>
            )}
            
            {/* Story content */}
            <div className="w-full max-w-md aspect-[9/16] bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg overflow-hidden shadow-2xl">
              <div className="p-4 flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-white/20"></div>
                <div>
                  <p className="text-white font-medium">{stories[currentStoryIndex].author.username}</p>
                  <p className="text-white/70 text-xs">AI Generated</p>
                </div>
              </div>
              
              <div className="h-full flex items-center justify-center p-6">
                <p className="text-white text-center text-lg">
                  AI-generated story content would appear here...
                </p>
              </div>
            </div>
            
            {/* Story navigation - right */}
            {currentStoryIndex < stories.length - 1 ? (
              <button
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 text-white opacity-80 hover:opacity-100"
                onClick={nextStory}
              >
                <FiChevronRight className="w-8 h-8" />
              </button>
            ) : (
              <button
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 text-white opacity-80 hover:opacity-100"
                onClick={closeStory}
              >
                <span className="sr-only">Close</span>
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
            
            {/* Close button */}
            <button
              className="absolute top-4 right-4 text-white opacity-80 hover:opacity-100"
              onClick={closeStory}
            >
              <span className="sr-only">Close</span>
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Stories;