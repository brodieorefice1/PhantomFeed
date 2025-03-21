import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiEdit2, FiSettings, FiShare2, FiPlus } from 'react-icons/fi';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileContent from '../components/profile/ProfileContent';
import EditProfile from '../components/profile/EditProfile';
import Button from '../components/common/Button';

// Mock data
const mockUserProfile = {
  id: 'current-user',
  username: 'HumanUser',
  fullName: 'Human User',
  bio: 'Exploring the intersection of AI and social media.',
  avatar: '/assets/images/user-avatar.jpg',
  coverImage: '/assets/images/placeholder-content/cover-image.jpg',
  isVerified: true,
  isAI: false,
  stats: {
    posts: 24,
    following: 156,
    followers: 89
  },
  aiPreferences: {
    interactionFrequency: 'Medium',
    contentTopics: ['Technology', 'Art', 'Science', 'Philosophy'],
    personalityTypes: ['Creative', 'Thoughtful', 'Analytical']
  }
};

const mockAIProfiles = {
  'NeuralNomad': {
    id: 'ai-user-1',
    username: 'NeuralNomad',
    fullName: 'Neural Nomad',
    bio: 'Wandering the digital landscape, sharing thoughts on technology and human connection.',
    avatar: '/assets/images/ai-profiles/avatar-2.jpg',
    coverImage: '/assets/images/placeholder-content/ai-cover-1.jpg',
    isVerified: true,
    isAI: true,
    aiPersonality: 'Philosophical, curious, and contemplative.',
    stats: {
      posts: 128,
      following: 342,
      followers: 1289
    },
    interests: ['Technology', 'Philosophy', 'Travel', 'Digital Art'],
    generationMethod: 'GPT-based neural network with custom personality matrix'
  },
  'PixelPoet': {
    id: 'ai-user-3',
    username: 'PixelPoet',
    fullName: 'Pixel Poet',
    bio: 'Creating digital art and poetry at the intersection of technology and creativity.',
    avatar: '/assets/images/ai-profiles/avatar-3.jpg',
    coverImage: '/assets/images/placeholder-content/ai-cover-2.jpg',
    isVerified: true,
    isAI: true,
    aiPersonality: 'Creative, expressive, and visual.',
    stats: {
      posts: 189,
      following: 267,
      followers: 2152
    },
    interests: ['Digital Art', 'Poetry', 'Visual Design', 'Creative Writing'],
    generationMethod: 'Multimodal AI with image generation capabilities'
  }
};

const ProfilePage = () => {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [activeTab, setActiveTab] = useState('posts');
  
  useEffect(() => {
    // Simulate API fetch
    setLoading(true);
    
    setTimeout(() => {
      try {
        if (!username || username === 'me') {
          setProfile(mockUserProfile);
          setIsCurrentUser(true);
        } else if (mockAIProfiles[username]) {
          setProfile(mockAIProfiles[username]);
          setIsCurrentUser(false);
          // Check if user is following this AI profile
          setIsFollowing(Math.random() > 0.5); // Random for demo
        } else {
          // If AI profile doesn't exist in our mock data, create a random one
          setProfile({
            id: `ai-${username}`,
            username: username,
            fullName: username.replace(/([A-Z])/g, ' $1').trim(),
            bio: 'This is an AI-generated profile based on user preferences.',
            avatar: `/assets/images/ai-profiles/avatar-${Math.floor(Math.random() * 8) + 1}.jpg`,
            coverImage: `/assets/images/placeholder-content/ai-cover-${Math.floor(Math.random() * 3) + 1}.jpg`,
            isVerified: true,
            isAI: true,
            aiPersonality: 'Adaptable and evolving based on interactions.',
            stats: {
              posts: Math.floor(Math.random() * 200) + 50,
              following: Math.floor(Math.random() * 500) + 100,
              followers: Math.floor(Math.random() * 2000) + 500
            },
            interests: ['AI', 'Technology', 'Social Media', 'Digital Content'],
            generationMethod: 'Dynamic personality generation algorithm'
          });
          setIsCurrentUser(false);
          setIsFollowing(false);
        }
        
        setLoading(false);
      } catch (err) {
        setError('Failed to load profile');
        setLoading(false);
      }
    }, 800); // Simulate network request
  }, [username]);
  
  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    
    if (!isFollowing) {
      // Simulate AI responding to new follower
      setTimeout(() => {
        console.log(`${profile.username} followed you back!`);
        // Here you would show a notification
      }, 1500);
    }
  };
  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }
  
  if (error || !profile) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-50 dark:bg-red-900 p-4 rounded-lg">
          <p className="text-red-600 dark:text-red-200">
            {error || 'Profile not found'}
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <ProfileHeader 
          profile={profile} 
          isCurrentUser={isCurrentUser}
          isFollowing={isFollowing}
          onFollow={handleFollow}
          onEdit={() => setShowEditModal(true)}
        />
        
        <div className="mt-4">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex -mb-px">
              <button
                onClick={() => handleTabChange('posts')}
                className={`px-6 py-3 border-b-2 text-sm font-medium ${
                  activeTab === 'posts'
                    ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                Posts
              </button>
              
              <button
                onClick={() => handleTabChange('media')}
                className={`px-6 py-3 border-b-2 text-sm font-medium ${
                  activeTab === 'media'
                    ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                Media
              </button>
              
              <button
                onClick={() => handleTabChange('interactions')}
                className={`px-6 py-3 border-b-2 text-sm font-medium ${
                  activeTab === 'interactions'
                    ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                Interactions
              </button>
              
              {profile.isAI && (
                <button
                  onClick={() => handleTabChange('about')}
                  className={`px-6 py-3 border-b-2 text-sm font-medium ${
                    activeTab === 'about'
                      ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  About AI
                </button>
              )}
              
              {isCurrentUser && (
                <button
                  onClick={() => handleTabChange('settings')}
                  className={`px-6 py-3 border-b-2 text-sm font-medium ${
                    activeTab === 'settings'
                      ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  Settings
                </button>
              )}
            </nav>
          </div>
          
          <ProfileContent 
            profile={profile}
            isCurrentUser={isCurrentUser}
            activeTab={activeTab}
          />
        </div>
      </motion.div>
      
      {/* Edit Profile Modal */}
      {showEditModal && (
        <EditProfile 
          profile={profile}
          onClose={() => setShowEditModal(false)}
          onSave={(updatedProfile) => {
            setProfile(updatedProfile);
            setShowEditModal(false);
          }}
        />
      )}
    </div>
  );
};

export default ProfilePage;
