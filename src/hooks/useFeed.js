import { useState, useEffect, useCallback } from 'react';
import mockPosts from '../data/mockPosts';

// Simulate fetching posts from an API
const fetchPosts = (page = 1, limit = 5) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Get a slice of mock posts based on page and limit
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedPosts = mockPosts.slice(startIndex, endIndex);
      
      // Add some randomness to the posts to simulate AI-generated content
      const processedPosts = paginatedPosts.map(post => {
        // Randomly modify the like count to simulate activity
        const likesVariation = Math.floor(Math.random() * 5) - 2; // -2 to +2
        const newLikes = Math.max(0, post.likes + likesVariation);
        
        return {
          ...post,
          likes: newLikes,
          // Add a timestamp that's recent (within the last 24 hours)
          timestamp: new Date(Date.now() - Math.floor(Math.random() * 86400000)).toISOString()
        };
      });
      
      resolve({
        posts: processedPosts,
        hasMore: endIndex < mockPosts.length
      });
    }, 1000); // Simulate network request
  });
};

const useFeed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  
  const loadPosts = useCallback(async (pageNum = 1) => {
    if (pageNum === 1) {
      setPosts([]);
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const { posts: newPosts, hasMore: moreAvailable } = await fetchPosts(pageNum);
      
      setPosts(prevPosts => pageNum === 1 ? newPosts : [...prevPosts, ...newPosts]);
      setHasMore(moreAvailable);
      setPage(pageNum);
    } catch (err) {
      setError('Failed to load posts. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, []);
  
  // Load initial posts on mount
  useEffect(() => {
    loadPosts(1);
  }, [loadPosts]);
  
  const loadMorePosts = useCallback(() => {
    if (!loading && hasMore) {
      loadPosts(page + 1);
    }
  }, [loading, hasMore, page, loadPosts]);
  
  const refreshFeed = useCallback(() => {
    loadPosts(1);
  }, [loadPosts]);
  
  return {
    posts,
    loading,
    error,
    hasMore,
    loadMorePosts,
    refreshFeed
  };
};

export default useFeed;