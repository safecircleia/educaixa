'use client';

import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import esTranslations from '@/locales/es.json';
import enTranslations from '@/locales/en.json';
import frTranslations from '@/locales/fr.json';

// Define a type for any nested translations object
type TranslationValue = string | string[] | Record<string, any> | undefined;
type TranslationsObject = Record<string, TranslationValue>;

type Language = 'es' | 'en' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => any;
  // You could add options parameter if needed in the future:
  // t: (key: string, options?: { returnObjects?: boolean }) => any;
}

const translations = {
  es: esTranslations,
  en: enTranslations,
  fr: frTranslations,
} as const;

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('es');
  const [currentTranslations, setCurrentTranslations] = useState<TranslationsObject>(translations.es);

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
    
    // Priority: 1. Browser language, 2. Stored preference, 3. Spanish (default)
    const browserLanguage = getBrowserLanguage();
    const savedLanguage = localStorage.getItem('language') as Language;
    
    let detectedLanguage: Language = 'es'; // Default fallback
    
    if (browserLanguage) {
      detectedLanguage = browserLanguage;
    } else if (savedLanguage && ['es', 'en', 'fr'].includes(savedLanguage)) {
      detectedLanguage = savedLanguage;
    }
    
    setLanguage(detectedLanguage);
    setCurrentTranslations(translations[detectedLanguage] as TranslationsObject);
  }, []);

  useEffect(() => {
    setCurrentTranslations(translations[language] as TranslationsObject);
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): any => {
    try {
      const keys = key.split('.');
      let value: any = currentTranslations;

      for (const k of keys) {
        // Type assertion to fix the TypeScript error
        if (value && typeof value === 'object' && k in value) {
          value = value[k as keyof typeof value];
        } else {
          console.warn(`Translation missing for key: ${key}, language: ${language}`);
          return key;
        }
      }
      
      return value;
    } catch (error) {
      console.error(`Translation error for key ${key}:`, error);
      return key;
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
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