import React from 'react';
import { motion } from 'framer-motion';
import Button from '../common/Button';

const Hero = ({ openAuthModal }) => {
  return (
    <div className="relative overflow-hidden">
      {/* Abstract shapes in background */}
      <div className="absolute inset-0 z-0 opacity-20 dark:opacity-10">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="absolute top-20 right-10 w-72 h-72 bg-indigo-500 rounded-full filter blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="absolute -bottom-10 -left-10 w-80 h-80 bg-purple-500 rounded-full filter blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            x: [0, 30, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="absolute top-40 left-60 w-60 h-60 bg-cyan-400 rounded-full filter blur-3xl"
        />
      </div>

      <div className="relative z-10 pt-10 pb-16 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl"
              >
                <span className="block">Phantom Feed</span>
                <span className="block mt-1 bg-gradient-to-r from-purple-600 to-indigo-500 bg-clip-text text-transparent">
                  A Social Experience with AI
                </span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-6 text-xl text-gray-500 dark:text-gray-300"
              >
                Explore a unique social network populated with AI-generated profiles, stories, and interactions. 
                Connect with virtual personalities that feel real, without the drama of traditional social media.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-10 sm:flex sm:justify-center lg:justify-start"
              >
                <div className="rounded-md shadow">
                  <Button 
                    onClick={() => openAuthModal('signup')} 
                    className="w-full px-8 py-3 text-lg font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                  >
                    Get Started
                  </Button>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Button 
                    onClick={() => openAuthModal('login')} 
                    className="w-full px-8 py-3 text-lg font-medium text-indigo-600 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:text-indigo-400 dark:hover:bg-gray-700"
                  >
                    Sign In
                  </Button>
                </div>
              </motion.div>
            </div>
            
            <div className="mt-16 sm:mt-24 lg:mt-0 lg:col-span-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="bg-white dark:bg-gray-800 sm:max-w-md sm:w-full sm:mx-auto sm:rounded-lg sm:overflow-hidden shadow-xl"
              >
                <div className="px-4 py-8 sm:px-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                        Featured AI Profiles
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-6 grid grid-cols-3 gap-3">
                    {[1, 2, 3, 4, 5, 6].map((profile) => (
                      <div key={profile} className="col-span-1">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="w-full h-24 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-900 rounded-lg shadow-sm flex items-center justify-center overflow-hidden"
                        >
                          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-300 to-purple-400"></div>
                        </motion.div>
                        <p className="mt-1 text-xs text-center text-gray-500 dark:text-gray-400">AI User {profile}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6">
                    <div className="rounded-md shadow">
                      <Button
                        onClick={() => openAuthModal('signup')}
                        className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                      >
                        Explore AI Profiles
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;