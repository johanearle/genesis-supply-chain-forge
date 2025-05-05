
import React from 'react';
import { useTranslation } from 'react-i18next';
import { supportedLanguages } from '@/i18n';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Languages } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { toast } from 'sonner';

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
            <CardTitle>Localization Settings</CardTitle>
          </div>
          <CardDescription>
            Configure language preferences and view translation quality metrics
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label className="text-base">Interface Language</Label>
            <p className="text-sm text-muted-foreground mb-4">
              Select from South Africa's 11 official languages
            </p>
            
            <RadioGroup 
              defaultValue={i18n.language} 
              onValueChange={handleLanguageChange}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2"
            >
              {supportedLanguages.map(language => (
                <div key={language.code} className="flex items-center space-x-2">
                  <RadioGroupItem value={language.code} id={`lang-${language.code}`} />
                  <Label htmlFor={`lang-${language.code}`} className="cursor-pointer">
                    {language.name}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          
          <div className="pt-4 border-t">
            <h3 className="font-medium mb-4">Translation Quality Metrics</h3>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <Label>BLEU Score</Label>
                  <span className="text-sm font-medium">{translationMetrics.bleuScore}%</span>
                </div>
                <Progress value={translationMetrics.bleuScore} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">
                  Machine translation quality score (target: 98%)
                </p>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <Label>Linguistic Accuracy</Label>
                  <span className="text-sm font-medium">{translationMetrics.linguisticAccuracy}%</span>
                </div>
                <Progress value={translationMetrics.linguisticAccuracy} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">
                  Validated by SA Language Board on {translationMetrics.lastValidated}
                </p>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <Label>Cultural Sensitivity Score</Label>
                  <span className="text-sm font-medium">{translationMetrics.culturalSensitivityScore}/100</span>
                </div>
                <Progress value={translationMetrics.culturalSensitivityScore} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">
                  Cultural adaptation score (threshold: 90/100)
                </p>
              </div>
            </div>
          </div>
          
          <Alert className="mt-4">
            <AlertTitle>Regional Customization</AlertTitle>
            <AlertDescription>
              All UI elements, imagery, and content are evaluated against South African cultural guidelines.
              Quarterly reviews by regional cultural advisors ensure ongoing cultural relevance and sensitivity.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
};

export default LocalizationSettings;
