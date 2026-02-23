import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface SeoSettings {
  brandName: string;
  brandUrl: string;
  defaultTitleTemplate: string;
  defaultMetaTemplate: string;
  defaultOgImage: string;
  minWordsBlog: number;
  minWordsStory: number;
  titleMin: number;
  titleMax: number;
  descriptionMin: number;
  descriptionMax: number;
  defaultRobotsIndex: boolean;
  defaultRobotsFollow: boolean;
  breadcrumbsEnabled: boolean;
  faqSchemaEnabled: boolean;
}

const DEFAULT_SETTINGS: SeoSettings = {
  brandName: 'Quantifier.ai',
  brandUrl: 'https://quantifier.ai',
  defaultTitleTemplate: '{title} | {brand}',
  defaultMetaTemplate: '{excerpt}',
  defaultOgImage: '/lovable-uploads/platform-screenshot.png',
  minWordsBlog: 600,
  minWordsStory: 800,
  titleMin: 45,
  titleMax: 60,
  descriptionMin: 120,
  descriptionMax: 160,
  defaultRobotsIndex: true,
  defaultRobotsFollow: true,
  breadcrumbsEnabled: true,
  faqSchemaEnabled: false,
};

export function useSeoSettings() {
  const [settings, setSettings] = useState<SeoSettings>(DEFAULT_SETTINGS);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const loadSettings = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('settings')
        .select('key, value')
        .like('key', 'seo_%');

      if (error) throw error;

      if (data && data.length > 0) {
        const loaded: Partial<SeoSettings> = {};
        
        data.forEach(({ key, value }) => {
          // Parse JSON value - handle both string and raw values
          let parsedValue: any = value;
          if (typeof value === 'string') {
            try {
              parsedValue = JSON.parse(value);
            } catch {
              parsedValue = value;
            }
          }

          // Ensure parsedValue is a string for string fields
          const strValue = String(parsedValue ?? '');
          const numValue = parseInt(strValue) || 0;
          const boolValue = parsedValue === true || parsedValue === 'true';

          // Map to settings object
          switch (key) {
            case 'seo_brand_name':
              loaded.brandName = strValue;
              break;
            case 'seo_brand_url':
              loaded.brandUrl = strValue;
              break;
            case 'seo_default_title_template':
              loaded.defaultTitleTemplate = strValue;
              break;
            case 'seo_default_meta_template':
              loaded.defaultMetaTemplate = strValue;
              break;
            case 'seo_default_og_image':
              loaded.defaultOgImage = strValue;
              break;
            case 'seo_min_words_blog':
              loaded.minWordsBlog = numValue || DEFAULT_SETTINGS.minWordsBlog;
              break;
            case 'seo_min_words_story':
              loaded.minWordsStory = numValue || DEFAULT_SETTINGS.minWordsStory;
              break;
            case 'seo_title_min':
              loaded.titleMin = numValue || DEFAULT_SETTINGS.titleMin;
              break;
            case 'seo_title_max':
              loaded.titleMax = numValue || DEFAULT_SETTINGS.titleMax;
              break;
            case 'seo_description_min':
              loaded.descriptionMin = numValue || DEFAULT_SETTINGS.descriptionMin;
              break;
            case 'seo_description_max':
              loaded.descriptionMax = numValue || DEFAULT_SETTINGS.descriptionMax;
              break;
            case 'seo_default_robots_index':
              loaded.defaultRobotsIndex = boolValue;
              break;
            case 'seo_default_robots_follow':
              loaded.defaultRobotsFollow = boolValue;
              break;
            case 'seo_breadcrumbs_enabled':
              loaded.breadcrumbsEnabled = boolValue;
              break;
            case 'seo_faq_schema_enabled':
              loaded.faqSchemaEnabled = boolValue;
              break;
          }
        });

        setSettings({ ...DEFAULT_SETTINGS, ...loaded });
      }
    } catch (error) {
      console.error('Error loading SEO settings:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  const saveSettings = useCallback(async (newSettings: Partial<SeoSettings>) => {
    setIsSaving(true);
    
    try {
      const updates = Object.entries(newSettings).map(([key, value]) => {
        // Convert camelCase to snake_case with seo_ prefix
        const dbKey = 'seo_' + key.replace(/([A-Z])/g, '_$1').toLowerCase();
        
        return {
          key: dbKey,
          value: JSON.stringify(value),
          updated_at: new Date().toISOString(),
        };
      });

      for (const update of updates) {
        const { error } = await supabase
          .from('settings')
          .upsert(update, { onConflict: 'key' });

        if (error) throw error;
      }

      setSettings(prev => ({ ...prev, ...newSettings }));
      return true;
    } catch (error) {
      console.error('Error saving SEO settings:', error);
      return false;
    } finally {
      setIsSaving(false);
    }
  }, []);

  return {
    settings,
    isLoading,
    isSaving,
    saveSettings,
    reloadSettings: loadSettings,
  };
}

// Utility function to apply title template
export function applyTitleTemplate(template: string, title: string, brandName: string): string {
  return template
    .replace('{title}', title)
    .replace('{brand}', brandName);
}

// Utility function to apply meta template
export function applyMetaTemplate(template: string, excerpt: string): string {
  return template.replace('{excerpt}', excerpt);
}
