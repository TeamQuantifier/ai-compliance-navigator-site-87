import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useCookieConsent } from '@/contexts/CookieConsentContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { ConsentCategories, getConsent, DEFAULT_CATEGORIES } from '@/lib/consent';
import { Lock } from 'lucide-react';

interface CategoryToggleProps {
  id: keyof ConsentCategories;
  title: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
}

function CategoryToggle({ id, title, description, checked, disabled, onChange }: CategoryToggleProps) {
  return (
    <div className="flex items-start justify-between gap-4 p-4 rounded-lg border border-border bg-muted/30">
      <div className="flex-1 space-y-1">
        <div className="flex items-center gap-2">
          <Label htmlFor={`category-${id}`} className="text-sm font-medium text-foreground cursor-pointer">
            {title}
          </Label>
          {disabled && (
            <Lock className="h-3 w-3 text-muted-foreground" aria-hidden="true" />
          )}
        </div>
        <p id={`category-${id}-desc`} className="text-xs text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
      <Switch
        id={`category-${id}`}
        checked={checked}
        onCheckedChange={onChange}
        disabled={disabled}
        aria-describedby={`category-${id}-desc`}
        className="shrink-0"
      />
    </div>
  );
}

export function CookiePreferencesModal() {
  const { showModal, closePreferences, savePreferences, acceptAll, rejectNonEssential } = useCookieConsent();
  const { t } = useLanguage();
  
  // Local state for category toggles
  const [categories, setCategories] = useState<ConsentCategories>(() => {
    const consent = getConsent();
    return consent?.categories ?? DEFAULT_CATEGORIES;
  });

  // Reset local state when modal opens
  useEffect(() => {
    if (showModal) {
      const consent = getConsent();
      setCategories(consent?.categories ?? DEFAULT_CATEGORIES);
    }
  }, [showModal]);

  const handleCategoryChange = (category: keyof ConsentCategories, checked: boolean) => {
    if (category === 'necessary') return; // Cannot change necessary
    setCategories((prev) => ({ ...prev, [category]: checked }));
  };

  const handleSave = () => {
    savePreferences(categories);
  };

  return (
    <Dialog open={showModal} onOpenChange={(open) => !open && closePreferences()}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t('cookieConsent.modal.title')}</DialogTitle>
          <DialogDescription>
            {t('cookieConsent.modal.description')}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-4">
          {/* Necessary - always enabled, locked */}
          <CategoryToggle
            id="necessary"
            title={t('cookieConsent.categories.necessary.title')}
            description={t('cookieConsent.categories.necessary.description')}
            checked={true}
            disabled={true}
            onChange={() => {}}
          />

          {/* Analytics */}
          <CategoryToggle
            id="analytics"
            title={t('cookieConsent.categories.analytics.title')}
            description={t('cookieConsent.categories.analytics.description')}
            checked={categories.analytics}
            onChange={(checked) => handleCategoryChange('analytics', checked)}
          />

          {/* Marketing */}
          <CategoryToggle
            id="marketing"
            title={t('cookieConsent.categories.marketing.title')}
            description={t('cookieConsent.categories.marketing.description')}
            checked={categories.marketing}
            onChange={(checked) => handleCategoryChange('marketing', checked)}
          />

          {/* Preferences */}
          <CategoryToggle
            id="preferences"
            title={t('cookieConsent.categories.preferences.title')}
            description={t('cookieConsent.categories.preferences.description')}
            checked={categories.preferences}
            onChange={(checked) => handleCategoryChange('preferences', checked)}
          />
        </div>

        {/* Action buttons - equal visual weight */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
          <Button
            onClick={handleSave}
            variant="default"
            className="flex-1"
          >
            {t('cookieConsent.modal.saveChoices')}
          </Button>
          <Button
            onClick={rejectNonEssential}
            variant="outline"
            className="flex-1"
          >
            {t('cookieConsent.modal.rejectAll')}
          </Button>
          <Button
            onClick={acceptAll}
            variant="outline"
            className="flex-1"
          >
            {t('cookieConsent.modal.acceptAll')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
