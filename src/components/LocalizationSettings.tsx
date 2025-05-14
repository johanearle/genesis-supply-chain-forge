
import React from 'react';
import { useTranslation } from 'react-i18next';
import { supportedLanguages, CULTURAL_SENSITIVITY_THRESHOLD } from '@/i18n';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Languages, Globe, Check, AlertTriangle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const LocalizationSettings = () => {
  const { t, i18n } = useTranslation();
  
  // Mock data for translation quality metrics
  const translationMetrics = {
    bleuScore: 98,
    linguisticAccuracy: 98,
    culturalSensitivityScore: 94,
    lastValidated: '2025-04-15',
    validatedBy: 'SA Language Board'
  };

  // Group languages by region for better organization
  const languageGroups = {
    nguni: ['zu', 'xh', 'nr', 'ss'],
    sotho: ['nso', 'st', 'tn'],
    other: ['af', 'ts', 've', 'en']
  };
  
  // Calculate translation completeness (mock data)
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
  
  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
    toast(t('language.changed'), {
      description: t('language.changedDescription', { 
        language: supportedLanguages.find(lang => lang.code === language)?.name 
      }),
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Languages className="h-5 w-5 text-primary" />
            <CardTitle>{t('settings.languageSettings', 'Language Settings')}</CardTitle>
          </div>
          <CardDescription>
            {t('language.chooseYourPreferredLanguage', 'Choose your preferred language from South Africa\'s official languages')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs defaultValue="grid" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="grid">{t('common.grid')}</TabsTrigger>
              <TabsTrigger value="list">{t('common.list')}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="grid">
              <RadioGroup 
                defaultValue={i18n.language} 
                onValueChange={handleLanguageChange}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {supportedLanguages.map(language => {
                  const completeness = getTranslationCompleteness(language.code);
                  const isCurrentLanguage = i18n.language === language.code;
                  
                  return (
                    <div 
                      key={language.code} 
                      className={`flex flex-col p-4 border rounded-lg ${isCurrentLanguage ? 'border-primary bg-primary/5' : ''}`}
                    >
                      <div className="flex items-start">
                        <RadioGroupItem value={language.code} id={`grid-lang-${language.code}`} className="mt-1" />
                        <div className="ml-3 flex-1">
                          <div className="flex items-center justify-between">
                            <Label htmlFor={`grid-lang-${language.code}`} className="font-medium text-base">
                              {language.name}
                            </Label>
                            {isCurrentLanguage && (
                              <Badge variant="outline" className="ml-2">
                                <Check className="h-3 w-3 mr-1" />
                                {t('language.current', 'Current')}
                              </Badge>
                            )}
                          </div>
                          
                          <div className="mt-2">
                            <div className="flex justify-between text-xs mb-1">
                              <span>{t('language.available', 'Available')}</span>
                              <span className={completeness < 80 ? 'text-amber-500' : 'text-green-500'}>
                                {completeness}%
                              </span>
                            </div>
                            <Progress 
                              value={completeness} 
                              className="h-2"
                              color={completeness < 80 ? 'bg-amber-500' : undefined}
                            />
                          </div>
                          
                          {language.code === 'en' && (
                            <p className="text-xs text-muted-foreground mt-2">
                              {t('language.defaultLanguage', 'Default language')}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </RadioGroup>
            </TabsContent>
            
            <TabsContent value="list">
              <div className="space-y-6">
                {Object.entries(languageGroups).map(([groupKey, codes]) => (
                  <div key={groupKey} className="space-y-3">
                    <h4 className="text-sm font-semibold text-muted-foreground uppercase pl-2">
                      {groupKey === 'nguni' ? 'Nguni Languages' : 
                       groupKey === 'sotho' ? 'Sotho Languages' : 'Other Languages'}
                    </h4>
                    <RadioGroup defaultValue={i18n.language} onValueChange={handleLanguageChange} className="space-y-2">
                      {codes.map(code => {
                        const language = supportedLanguages.find(lang => lang.code === code);
                        if (!language) return null;
                        
                        const completeness = getTranslationCompleteness(code);
                        const isCurrentLanguage = i18n.language === code;
                        
                        return (
                          <div 
                            key={code} 
                            className={`flex items-center p-3 border rounded-md ${isCurrentLanguage ? 'border-primary bg-primary/5' : ''}`}
                          >
                            <RadioGroupItem 
                              value={code} 
                              id={`list-lang-${code}`} 
                            />
                            <div className="ml-3 flex-1">
                              <div className="flex items-center justify-between">
                                <Label htmlFor={`list-lang-${code}`} className="font-medium">
                                  {language.name}
                                </Label>
                                {completeness < 80 && (
                                  <Badge variant="outline" className="ml-2 text-amber-500 border-amber-200">
                                    <AlertTriangle className="h-3 w-3 mr-1" />
                                    {t('language.partialSupport', 'Partial Support')}
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center mt-1">
                                <Progress 
                                  value={completeness} 
                                  className="h-2 flex-1"
                                  color={completeness < 80 ? 'bg-amber-500' : undefined}
                                />
                                <span className="ml-2 text-xs">
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
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="pt-4 border-t">
            <h3 className="font-medium mb-4">{t('settings.translationQuality', 'Translation Quality')}</h3>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <Label>{t('language.machineTranslationScore', 'Machine Translation Score')}</Label>
                  <span className="text-sm font-medium">{translationMetrics.bleuScore}%</span>
                </div>
                <Progress value={translationMetrics.bleuScore} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">
                  {t('language.aiTranslationQuality', 'AI-powered translation quality')} (target: 98%)
                </p>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <Label>{t('language.humanVerifiedAccuracy', 'Human-verified Accuracy')}</Label>
                  <span className="text-sm font-medium">{translationMetrics.linguisticAccuracy}%</span>
                </div>
                <Progress value={translationMetrics.linguisticAccuracy} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">
                  {t('language.verifiedBy', 'Verified by')} {translationMetrics.validatedBy} on {translationMetrics.lastValidated}
                </p>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <Label>{t('language.culturalSensitivity', 'Cultural Sensitivity')}</Label>
                  <span className="text-sm font-medium">{translationMetrics.culturalSensitivityScore}/100</span>
                </div>
                <Progress 
                  value={translationMetrics.culturalSensitivityScore} 
                  className="h-2"
                  color={translationMetrics.culturalSensitivityScore < CULTURAL_SENSITIVITY_THRESHOLD ? 'bg-amber-500' : undefined}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {t('language.culturalAppropriateness', 'Cultural appropriateness score')} (threshold: {CULTURAL_SENSITIVITY_THRESHOLD}/100)
                </p>
              </div>
            </div>
          </div>
          
          <Alert className="mt-4">
            <Globe className="h-4 w-4" />
            <AlertTitle>{t('settings.regionalSettings', 'Regional Settings')}</AlertTitle>
            <AlertDescription>
              {t('language.regionalDescription', 'Your content and interface will be adapted to reflect local customs, currencies, and formats.')}
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
};

export default LocalizationSettings;
