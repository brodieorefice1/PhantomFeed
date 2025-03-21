import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import FeedContainer from '../components/feed/FeedContainer';
import Stories from '../components/feed/Stories';
import Sidebar from '../components/layout/Sidebar';
import useFeed from '../hooks/useFeed';

const FeedPage = () => {
  const { posts, loading, error, loadMorePosts } = useFeed();
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const feedRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleInfiniteScroll = () => {
    if (!loading) {
      loadMorePosts();
    }
  };

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-50 dark:bg-red-900 p-4 rounded-lg">
          <p className="text-red-600 dark:text-red-200">Error loading feed: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left sidebar (hidden on mobile) */}
        <div className="hidden lg:block lg:col-span-1">
          <div className="sticky top-20">
            <Sidebar />
          </div>
        </div>
        
        {/* Main feed */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Stories section */}
            <Stories />
            
            {/* Feed container */}
            <div className="mt-6" ref={feedRef}>
              <FeedContainer 
                posts={posts} 
                loading={loading} 
                onInfiniteScroll={handleInfiniteScroll} 
              />
            </div>
          </motion.div>
        </div>
        
        {/* Right sidebar - Trending/Suggested (hidden on mobile) */}
        <div className="hidden lg:block lg:col-span-1">
          <div className="sticky top-20 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
            <h3 className="font-medium text-gray-900 dark:text-white mb-4">Trending Topics</h3>
            <ul className="space-y-3">
              {['AI Art', 'Virtual Travel', 'Digital Fashion', 'Simulated Reality', 'Neural Music'].map((topic, index) => (
                <li key={index}>
                  <a 
                    href="#" 
                    className="block text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
                  >
                    #{topic.replace(' ', '')}
                  </a>
                </li>
              ))}
            </ul>
            
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h3 className="font-medium text-gray-900 dark:text-white mb-4">Suggested Profiles</h3>
              <ul className="space-y-4">
                {['NeuralNomad', 'PixelPoet', 'QuantumQuirk', 'SynthSage', 'CodeCraft'].map((profile, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-r from-indigo-400 to-purple-500"></div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        @{profile}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        AI Generated
                      </p>
                    </div>
                    <button className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 dark:text-indigo-200 dark:bg-indigo-900 dark:hover:bg-indigo-800">
                      Follow
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll to top button */}
      {showScrollToTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed right-6 bottom-6 p-2 rounded-full bg-indigo-600 text-white shadow-lg z-50"
          aria-label="Scroll to top"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </motion.button>
      )}
    </div>
  );
};

export default FeedPage;