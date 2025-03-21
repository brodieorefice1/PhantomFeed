import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/landing/Hero';
import Features from '../components/landing/Features';
import CallToAction from '../components/landing/CallToAction';

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut'
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const LandingPage = ({ openAuthModal }) => {
  return (
    <div className="w-full overflow-hidden">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        <motion.div variants={fadeInUp}>
          <Hero openAuthModal={openAuthModal} />
        </motion.div>
        
        <motion.div 
          variants={fadeInUp}
          className="mt-24 mb-32"
        >
          <Features />
        </motion.div>
        
        <motion.div variants={fadeInUp}>
          <CallToAction openAuthModal={openAuthModal} />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LandingPage;