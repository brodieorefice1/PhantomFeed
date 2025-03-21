import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Avatar from '../common/Avatar';
import { FiHeart } from 'react-icons/fi';

const Comment = ({ comment, postAuthor }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(comment.likes || 0);
  
  const isAuthorComment = comment.author.id === postAuthor.id;
  const isUserComment = comment.author.username === 'You';
  
  const handleLike = () => {
    if (!liked) {
      setLikeCount(prevCount => prevCount + 1);
      setLiked(true);
    } else {
      setLikeCount(prevCount => prevCount - 1);
      setLiked(false);
    }
  };

  // Format timestamp to show relative time
  const formatRelativeTime = (timestamp) => {
    const now = new Date();
    const commentDate = new Date(timestamp);
    const diffSeconds = Math.floor((now - commentDate) / 1000);
    
    if (diffSeconds < 60) {
      return 'just now';
    } else if (diffSeconds < 3600) {
      const minutes = Math.floor(diffSeconds / 60);
      return `${minutes}m ago`;
    } else if (diffSeconds < 86400) {
      const hours = Math.floor(diffSeconds / 3600);
      return `${hours}h ago`;
    } else {
      const days = Math.floor(diffSeconds / 86400);
      return `${days}d ago`;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex space-x-3 ${isAuthorComment ? 'bg-indigo-50 dark:bg-indigo-900/20 p-2 rounded-lg' : ''}`}
    >
      <Link to={isUserComment ? '/profile' : `/profile/${comment.author.username}`} className="flex-shrink-0">
        <Avatar 
          src={comment.author.avatar} 
          alt={comment.author.username}
          className="w-8 h-8 rounded-full border-2 border-gray-100 dark:border-gray-700"
        />
      </Link>
      
      <div className="flex-1 min-w-0">
        <div className="bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-2">
          <div className="flex items-center space-x-2">
            <Link 
              to={isUserComment ? '/profile' : `/profile/${comment.author.username}`}
              className="font-medium text-gray-900 dark:text-white hover:underline"
            >
              {comment.author.username}
            </Link>
            
            {isAuthorComment && (
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
                Author
              </span>
            )}
            
            {comment.author.isAI && (
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                AI
              </span>
            )}
          </div>
          
          <p className="text-gray-800 dark:text-gray-200 whitespace-pre-line">
            {comment.content}
          </p>
        </div>
        
        <div className="flex items-center space-x-4 mt-1 ml-1 text-xs text-gray-500 dark:text-gray-400">
          <button 
            className={`flex items-center space-x-1 ${liked ? 'text-pink-600 dark:text-pink-400' : 'hover:text-gray-700 dark:hover:text-gray-300'}`}
            onClick={handleLike}
          >
            <FiHeart className={`w-3.5 h-3.5 ${liked ? 'fill-current' : ''}`} />
            <span>{likeCount > 0 ? likeCount : ''} Like</span>
          </button>
          
          <button className="hover:text-gray-700 dark:hover:text-gray-300">
            Reply
          </button>
          
          <span>{formatRelativeTime(comment.timestamp)}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default Comment;    