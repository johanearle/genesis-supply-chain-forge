
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { supportedLanguages } from '@/i18n';
import { Languages, Check, Globe, AlertTriangle } from 'lucide-react';
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
  DialogFooter,
} from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  
  // Get proper group display names
  const getLanguageGroupName = (groupKey: string): string => {
    switch(groupKey) {
      case 'nguni': return 'Nguni Languages';
      case 'sotho': return 'Sotho Languages';
      case 'other': return 'Other Languages';
      default: return groupKey;
    }
  };
  
  // Calculate translation completeness (mock data for demonstration)
  const getTranslationCompleteness = (code: string) => {
    const completeness: {[key: string]: number} = {
      'en': 100,
      'zu': 95,
      'xh': 85,
      'af': 75,
      'nso': 70,
      'st': 65,
      'tn': 65,
      'ts': 60,
      'ss': 60,
      've': 55,
      'nr': 50
    };
    
    return completeness[code] || 50;
  };
  
  // Check if a translation file is available
  const isTranslationAvailable = (code: string): boolean => {
    // Based on console errors, only Zulu and English are available
    return ['en', 'zu'].includes(code);
  };
  
  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    const langName = supportedLanguages.find(lang => lang.code === language)?.name || language;
    
    // Show toast notification when language is changed
    toast(t('language.changed'), {
      description: t('language.changedDescription', { language: langName }),
      icon: <Check className="h-4 w-4" />
    });
    
    setSelectedLanguage(language);
    setIsDialogOpen(false);
  };

  // Get current language name
  const currentLanguageName = supportedLanguages.find(
    lang => lang.code === i18n.language
  )?.name || 'English';
  
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className={className}>
            <Languages className="h-5 w-5" />
            <span className="sr-only">{t('language.switch')}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-64">
          <DropdownMenuLabel className="flex justify-between items-center">
            <span>{t('language.current')}</span>
            <Badge variant="outline" className="ml-2 font-medium">
              {currentLanguageName}
            </Badge>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          {/* Main languages section */}
          <div className="p-2">
            <h4 className="mb-2 text-xs font-medium text-muted-foreground uppercase tracking-wide px-2">
              {t('language.availableLanguages', 'Available Languages')}
            </h4>
            <div className="space-y-1">
              {['en', 'zu'].map((code) => {
                const lang = supportedLanguages.find(l => l.code === code);
                if (!lang) return null;
                
                const completeness = getTranslationCompleteness(code);
                const isActive = i18n.language === code;
                
                return (
                  <DropdownMenuItem
                    key={code}
                    onClick={() => changeLanguage(code)}
                    className={isActive ? "font-medium bg-accent" : ""}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-2">
                        {isActive && <Check className="h-4 w-4" />}
                        <span>{lang.name}</span>
                      </div>
                      <Badge variant="secondary" className="ml-auto text-xs">
                        {completeness}%
                      </Badge>
                    </div>
                  </DropdownMenuItem>
                );
              })}
            </div>
          </div>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem onClick={() => setIsDialogOpen(true)} className="justify-center text-primary font-medium">
            {t('language.allLanguages', 'All Languages')}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              {t('language.selectLanguage')}
            </DialogTitle>
            <DialogDescription>
              {t('language.officialLanguages')}
            </DialogDescription>
          </DialogHeader>
          
          <Tabs defaultValue="grid" className="w-full">
            <TabsList className="w-full mb-4">
              <TabsTrigger value="grid">{t('common.grid')}</TabsTrigger>
              <TabsTrigger value="list">{t('common.list')}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="grid" className="max-h-[60vh] overflow-y-auto pr-1">
              <RadioGroup value={selectedLanguage} onValueChange={setSelectedLanguage} className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {supportedLanguages.map(language => {
                  const code = language.code;
                  const completeness = getTranslationCompleteness(code);
                  const isAvailable = isTranslationAvailable(code);
                  
                  return (
                    <div 
                      key={code} 
                      className={`border rounded-lg p-3 cursor-pointer transition-all hover:border-primary ${
                        selectedLanguage === code ? 'border-primary bg-primary/5' : ''
                      }`}
                      onClick={() => setSelectedLanguage(code)}
                    >
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value={code} id={`lang-${code}`} />
                        <Label htmlFor={`lang-${code}`} className="text-base font-medium">
                          {language.name}
                        </Label>
                        {!isAvailable && (
                          <Badge variant="outline" className="ml-auto border-amber-200">
                            <AlertTriangle className="h-3 w-3 mr-1 text-amber-500" />
                            {t('language.partial')}
                          </Badge>
                        )}
                      </div>
                      
                      <div className="mt-3 pl-6">
                        <div className="flex justify-between text-xs mb-1">
                          <span>{completeness}% {t('language.complete')}</span>
                        </div>
                        <Progress 
                          value={completeness} 
                          className="h-2"
                          color={!isAvailable ? 'bg-amber-500' : undefined}
                        />
                      </div>
                    </div>
                  );
                })}
              </RadioGroup>
            </TabsContent>
            
            <TabsContent value="list" className="max-h-[60vh] overflow-y-auto pr-1">
              {Object.keys(languageGroups).map(groupKey => (
                <div key={groupKey} className="mb-6">
                  <h3 className="text-sm font-medium mb-2 text-muted-foreground">
                    {getLanguageGroupName(groupKey)}
                  </h3>
                  <RadioGroup value={selectedLanguage} onValueChange={setSelectedLanguage} className="space-y-2">
                    {languageGroups[groupKey as keyof typeof languageGroups].map(code => {
                      const language = supportedLanguages.find(l => l.code === code);
                      if (!language) return null;
                      
                      const completeness = getTranslationCompleteness(code);
                      const isAvailable = isTranslationAvailable(code);
                      
                      return (
                        <div 
                          key={code}
                          className={`flex items-center p-2 border rounded-md cursor-pointer ${
                            selectedLanguage === code ? 'border-primary bg-primary/5' : ''
                          }`}
                          onClick={() => setSelectedLanguage(code)}
                        >
                          <RadioGroupItem 
                            value={code} 
                            id={`list-${code}`} 
                          />
                          <div className="ml-3 flex-1">
                            <div className="flex items-center justify-between">
                              <Label htmlFor={`list-${code}`} className="font-medium">
                                {language.name}
                              </Label>
                              {!isAvailable && (
                                <Badge variant="outline" className="ml-2 text-amber-500 border-amber-200">
                                  <AlertTriangle className="h-3 w-3 mr-1" />
                                  {t('language.partialTranslation')}
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center mt-2">
                              <Progress 
                                value={completeness} 
                                className="h-1.5 flex-1" 
                                color={!isAvailable ? 'bg-amber-500' : undefined}
                              />
                              <span className="ml-2 text-xs font-medium">
                                {completeness}%
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </RadioGroup>
                </div>
              ))}
            </TabsContent>
          </Tabs>

          <DialogFooter className="flex flex-row justify-between items-center sm:justify-between">
            <Button 
              variant="ghost"
              size="sm"
              onClick={() => setIsDialogOpen(false)}
              className="mt-0"
            >
              {t('common.cancel')}
            </Button>
            
            <Button 
              onClick={() => changeLanguage(selectedLanguage)}
              disabled={!isTranslationAvailable(selectedLanguage)}
              className="mt-0"
            >
              {t('language.changeLanguage')}
              {!isTranslationAvailable(selectedLanguage) && ` (${t('language.unavailable', 'Unavailable')})`}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LanguageSwitcher;
