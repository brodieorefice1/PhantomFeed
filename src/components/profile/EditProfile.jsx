import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiCamera, FiUpload } from 'react-icons/fi';
import Button from '../common/Button';
import Avatar from '../common/Avatar';

const EditProfile = ({ profile, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    fullName: profile.fullName || '',
    username: profile.username || '',
    bio: profile.bio || '',
    avatar: profile.avatar || '',
    coverImage: profile.coverImage || ''
  });
  
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const profilePicRef = useRef();
  const coverPicRef = useRef();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field if user is typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Name is required";
    }
    
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = "Username can only contain letters, numbers, and underscores";
    }
    
    if (formData.bio.length > 160) {
      newErrors.bio = "Bio must be 160 characters or less";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    // Simulate API request
    setTimeout(() => {
      // Update profile with form data
      const updatedProfile = {
        ...profile,
        ...formData
      };
      
      onSave(updatedProfile);
      setLoading(false);
    }, 1000);
  };
  
  const triggerFileInput = (ref) => {
    if (ref.current) {
      ref.current.click();
    }
  };
  
  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // In a real app, you would upload the file to a server here
    // For this demo, we'll just use a fake URL
    const fakeUrl = URL.createObjectURL(file);
    setFormData(prev => ({ ...prev, [field]: fakeUrl }));
  };
  
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full mx-4 my-8"
        >
          <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Edit Profile</h2>
            <button
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              onClick={onClose}
            >
              <FiX className="w-6 h-6" />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6">
            {/* Cover Image */}
            <div className="mb-6">
              <div 
                className="h-32 sm:h-48 rounded-lg bg-gray-200 dark:bg-gray-700 overflow-hidden relative"
                style={{
                  backgroundImage: formData.coverImage ? `url(${formData.coverImage})` : '',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-70 transition"
                    onClick={() => triggerFileInput(coverPicRef)}
                  >
                    <FiCamera className="w-5 h-5 mr-2" />
                    <span>Change Cover</span>
                  </button>
                </div>
                <input
                  type="file"
                  ref={coverPicRef}
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, 'coverImage')}
                />
              </div>
            </div>
            
            {/* Profile Picture */}
            <div className="mb-6 flex justify-center -mt-12">
              <div className="relative">
                <Avatar
                  src={formData.avatar}
                  alt={formData.username}
                  className="w-24 h-24 border-4 border-white dark:border-gray-800 rounded-full"
                  fallbackText={formData.fullName?.charAt(0) || ''}
                />
                <button
                  type="button"
                  className="absolute bottom-0 right-0 bg-indigo-600 rounded-full p-2 text-white shadow-md hover:bg-indigo-700"
                  onClick={() => triggerFileInput(profilePicRef)}
                >
                  <FiUpload className="w-4 h-4" />
                </button>
                <input
                  type="file"
                  ref={profilePicRef}
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, 'avatar')}
                />
              </div>
            </div>
            
            {/* Form Fields */}
            <div className="space-y-4">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                    errors.fullName
                      ? 'border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20'
                      : 'border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white'
                  }`}
                />
                {errors.fullName && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.fullName}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Username
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 sm:text-sm">
                    @
                  </span>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className={`block w-full rounded-none rounded-r-md sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                      errors.username
                        ? 'border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20'
                        : 'border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white'
                    }`}
                  />
                </div>
                {errors.username && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.username}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Bio
                </label>
                <div className="mt-1">
                  <textarea
                    id="bio"
                    name="bio"
                    rows={3}
                    value={formData.bio}
                    onChange={handleChange}
                    className={`block w-full rounded-md shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 ${
                      errors.bio
                        ? 'border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20'
                        : 'border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white'
                    }`}
                    placeholder="Tell us about yourself"
                  />
                </div>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {formData.bio.length}/160 characters
                </p>
                {errors.bio && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.bio}</p>
                )}
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <Button
                type="button"
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white dark:bg-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-gray-600"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow-sm"
                isLoading={loading}
                loadingText="Saving..."
              >
                Save Changes
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default EditProfile;