import React from 'react';
import { motion } from 'framer-motion';
import { FiEdit2, FiSettings, FiShare2, FiMessageCircle, FiUserPlus, FiUserCheck } from 'react-icons/fi';
import Avatar from '../common/Avatar';
import Button from '../common/Button';

const ProfileHeader = ({ profile, isCurrentUser, isFollowing, onFollow, onEdit }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
      {/* Cover Image */}
      <div 
        className="h-48 md:h-64 bg-gradient-to-r from-indigo-500 to-purple-600 relative"
        style={{
          backgroundImage: profile.coverImage ? `url(${profile.coverImage})` : '',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {isCurrentUser && (
          <button 
            className="absolute top-4 right-4 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70 transition"
            onClick={onEdit}
          >
            <FiEdit2 className="w-5 h-5" />
          </button>
        )}
      </div>
      
      {/* Profile Info */}
      <div className="px-4 sm:px-6 lg:px-8 pb-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end -mt-12">
          <div className="flex flex-col sm:flex-row sm:items-end">
            <Avatar 
              src={profile.avatar} 
              alt={profile.username}
              className="w-24 h-24 sm:w-32 sm:h-32 border-4 border-white dark:border-gray-800 rounded-full"
            />
            
            <div className="mt-4 sm:mt-0 sm:ml-4">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {profile.fullName}
                </h1>
                
                {profile.isVerified && (
                  <svg className="ml-1.5 w-5 h-5 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-3.2-7.4l1.4-1.4 1.8 1.8 5.1-5.1 1.4 1.4-6.5 6.5-3.2-3.2z" />
                  </svg>
                )}
                
                {profile.isAI && (
                  <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
                    AI Profile
                  </span>
                )}
              </div>
              
              <p className="text-gray-500 dark:text-gray-400">@{profile.username}</p>
              <p className="mt-2 text-gray-700 dark:text-gray-300 max-w-md">{profile.bio}</p>
            </div>
          </div>
          
          <div className="mt-6 sm:mt-0 flex flex-wrap gap-2">
            {isCurrentUser ? (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600"
                  onClick={onEdit}
                >
                  <FiEdit2 className="w-4 h-4" />
                  <span>Edit Profile</span>
                </Button>
              </motion.div>
            ) : (
              <>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                      isFollowing 
                        ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200' 
                        : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                    }`}
                    onClick={onFollow}
                  >
                    {isFollowing ? (
                      <>
                        <FiUserCheck className="w-4 h-4" />
                        <span>Following</span>
                      </>
                    ) : (
                      <>
                        <FiUserPlus className="w-4 h-4" />
                        <span>Follow</span>
                      </>
                    )}
                  </Button>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <FiMessageCircle className="w-4 h-4" />
                    <span>Message</span>
                  </Button>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    className="flex items-center space-x-2 p-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <FiShare2 className="w-4 h-4" />
                  </Button>
                </motion.div>
              </>
            )}
          </div>
        </div>
        
        {/* Stats */}
        <div className="mt-6 flex space-x-8 border-t border-gray-200 dark:border-gray-700 pt-4">
          <div className="text-center">
            <span className="block font-bold text-gray-700 dark:text-gray-200">{profile.stats.posts}</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">Posts</span>
          </div>
          <div className="text-center">
            <span className="block font-bold text-gray-700 dark:text-gray-200">{profile.stats.following}</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">Following</span>
          </div>
          <div className="text-center">
            <span className="block font-bold text-gray-700 dark:text-gray-200">{profile.stats.followers}</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">Followers</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;