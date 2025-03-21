import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ 
  children, 
  className = '', 
  type = 'button',
  onClick,
  disabled = false,
  isLoading = false,
  loadingText = 'Loading...',
  ...props 
}) => {
  return (
    <motion.button
      type={type}
      className={`relative inline-flex items-center justify-center rounded-md border border-transparent font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors ${className}`}
      onClick={onClick}
      disabled={disabled || isLoading}
      whileTap={{ scale: 0.98 }}
      whileHover={!disabled && !isLoading ? { scale: 1.02 } : {}}
      {...props}
    >
      {isLoading && (
        <span className="absolute left-4">
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </span>
      )}
      {isLoading ? loadingText : children}
    </motion.button>
  );
};

export default Button;