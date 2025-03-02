'use client';

import { createContext, useState, useContext, ReactNode, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';

// Define a type for any nested translations object
type TranslationValue = string | string[] | Record<string, any> | undefined;
type TranslationsObject = Record<string, TranslationValue>;

type Language = 'es' | 'en' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => any;
  isLoading: boolean;
}

// Cache for translations to avoid repeated imports
const translationsCache: Record<Language, TranslationsObject | null> = {
  es: null,
  en: null,
  fr: null
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('es');
  const [currentTranslations, setCurrentTranslations] = useState<TranslationsObject>({});
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Function to dynamically import translations
  const loadTranslations = useCallback(async (lang: Language) => {
    try {
      setIsLoading(true);
      
      // Use cached translations if available
      if (translationsCache[lang]) {
        setCurrentTranslations(translationsCache[lang]!);
        setIsLoading(false);
        return;
      }
      
      // Dynamic import for better code splitting
      let translations;
      switch (lang) {
        case 'es':
          translations = (await import('@/locales/es.json')).default;
          break;
        case 'en':
          translations = (await import('@/locales/en.json')).default;
          break;
        case 'fr':
          translations = (await import('@/locales/fr.json')).default;
          break;
        default:
          translations = (await import('@/locales/es.json')).default;
      }
      
      // Cache the translations
      translationsCache[lang] = translations;
      setCurrentTranslations(translations);
    } catch (error) {
      console.error(`Failed to load ${lang} translations:`, error);
      // Fallback to empty object to prevent crashes
      setCurrentTranslations({});
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // Get browser language (first two characters)
    const getBrowserLanguage = (): Language | null => {
      if (typeof window === 'undefined') return null;
      
      const browserLang = navigator.language.split('-')[0].toLowerCase();
      if (browserLang && ['es', 'en', 'fr'].includes(browserLang)) {
        return browserLang as Language;
      }
      return null;
    };
    
    // Priority: 1. Stored preference, 2. Browser language, 3. Spanish (default)
    const savedLanguage = localStorage.getItem('language') as Language;
    const browserLanguage = getBrowserLanguage();
    
    let detectedLanguage: Language = 'es'; // Default fallback
    
    if (savedLanguage && ['es', 'en', 'fr'].includes(savedLanguage)) {
      detectedLanguage = savedLanguage;
    } else if (browserLanguage) {
      detectedLanguage = browserLanguage;
    }
    
    setLanguage(detectedLanguage);
    loadTranslations(detectedLanguage);
  }, [loadTranslations]);

  // Handle language change
  useEffect(() => {
    if (document) {
      document.documentElement.lang = language;
      localStorage.setItem('language', language);
    }
  }, [language]);

  // Memoize the translation function for better performance
  const t = useCallback((key: string): any => {
    if (isLoading || !currentTranslations) return key;
    
    try {
      const keys = key.split('.');
      let value: any = currentTranslations;

      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = value[k];
        } else {
          // Only log in development
          if (process.env.NODE_ENV === 'development') {
            console.warn(`Translation missing for key: ${key}, language: ${language}`);
          }
          return key;
        }
      }
      
      return value;
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error(`Translation error for key ${key}:`, error);
      }
      return key;
    }
  }, [currentTranslations, isLoading, language]);

  // Handle language changes
  const handleSetLanguage = useCallback((lang: Language) => {
    setLanguage(lang);
    loadTranslations(lang);
  }, [loadTranslations]);

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    language,
    setLanguage: handleSetLanguage,
    t,
    isLoading
  }), [language, handleSetLanguage, t, isLoading]);

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}