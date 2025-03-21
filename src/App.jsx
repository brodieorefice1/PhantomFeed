import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

// Pages
import LandingPage from './pages/LandingPage';
import FeedPage from './pages/FeedPage';
import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';

// Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import AuthModal from './components/auth/AuthModal';

function App() {
  const [authModalOpen, setAuthModalOpen] = React.useState(false);
  const [authType, setAuthType] = React.useState('login'); // 'login' or 'signup'
  
  const openAuthModal = (type) => {
    setAuthType(type);
    setAuthModalOpen(true);
  };
  
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <div className="min-h-screen flex flex-col bg-slate-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
            <Header openAuthModal={openAuthModal} />
            
            <main className="flex-grow">
              <AnimatePresence mode="wait">
                <Routes>
                  <Route 
                    path="/" 
                    element={
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <LandingPage openAuthModal={openAuthModal} />
                      </motion.div>
                    } 
                  />
                  <Route 
                    path="/feed" 
                    element={
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                      >
                        <FeedPage />
                      </motion.div>
                    } 
                  />
                  <Route 
                    path="/profile/:username" 
                    element={
                      <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ProfilePage />
                      </motion.div>
                    } 
                  />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </AnimatePresence>
            </main>
            
            <Footer />
            
            <AnimatePresence>
              {authModalOpen && (
                <AuthModal 
                  isOpen={authModalOpen}
                  onClose={() => setAuthModalOpen(false)}
                  authType={authType}
                  setAuthType={setAuthType}
                />
              )}
            </AnimatePresence>
          </div>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;