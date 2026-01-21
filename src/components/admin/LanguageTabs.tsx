import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Check, AlertCircle } from 'lucide-react';

export type Language = 'pl' | 'en' | 'cs';

interface LanguageTabsProps {
  activeLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  hasContent: Record<Language, boolean>;
  isPublished?: Record<Language, boolean>;
}

const LANGUAGE_CONFIG: Record<Language, { label: string; flag: string }> = {
  pl: { label: 'Polski', flag: '🇵🇱' },
  en: { label: 'English', flag: '🇬🇧' },
  cs: { label: 'Čeština', flag: '🇨🇿' },
};

export function LanguageTabs({
  activeLanguage,
  onLanguageChange,
  hasContent,
  isPublished = { pl: false, en: false, cs: false },
}: LanguageTabsProps) {
  return (
    <Tabs value={activeLanguage} onValueChange={(v) => onLanguageChange(v as Language)}>
      <TabsList className="grid w-full grid-cols-3">
        {(Object.keys(LANGUAGE_CONFIG) as Language[]).map((lang) => (
          <TabsTrigger
            key={lang}
            value={lang}
            className="flex items-center gap-2 relative"
          >
            <span className="text-lg">{LANGUAGE_CONFIG[lang].flag}</span>
            <span>{LANGUAGE_CONFIG[lang].label}</span>
            {hasContent[lang] && (
              <Badge
                variant={isPublished[lang] ? 'default' : 'secondary'}
                className="ml-1 h-5 px-1.5 text-xs"
              >
                {isPublished[lang] ? (
                  <Check className="h-3 w-3" />
                ) : (
                  <AlertCircle className="h-3 w-3" />
                )}
              </Badge>
            )}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}

export { LANGUAGE_CONFIG };
