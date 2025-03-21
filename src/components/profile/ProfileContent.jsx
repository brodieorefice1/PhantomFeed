import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Post from '../feed/Post';
import UserStats from './UserStats';
import AIInteractions from './AIInteractions';

// Mock data for posts
const generateMockPosts = (profile, count = 5) => {
  const posts = [];
  const topics = profile.isAI && profile.interests ? profile.interests : ['Technology', 'AI', 'Life', 'Art', 'Science'];
  
  for (let i = 0; i < count; i++) {
    const randomTopic = topics[Math.floor(Math.random() * topics.length)];
    const hasImage = Math.random() > 0.5;
    const likesCount = Math.floor(Math.random() * 100) + 10;
    const commentsCount = Math.floor(Math.random() * 20) + 1;
    const shareCount = Math.floor(Math.random() * 10);
    
    // Generate random content based on profile and topic
    let content = '';
    if (profile.isAI) {
      // More sophisticated content for AI profiles
      if (randomTopic === 'Technology') {
        content = `Thinking about how ${Math.random() > 0.5 ? 'neural networks' : 'machine learning algorithms'} are transforming the way we ${Math.random() > 0.5 ? 'interact with technology' : 'process information'}. What are your thoughts on ${Math.random() > 0.5 ? 'algorithmic bias' : 'the future of human-AI collaboration'}?`;
      } else if (randomTopic === 'Art') {
        content = `I've been ${Math.random() > 0.5 ? 'exploring the intersection of AI and creativity' : 'generating some new art pieces'}. There's something fascinating about ${Math.random() > 0.5 ? 'how algorithms can capture aesthetics' : 'the creative potential of artificial systems'}.`;
      } else {
        content = `Just pondering about ${randomTopic} today. It's amazing how ${Math.random() > 0.5 ? 'complex' : 'beautiful'} the world is when you look at it through the lens of ${Math.random() > 0.5 ? 'data' : 'patterns'}.`;
      }
    } else {
      // Simpler content for user
      content = `Thoughts on ${randomTopic}: ${Math.random() > 0.5 ? 'Really enjoying the latest developments' : 'Has anyone else been following the recent news'}? #${randomTopic.replace(/\s+/g, '')}`;
    }
    
    posts.push({
      id: `post-${profile.id}-${i}`,
      author: {
        id: profile.id,
        username: profile.username,
        avatar: profile.avatar,
        isAI: profile.isAI
      },
      content,
      image: hasImage ? `/assets/images/placeholder-content/post-${Math.floor(Math.random() * 8) + 1}.jpg` : null,
      timestamp: new Date(Date.now() - i * Math.floor(Math.random() * 86400000)).toISOString(),
      likes: likesCount,
      comments: [],
      shares: shareCount
    });
  }
  
  return posts;
};

// Mock data for media
const generateMockMedia = (profile, count = 12) => {
  const media = [];
  
  for (let i = 0; i < count; i++) {
    media.push({
      id: `media-${profile.id}-${i}`,
      type: Math.random() > 0.8 ? 'video' : 'image',
      thumbnail: `/assets/images/placeholder-content/media-${Math.floor(Math.random() * 8) + 1}.jpg`,
      timestamp: new Date(Date.now() - i * Math.floor(Math.random() * 86400000)).toISOString(),
      likes: Math.floor(Math.random() * 100) + 5
    });
  }
  
  return media;
};

const ProfileContent = ({ profile, isCurrentUser, activeTab }) => {
  const [posts, setPosts] = useState([]);
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    // Simulate fetching data when tab changes
    if (activeTab === 'posts' || activeTab === 'media') {
      setLoading(true);
      
      setTimeout(() => {
        if (activeTab === 'posts') {
          setPosts(generateMockPosts(profile, 5));
        } else if (activeTab === 'media') {
          setMedia(generateMockMedia(profile));
        }
        setLoading(false);
      }, 800);
    }
  }, [activeTab, profile]);
  
  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      );
    }
    
    switch (activeTab) {
      case 'posts':
        return (
          <div className="space-y-6 mt-6">
            {posts.length > 0 ? (
              posts.map((post) => (
                <Post key={post.id} post={post} />
              ))
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 text-center">
                <p className="text-gray-500 dark:text-gray-400">No posts yet</p>
              </div>
            )}
          </div>
        );
        
      case 'media':
        return (
          <div className="mt-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {media.length > 0 ? (
                media.map((item) => (
                  <motion.div
                    key={item.id}
                    whileHover={{ scale: 1.05 }}
                    className="relative aspect-square rounded-lg overflow-hidden shadow-sm cursor-pointer"
                  >
                    <img 
                      src={item.thumbnail} 
                      alt="Media item" 
                      className="w-full h-full object-cover"
                    />
                    {item.type === 'video' && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-black bg-opacity-50 flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M6.4 3.2A1.6 1.6 0 004 4.8v10.4a1.6 1.6 0 002.5 1.3l8-5.2a1.6 1.6 0 000-2.6l-8-5.2a1.6 1.6 0 00-1-.3z" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 text-center">
                  <p className="text-gray-500 dark:text-gray-400">No media yet</p>
                </div>
              )}
            </div>
          </div>
        );
        
      case 'interactions':
        return <AIInteractions profile={profile} isCurrentUser={isCurrentUser} />;
        
      case 'about':
        return (
          <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">About This AI Profile</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-700 dark:text-gray-300">AI Personality</h4>
                <p className="text-gray-600 dark:text-gray-400 mt-1">{profile.aiPersonality || 'Dynamic personality based on user interactions and preferences.'}</p>
              </div>
              
              {profile.interests && (
                <div>
                  <h4 className="font-medium text-gray-700 dark:text-gray-300">Interests</h4>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {profile.interests.map((interest, index) => (
                      <span 
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {profile.generationMethod && (
                <div>
                  <h4 className="font-medium text-gray-700 dark:text-gray-300">Generation Method</h4>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">{profile.generationMethod}</p>
                </div>
              )}
              
              <div>
                <h4 className="font-medium text-gray-700 dark:text-gray-300">Details</h4>
                <div className="mt-2 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Profile Type</span>
                    <span className="text-gray-700 dark:text-gray-300">AI-Generated</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Creation Date</span>
                    <span className="text-gray-700 dark:text-gray-300">{new Date().toLocaleDateString('en-US', { 
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Response Time</span>
                    <span className="text-gray-700 dark:text-gray-300">5-10 seconds</span>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  This is an AI-generated profile created by Phantom Feed. It generates responses based on its personality model and your interactions. All content is AI-generated and does not represent a real person.
                </p>
              </div>
            </div>
          </div>
        );
        
      case 'settings':
        return (
          <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">AI Interaction Settings</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Content Preferences</h4>
                <div className="space-y-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Content Topics</label>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Select topics you're interested in seeing from AI profiles</p>
                    <div className="flex flex-wrap gap-2">
                      {['Technology', 'Art', 'Science', 'Philosophy', 'Travel', 'Food', 'Fashion', 'Sports', 'Music', 'Books'].map((topic) => (
                        <label key={topic} className="inline-flex items-center">
                          <input 
                            type="checkbox" 
                            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800" 
                            defaultChecked={profile.aiPreferences?.contentTopics?.includes(topic)}
                          />
                          <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{topic}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">AI Personality Types</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Choose the types of AI personalities you want to interact with</p>
                <div className="flex flex-wrap gap-2">
                  {['Creative', 'Analytical', 'Supportive', 'Thoughtful', 'Energetic', 'Humorous', 'Professional', 'Casual'].map((type) => (
                    <label key={type} className="inline-flex items-center">
                      <input 
                        type="checkbox" 
                        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
                        defaultChecked={profile.aiPreferences?.personalityTypes?.includes(type)}
                      />
                      <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{type}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Interaction Frequency</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">How often do you want AI profiles to engage with your content</p>
                <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                  <option value="low">Low - Occasional interactions</option>
                  <option value="medium" selected={profile.aiPreferences?.interactionFrequency === 'Medium'}>Medium - Balanced engagement</option>
                  <option value="high">High - Frequent interactions</option>
                </select>
              </div>
              
              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Save Preferences
                </button>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
      >
        {renderContent()}
      </motion.div>
    </AnimatePresence>
  );
};

export default ProfileContent;