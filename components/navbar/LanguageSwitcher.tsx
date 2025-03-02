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
        className="h-8 gap-1.5 px-2.5 text-white/60 rounded-lg opacity-70"
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
          className="h-8 gap-1.5 px-2.5 text-white/80 hover:text-white hover:bg-white/5
            data-[state=open]:bg-white/10 data-[state=open]:text-white transition-colors rounded-lg"
          aria-label={t('navbar.language')}
        >
          <Globe className="w-3.5 h-3.5 opacity-80 mr-1" />
          <span className="text-sm font-medium">{currentLanguage?.code.toUpperCase()}</span>
          <ChevronDown className="h-3.5 w-3.5 opacity-70 transition-transform duration-200" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-44 bg-background/95 backdrop-blur-md border border-white/10 p-1.5 rounded-xl"
        sideOffset={8}
      >
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            className={`flex items-center justify-between px-3 py-2 text-sm text-white/90 hover:text-white
              cursor-pointer rounded-lg transition-colors
              ${language === lang.code ? 'bg-white/10' : 'hover:bg-white/5'}`}
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
                  // Make animation more efficient
                  layout: false,
                }}
              >
                <Check className="h-4 w-4 text-blue-400" />
              </motion.div>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}