import React, { useState } from 'react';

const Avatar = ({ 
  src, 
  alt, 
  className = '', 
  size = 'md',
  status = null, // 'online', 'offline', 'away', etc.
  showStatusIndicator = false,
  statusClassName = '',
  fallbackText = '',
  ...props 
}) => {
  const [imgError, setImgError] = useState(false);
  
  // Get initials from alt text for fallback
  const getInitials = () => {
    if (!alt || typeof alt !== 'string') return '';
    
    if (fallbackText) return fallbackText;
    
    return alt
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };
  
  // Determine size classes
  const sizeClasses = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-xl',
  }[size] || 'w-10 h-10 text-base';
  
  // Determine status indicator classes
  const statusClasses = {
    online: 'bg-green-500',
    offline: 'bg-gray-400',
    away: 'bg-yellow-500',
    busy: 'bg-red-500',
    default: 'bg-gray-400'
  };
  
  const statusColor = statusClasses[status] || statusClasses.default;
  
  return (
    <div className={`relative flex-shrink-0 ${className}`} {...props}>
      {!imgError && src ? (
        <img
          src={src}
          alt={alt}
          className={`${sizeClasses} object-cover rounded-full`}
          onError={() => setImgError(true)}
        />
      ) : (
        <div className={`${sizeClasses} flex items-center justify-center text-white bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full`}>
          {getInitials()}
        </div>
      )}
      
      {showStatusIndicator && status && (
        <span 
          className={`absolute bottom-0 right-0 block rounded-full ring-2 ring-white dark:ring-gray-800 ${statusColor} ${statusClassName}`}
          style={{ width: '25%', height: '25%', minWidth: '8px', minHeight: '8px' }}
        />
      )}
    </div>
  );
};

export default Avatar;