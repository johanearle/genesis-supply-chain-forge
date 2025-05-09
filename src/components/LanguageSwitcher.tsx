
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { supportedLanguages } from '@/i18n';
import { Languages } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

export interface LanguageSwitcherProps {
  className?: string;
}

const LanguageSwitcher = ({ className }: LanguageSwitcherProps) => {
  const { i18n, t } = useTranslation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);
  
  // Group languages by region for better organization
  const languageGroups = {
    nguni: ['zu', 'xh', 'nr', 'ss'],
    sotho: ['nso', 'st', 'tn'],
    other: ['af', 'ts', 've', 'en']
  };
  
  const getLanguageGroup = (code: string) => {
    if (languageGroups.nguni.includes(code)) return 'Nguni';
    if (languageGroups.sotho.includes(code)) return 'Sotho';
    return 'Other';
  };
  
  // Calculate translation completeness (mock data for demonstration)
  const getTranslationCompleteness = (code: string) => {
    const completeness: {[key: string]: number} = {
      'en': 100,
      'zu': 98,
      'xh': 96,
      'af': 95,
      'nso': 87,
      'st': 85,
      'tn': 84,
      'ts': 80,
      'ss': 76,
      've': 75,
      'nr': 72
    };
    
    return completeness[code] || 70;
  };
  
  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    
    // Show toast notification when language is changed
    toast(t('language.changed'), {
      description: t('language.changedDescription', { 
        language: supportedLanguages.find(lang => lang.code === language)?.name 
      }),
    });
    
    setSelectedLanguage(language);
    setIsDialogOpen(false);
  };

  // Get current language name
  const currentLanguageName = supportedLanguages.find(
    lang => lang.code === i18n.language
  )?.name || 'English';
  
  // Quick-access common languages
  const quickAccessLanguages = ['en', 'zu', 'xh', 'af'];

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className={className}>
            <Languages className="h-5 w-5" />
            <span className="sr-only">{t('language.switch')}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="flex justify-between items-center">
            <span>{t('language.current')}</span>
            <Badge variant="outline">{currentLanguageName}</Badge>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          {quickAccessLanguages.map((code) => {
            const lang = supportedLanguages.find(l => l.code === code);
            if (!lang) return null;
            
            return (
              <DropdownMenuItem
                key={code}
                onClick={() => changeLanguage(code)}
                className={i18n.language === code ? "font-bold bg-accent" : ""}
              >
                <span className="flex-1">{lang.name}</span>
                <span className="text-xs text-muted-foreground ml-2">
                  {getTranslationCompleteness(code)}%
                </span>
              </DropdownMenuItem>
            );
          })}
          
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
            {t('language.moreLanguages')}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{t('language.selectLanguage')}</DialogTitle>
            <DialogDescription>
              {t('language.officialLanguages')}
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <RadioGroup 
              value={selectedLanguage} 
              onValueChange={setSelectedLanguage}
              className="space-y-6"
            >
              {Object.entries(languageGroups).map(([group, codes]) => (
                <div key={group} className="space-y-3">
                  <h4 className="text-sm font-semibold text-muted-foreground uppercase">
                    {getLanguageGroup(codes[0])}
                  </h4>
                  <div className="grid grid-cols-1 gap-3">
                    {codes.map(code => {
                      const lang = supportedLanguages.find(l => l.code === code);
                      if (!lang) return null;
                      
                      const completeness = getTranslationCompleteness(code);
                      
                      return (
                        <div key={code} className="flex items-center space-x-2 border rounded-md p-3">
                          <RadioGroupItem value={code} id={`lang-${code}`} />
                          <div className="flex-1">
                            <Label htmlFor={`lang-${code}`} className="font-medium">
                              {lang.name}
                            </Label>
                            <div className="mt-1">
                              <Progress value={completeness} className="h-1" />
                              <p className="text-xs text-muted-foreground mt-1">
                                {t('language.translationComplete', { percentage: completeness })}
                              </p>
                            </div>
                          </div>
                          {code === 'en' && (
                            <Badge className="ml-auto">Default</Badge>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>
          
          <DialogFooter>
            <Button 
              variant="secondary" 
              onClick={() => setIsDialogOpen(false)}
            >
              {t('common.cancel')}
            </Button>
            <Button 
              onClick={() => changeLanguage(selectedLanguage)}
            >
              {t('language.changeLanguage')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LanguageSwitcher;
