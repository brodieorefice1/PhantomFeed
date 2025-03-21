import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Avatar from '../common/Avatar';
import Button from '../common/Button';
import { FiThumbsUp, FiMessageSquare, FiUsers, FiHeart } from 'react-icons/fi';

// Mock data for interactions
const generateMockInteractions = (profile, isCurrentUser) => {
  const interactions = [];
  
  // For user profile, show AI interactions with the user
  if (!profile.isAI && isCurrentUser) {
    interactions.push(
      {
        id: 'interaction-1',
        type: 'like',
        timestamp: new Date(Date.now() - 2 * 3600000).toISOString(),
        content: 'liked your post',
        aiProfile: {
          id: 'ai-user-1',
          username: 'NeuralNomad',
          avatar: '/assets/images/ai-profiles/avatar-2.jpg'
        },
        targetContent: 'Thoughts on technology: Really enjoying the latest developments! #Technology'
      },
      {
        id: 'interaction-2',
        type: 'comment',
        timestamp: new Date(Date.now() - 5 * 3600000).toISOString(),
        content: 'I find this perspective fascinating. Have you considered how quantum computing might affect this area?',
        aiProfile: {
          id: 'ai-user-3',
          username: 'PixelPoet',
          avatar: '/assets/images/ai-profiles/avatar-3.jpg'
        },
        targetContent: 'Just read an article about the future of AI. The possibilities are endless!'
      },
      {
        id: 'interaction-3',
        type: 'follow',
        timestamp: new Date(Date.now() - 1 * 86400000).toISOString(),
        content: 'started following you',
        aiProfile: {
          id: 'ai-user-4',
          username: 'QuantumQuirk',
          avatar: '/assets/images/ai-profiles/avatar-4.jpg'
        }
      },
      {
        id: 'interaction-4',
        type: 'like',
        timestamp: new Date(Date.now() - 3 * 86400000).toISOString(),
        content: 'liked your comment',
        aiProfile: {
          id: 'ai-user-5',
          username: 'SynthSage',
          avatar: '/assets/images/ai-profiles/avatar-5.jpg'
        },
        targetContent: 'This is a really thought-provoking analysis!'
      }
    );
  } 
  // For AI profiles, show user interactions with the AI
  else if (profile.isAI && !isCurrentUser) {
    interactions.push(
      {
        id: 'interaction-1',
        type: 'like',
        timestamp: new Date(Date.now() - 1 * 3600000).toISOString(),
        content: 'You liked their post',
        targetContent: profile.username + ' posted: ' + 'Thinking about how neural networks are transforming the way we interact with technology.'
      },
      {
        id: 'interaction-2',
        type: 'comment',
        timestamp: new Date(Date.now() - 8 * 3600000).toISOString(),
        content: 'You commented: "This is a fascinating perspective. I\'ve been thinking about this topic as well."',
        targetContent: profile.username + ' posted: ' + 'There\'s something fascinating about how algorithms can capture aesthetics.'
      },
      {
        id: 'interaction-3',
        type: 'follow',
        timestamp: new Date(Date.now() - 2 * 86400000).toISOString(),
        content: 'You started following ' + profile.username,
      },
      {
        id: 'interaction-4',
        type: 'mention',
        timestamp: new Date(Date.now() - 4 * 86400000).toISOString(),
        content: 'You mentioned ' + profile.username + ' in a post',
        targetContent: 'Just had an interesting conversation with @' + profile.username + ' about digital art and creativity!'
      }
    );
  }
  
  return interactions;
};

const AIInteractions = ({ profile, isCurrentUser }) => {
  const [interactions, setInteractions] = useState(generateMockInteractions(profile, isCurrentUser));
  const [displayMode, setDisplayMode] = useState('all'); // 'all', 'likes', 'comments', 'follows'
  
  const getInteractionIcon = (type) => {
    switch (type) {
      case 'like':
        return <FiThumbsUp className="w-5 h-5 text-blue-500" />;
      case 'comment':
        return <FiMessageSquare className="w-5 h-5 text-green-500" />;
      case 'follow':
        return <FiUsers className="w-5 h-5 text-purple-500" />;
      case 'mention':
        return <FiHeart className="w-5 h-5 text-pink-500" />;
      default:
        return <FiThumbsUp className="w-5 h-5 text-gray-500" />;
    }
  };
  
  const filteredInteractions = displayMode === 'all' 
    ? interactions 
    : interactions.filter(interaction => interaction.type === displayMode);
  
  return (
    <div className="mt-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2 sm:mb-0">
            {profile.isAI ? 'Your Interactions with this AI' : 'AI Interactions with You'}
          </h3>
          
          <div className="flex flex-wrap gap-2">
            <Button 
              className={`px-3 py-1.5 text-xs font-medium rounded-full ${
                displayMode === 'all' 
                  ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200' 
                  : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
              }`}
              onClick={() => setDisplayMode('all')}
            >
              All
            </Button>
            <Button 
              className={`px-3 py-1.5 text-xs font-medium rounded-full ${
                displayMode === 'like' 
                  ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200' 
                  : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
              }`}
              onClick={() => setDisplayMode('like')}
            >
              Likes
            </Button>
            <Button 
              className={`px-3 py-1.5 text-xs font-medium rounded-full ${
                displayMode === 'comment' 
                  ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200' 
                  : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
              }`}
              onClick={() => setDisplayMode('comment')}
            >
              Comments
            </Button>
            <Button 
              className={`px-3 py-1.5 text-xs font-medium rounded-full ${
                displayMode === 'follow' 
                  ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200' 
                  : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
              }`}
              onClick={() => setDisplayMode('follow')}
            >
              Follows
            </Button>
          </div>
        </div>
        
        {filteredInteractions.length > 0 ? (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredInteractions.map((interaction) => (
              <motion.div
                key={interaction.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-4 first:pt-0 last:pb-0"
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    {interaction.aiProfile ? (
                      <Avatar 
                        src={interaction.aiProfile.avatar} 
                        alt={interaction.aiProfile.username}
                        className="w-10 h-10 rounded-full"
                      />
                    ) : (
                      <Avatar 
                        src="/assets/images/user-avatar.jpg"
                        alt="You"
                        className="w-10 h-10 rounded-full"
                      />
                    )}
                  </div>
                  
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center space-x-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {interaction.aiProfile ? interaction.aiProfile.username : 'You'}
                      </p>
                      
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
                        {interaction.aiProfile ? 'AI' : 'You'}
                      </span>
                    </div>
                    
                    <div className="mt-1 flex items-center space-x-2">
                      <div className="flex-shrink-0">
                        {getInteractionIcon(interaction.type)}
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {interaction.content}
                      </p>
                    </div>
                    
                    {interaction.targetContent && (
                      <div className="mt-2">
                        <div className="p-2 rounded-md bg-gray-100 dark:bg-gray-700">
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            {interaction.targetContent}
                          </p>
                        </div>
                      </div>
                    )}
                    
                    <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      {new Date(interaction.timestamp).toLocaleString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">No interactions found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIInteractions;