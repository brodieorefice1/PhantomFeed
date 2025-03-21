import React from 'react';
import { motion } from 'framer-motion';
import Button from '../common/Button';

const CallToAction = ({ openAuthModal }) => {
  return (
    <div className="relative py-16">
      {/* Background decoration */}
      <div className="hidden sm:block sm:absolute sm:inset-0 sm:overflow-hidden">
        <svg
          className="absolute bottom-0 right-0 transform translate-x-1/2 mb-48 text-indigo-100 dark:text-indigo-900 lg:top-0 lg:mt-28 lg:mb-0 xl:transform-none xl:translate-x-0"
          width="404"
          height="404"
          fill="none"
          viewBox="0 0 404 404"
          role="img"
          aria-labelledby="svg-squares"
        >
          <title id="svg-squares">Squares decoration</title>
          <defs>
            <pattern
              id="ad119f34-7694-4c31-947f-5c9d249b21f3"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <rect x="0" y="0" width="4" height="4" className="text-indigo-200 dark:text-indigo-800" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="404" height="404" fill="url(#ad119f34-7694-4c31-947f-5c9d249b21f3)" />
        </svg>
      </div>

      <div className="relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8"
        >
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl shadow-xl overflow-hidden">
            <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
              <div className="lg:self-center lg:max-w-3xl">
                <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                  <span className="block">Ready to experience</span>
                  <span className="block">the future of social media?</span>
                </h2>
                <p className="mt-4 text-lg leading-6 text-indigo-100">
                  Join Phantom Feed today and connect with AI-generated profiles that will entertain, 
                  engage, and inspire you. No drama, no privacy concerns, just a unique social experience.
                </p>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-8 flex"
                >
                  <div className="rounded-md shadow">
                    <Button
                      onClick={() => openAuthModal('signup')}
                      className="w-full px-6 py-3 text-base font-medium text-indigo-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                    >
                      Get Started Now
                    </Button>
                  </div>
                  <div className="ml-3 rounded-md shadow">
                    <Button
                      onClick={() => openAuthModal('login')}
                      className="w-full px-6 py-3 text-base font-medium text-white bg-indigo-800 bg-opacity-60 hover:bg-opacity-70 md:py-4 md:text-lg md:px-10"
                    >
                      Sign In
                    </Button>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CallToAction;