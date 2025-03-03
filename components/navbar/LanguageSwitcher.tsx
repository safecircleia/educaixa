'use client';

import { useCallback, useMemo } from 'react';
import { ChevronDown, Check, Globe } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';

export function LanguageSwitcher() {
  const { language, setLanguage, t, isLoading } = useLanguage();

  // Available languages with their codes and display names - memoized to prevent unnecessary re-renders
  const languages = useMemo(() => [
    { code: 'es', name: 'Español' },
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'Français' }
  ], []);

  // Get current language display name - memoized
  const currentLanguage = useMemo(() => 
    languages.find(lang => lang.code === language), 
    [language, languages]
  );

  // Memoize the language change handler
  const handleLanguageChange = useCallback((langCode: 'es' | 'en' | 'fr') => {
    setLanguage(langCode);
  }, [setLanguage]);

  // Render a simplified button during loading
  if (isLoading) {
    return (
      <Button 
        variant="ghost" 
        size="sm" 
        disabled
        className="h-8 gap-1.5 px-2.5 text-black dark:text-black rounded-lg opacity-70"
        aria-label="Loading languages"
      >
        <Globe className="w-3.5 h-3.5 opacity-80 mr-1" />
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 gap-1.5 px-2.5 text-black dark:text-black hover:text-slate-900 dark:hover:text-black hover:bg-slate-100/80 dark:hover:bg-white/5
            data-[state=open]:bg-slate-100 dark:data-[state=open]:bg-white/10 data-[state=open]:text-slate-900 dark:data-[state=open]:text-black transition-colors rounded-lg"
          aria-label={t('navbar.language')}
        >
          <Globe className="w-3.5 h-3.5 opacity-80 mr-1" />
          <span className="text-sm font-medium">{currentLanguage?.code.toUpperCase()}</span>
          <ChevronDown className="h-3.5 w-3.5 opacity-70 transition-transform duration-200" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-44 bg-white dark:bg-background/95 backdrop-blur-md border border-slate-200 dark:border-white/10 p-1.5 rounded-xl shadow-lg"
        sideOffset={8}
      >
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            className={`flex items-center justify-between px-3 py-2 text-sm text-black dark:text-black hover:text-slate-900 dark:hover:text-black
              cursor-pointer rounded-lg transition-colors
              ${language === lang.code 
                ? 'bg-slate-100 dark:bg-white/10 text-black dark:text-black' 
                : 'hover:bg-slate-50 dark:hover:bg-white/5'}`}
            onClick={() => handleLanguageChange(lang.code as 'es' | 'en' | 'fr')}
          >
            <span className="font-medium">{lang.name}</span>
            {language === lang.code && (
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                  type: "spring", 
                  duration: 0.2,
                  layout: false,
                }}
              >
                <Check className="h-4 w-4 text-cyan-600 dark:text-blue-400" />
              </motion.div>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}