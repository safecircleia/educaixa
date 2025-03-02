'use client';

import { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';
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
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  // Available languages with their full names and codes
  const languages = [
    { code: 'es', name: t('languages.es'), fullName: 'Español' },
    { code: 'en', name: t('languages.en'), fullName: 'English' },
    { code: 'fr', name: t('languages.fr'), fullName: 'Français' }
  ];

  // Get current language display name
  const currentLanguage = languages.find(lang => lang.code === language);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 gap-1.5 px-2 text-white/80 hover:text-white hover:bg-white/5
            data-[state=open]:bg-white/10 data-[state=open]:text-white transition-colors rounded-lg"
          aria-label={t('navbar.language')}
        >
          <span className="text-sm font-medium">{currentLanguage?.code.toUpperCase()}</span>
          <ChevronDown className="h-3.5 w-3.5 opacity-70" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-44 bg-background/95 backdrop-blur-md border border-white/10 p-1"
      >
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            className={`flex items-center justify-between px-2 py-1.5 text-sm text-white/90 hover:text-white
              cursor-pointer rounded-md transition-colors
              ${language === lang.code ? 'bg-white/5' : 'hover:bg-white/5'}`}
            onClick={() => {
              setLanguage(lang.code as 'es' | 'en' | 'fr');
              setIsOpen(false);
            }}
          >
            <div className="flex flex-col">
              <span className="font-medium">{lang.name}</span>
              <span className="text-xs text-white/60">{lang.fullName}</span>
            </div>
            {language === lang.code && (
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", duration: 0.2 }}
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