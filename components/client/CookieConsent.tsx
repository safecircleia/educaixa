'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false
  });

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShowConsent(true);
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('cookie-consent', JSON.stringify(preferences));
    setShowConsent(false);
  };

  return (
    <AnimatePresence>
      {showConsent && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 inset-x-0 z-50 p-4"
        >
          <div className="max-w-4xl mx-auto bg-black/80 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1">
                <h4 className="text-lg font-semibold mb-2">Cookie Preferences</h4>
                <p className="text-sm text-white/60">
                  We use cookies to enhance your browsing experience and analyze our traffic.
                </p>
              </div>
              <div className="flex items-center gap-4">
                {Object.entries(preferences).map(([key, value]) => (
                  <label key={key} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={value}
                      disabled={key === 'necessary'}
                      onChange={(e) => setPreferences(prev => ({
                        ...prev,
                        [key]: e.target.checked
                      }))}
                      className="rounded border-white/20 bg-white/5"
                    />
                    <span className="text-sm capitalize">{key}</span>
                  </label>
                ))}
                <motion.button
                  onClick={handleSave}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 rounded-lg bg-[#4dc8ff] text-black font-medium"
                >
                  Save Preferences
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
