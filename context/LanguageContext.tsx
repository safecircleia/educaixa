'use client';

import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import esTranslations from '@/locales/es.json';
import enTranslations from '@/locales/en.json';
import frTranslations from '@/locales/fr.json';

type Language = 'es' | 'en' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => any;
}

const translations = {
  es: esTranslations,
  en: enTranslations,
  fr: frTranslations,
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('es');
  const [currentTranslations, setCurrentTranslations] = useState(translations.es);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && ['es', 'en', 'fr'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
      setCurrentTranslations(translations[savedLanguage]);
    }
  }, []);

  useEffect(() => {
    setCurrentTranslations(translations[language]);
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): any => {
    try {
      const keys = key.split('.');
      let value = currentTranslations;

      for (const k of keys) {
        if (value?.[k] === undefined) {
          console.warn(`Translation missing for key: ${key}, language: ${language}`);
          return key;
        }
        value = value[k];
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