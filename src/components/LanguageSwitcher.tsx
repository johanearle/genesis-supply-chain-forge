
import React from 'react';
import { useTranslation } from 'react-i18next';
import { supportedLanguages } from '@/i18n';
import { Languages } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export interface LanguageSwitcherProps {
  className?: string;
}

const LanguageSwitcher = ({ className }: LanguageSwitcherProps) => {
  const { i18n, t } = useTranslation();
  
  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    
    // Show toast notification when language is changed
    toast(t('language.changed'), {
      description: t('language.changedDescription', { language: supportedLanguages.find(lang => lang.code === language)?.name }),
    });
  };

  // Get current language name
  const currentLanguageName = supportedLanguages.find(
    lang => lang.code === i18n.language
  )?.name || 'English';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className={className}>
          <Languages className="h-5 w-5" />
          <span className="sr-only">{t('language.switch')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {supportedLanguages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => changeLanguage(language.code)}
            className={i18n.language === language.code ? "font-bold" : ""}
          >
            {language.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
