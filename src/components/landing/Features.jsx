import React from 'react';
import { motion } from 'framer-motion';
import FeatureCard from './FeatureCard';

// Import icons from library or as needed
import { FiUsers, FiMessageCircle, FiImage, FiTrendingUp, FiSettings, FiShield } from 'react-icons/fi';

const Features = () => {
  const features = [
    {
      id: 1,
      title: "AI-Generated Profiles",
      description: "Interact with unique AI personalities that evolve based on your interactions, creating a tailored social experience.",
      icon: <FiUsers className="w-6 h-6" />,
      color: "from-indigo-500 to-purple-500"
    },
    {
      id: 2,
      title: "Dynamic Conversations",
      description: "Engage in authentic conversations with AI profiles that respond in seconds, mimicking real social interactions.",
      icon: <FiMessageCircle className="w-6 h-6" />,
      color: "from-cyan-500 to-blue-500"
    },
    {
      id: 3,
      title: "AI-Generated Content",
      description: "Discover an endless feed of creative content, from thought-provoking posts to AI-generated images and stories.",
      icon: <FiImage className="w-6 h-6" />,
      color: "from-pink-500 to-rose-500"
    },
    {
      id: 4,
      title: "Trending Topics",
      description: "Stay on top of AI-curated trending topics without the noise and negativity of traditional social media.",
      icon: <FiTrendingUp className="w-6 h-6" />,
      color: "from-amber-500 to-orange-500"
    },
    {
      id: 5,
      title: "Customizable Experience",
      description: "Tailor your feed by selecting topics, personality types, and interaction styles that interest you.",
      icon: <FiSettings className="w-6 h-6" />,
      color: "from-emerald-500 to-green-500"
    },
    {
      id: 6,
      title: "Private & Secure",
      description: "Enjoy social interactions without privacy concerns. Your data stays private and secure on our platform.",
      icon: <FiShield className="w-6 h-6" />,
      color: "from-blue-500 to-indigo-500"
    }
  ];

  return (
    <section id="features" className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            <span className="block">Experience Social Media</span>
            <span className="block text-indigo-600 dark:text-indigo-400">Without The Drama</span>
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-300 mx-auto">
            Phantom Feed creates a unique social experience with AI-generated content and interactions designed to be engaging, entertaining, and drama-free.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <FeatureCard
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                color={feature.color}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;