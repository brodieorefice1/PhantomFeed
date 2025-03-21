import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Comment from './Comment';
import Avatar from '../common/Avatar';
import { FiHeart, FiMessageSquare, FiShare2, FiBookmark, FiMoreHorizontal } from 'react-icons/fi';

const Post = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [bookmarked, setBookmarked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState(post.comments || []);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);

  const handleLike = () => {
    if (!liked) {
      setLikeCount(prevCount => prevCount + 1);
      setLiked(true);
      
      // Simulate AI response to like
      setTimeout(() => {
        // Randomly decide if the AI author should like back
        if (Math.random() > 0.5) {
          // Show a notification or toast that the author liked back
          console.log(`${post.author.username} liked your interaction!`);
        }
      }, 1500);
    } else {
      setLikeCount(prevCount => prevCount - 1);
      setLiked(false);
    }
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    setIsSubmitting(true);
    
    // Add user's comment
    const userComment = {
      id: `user-comment-${Date.now()}`,
      author: {
        id: 'current-user',
        username: 'You',
        avatar: '/assets/images/user-avatar.jpg',
        isAI: false
      },
      content: newComment,
      timestamp: new Date().toISOString(),
      likes: 0
    };
    
    setComments(prevComments => [userComment, ...prevComments]);
    setNewComment('');
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: `ai-comment-${Date.now()}`,
        author: post.author,
        content: generateAIResponse(newComment, post.author.username),
        timestamp: new Date().toISOString(),
        likes: 0,
        isAI: true
      };
      
      setComments(prevComments => [aiResponse, ...prevComments]);
      setIsSubmitting(false);
    }, 1500);
  };

  // Simple function to generate AI responses
  const generateAIResponse = (userComment, aiUsername) => {
    const responses = [
      `Thanks for your thoughtful comment! I appreciate your perspective.`,
      `I'm glad my post resonated with you. What else would you like to know?`,
      `That's an interesting point! I hadn't considered that angle before.`,
      `You're absolutely right. I think that adds a lot to the conversation.`,
      `I've been thinking about this topic a lot lately. Your comment gives me more to consider!`
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const shareOptions = [
    { name: 'Copy Link', icon: 'link' },
    { name: 'Share to Profile', icon: 'profile' },
    { name: 'Message', icon: 'message' }
  ];

  const toggleShareOptions = () => {
    setShowShareOptions(!showShareOptions);
  };

  return (
    <motion.div 
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden"
      whileHover={{ y: -2, boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}
      transition={{ duration: 0.2 }}
    >
      {/* Post header */}
      <div className="px-4 py-3 flex items-center justify-between border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <Link to={`/profile/${post.author.username}`}>
            <Avatar 
              src={post.author.avatar} 
              alt={post.author.username}
              className="w-10 h-10 rounded-full border-2 border-indigo-100 dark:border-indigo-900"
            />
          </Link>
          <div>
            <Link 
              to={`/profile/${post.author.username}`}
              className="font-medium text-gray-900 dark:text-white hover:underline"
            >
              {post.author.username}
            </Link>
            <div className="flex items-center space-x-1">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {new Date(post.timestamp).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </span>
              {post.author.isAI && (
                <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
                  AI
                </span>
              )}
            </div>
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
          <FiMoreHorizontal className="w-5 h-5" />
        </button>
      </div>
      
      {/* Post content */}
      <div className="px-4 py-3">
        <p className="text-gray-800 dark:text-gray-200">{post.content}</p>
        
        {post.image && (
          <div className="mt-3 rounded-lg overflow-hidden">
            <img 
              src={post.image} 
              alt="Post attachment" 
              className="w-full h-auto max-h-96 object-cover"
            />
          </div>
        )}
      </div>
      
      {/* Post stats */}
      <div className="px-4 py-2 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-700">
        <div className="flex space-x-4">
          <span>{likeCount} likes</span>
          <button onClick={toggleComments}>
            {comments.length} comments
          </button>
        </div>
        <div>
          {post.shares} shares
        </div>
      </div>
      
      {/* Post actions */}
      <div className="px-4 py-2 flex items-center justify-between border-t border-gray-100 dark:border-gray-700">
        <motion.button 
          className={`flex items-center space-x-1 px-3 py-1 rounded-full ${
            liked 
              ? 'text-pink-600 dark:text-pink-400' 
              : 'text-gray-500 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400'
          }`}
          onClick={handleLike}
          whileTap={{ scale: 0.9 }}
        >
          <FiHeart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
          <span>Like</span>
        </motion.button>
        
        <motion.button 
          className="flex items-center space-x-1 px-3 py-1 rounded-full text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
          onClick={toggleComments}
          whileTap={{ scale: 0.9 }}
        >
          <FiMessageSquare className="w-5 h-5" />
          <span>Comment</span>
        </motion.button>
        
        <div className="relative">
          <motion.button 
            className="flex items-center space-x-1 px-3 py-1 rounded-full text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400"
            onClick={toggleShareOptions}
            whileTap={{ scale: 0.9 }}
          >
            <FiShare2 className="w-5 h-5" />
            <span>Share</span>
          </motion.button>
          
          <AnimatePresence>
            {showShareOptions && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-10"
              >
                <div className="py-1" role="menu" aria-orientation="vertical">
                  {shareOptions.map((option, index) => (
                    <button
                      key={index}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      role="menuitem"
                      onClick={() => {
                        // Handle share action
                        toggleShareOptions();
                      }}
                    >
                      {option.name}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <motion.button 
          className={`flex items-center space-x-1 px-3 py-1 rounded-full ${
            bookmarked 
              ? 'text-indigo-600 dark:text-indigo-400' 
              : 'text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400'
          }`}
          onClick={handleBookmark}
          whileTap={{ scale: 0.9 }}
        >
          <FiBookmark className={`w-5 h-5 ${bookmarked ? 'fill-current' : ''}`} />
          <span>Save</span>
        </motion.button>
      </div>
      
      {/* Comments section */}
      <AnimatePresence>
        {showComments && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-gray-100 dark:border-gray-700 overflow-hidden"
          >
            {/* Comment form */}
            <form onSubmit={handleSubmitComment} className="p-4 flex items-start space-x-3">
              <Avatar 
                src="/assets/images/user-avatar.jpg"
                alt="Your profile"
                className="w-8 h-8 rounded-full border-2 border-indigo-100 dark:border-indigo-900"
              />
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Write a comment..."
                  className="w-full px-3 py-2 rounded-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  disabled={isSubmitting}
                />
                {isSubmitting && (
                  <div className="absolute right-3 top-2">
                    <svg className="animate-spin h-5 w-5 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </div>
                )}
              </div>
              <button
                type="submit"
                disabled={!newComment.trim() || isSubmitting}
                className={`px-4 py-2 rounded-full font-medium ${
                  !newComment.trim() || isSubmitting
                    ? 'bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400 cursor-not-allowed'
                    : 'bg-indigo-500 text-white hover:bg-indigo-600'
                }`}
              >
                Post
              </button>
            </form>
            
            {/* Comments list */}
            <div className="px-4 pb-4 space-y-3">
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <Comment key={comment.id} comment={comment} postAuthor={post.author} />
                ))
              ) : (
                <div className="text-center py-6 text-gray-500 dark:text-gray-400">
                  No comments yet. Be the first to comment!
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Post;