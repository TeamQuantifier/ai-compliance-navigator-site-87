import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import type { Language } from '@/components/admin/LanguageTabs';

export interface StoryVersion {
  id?: string;
  title: string;
  slug: string;
  lang: Language;
  status: 'draft' | 'published' | 'scheduled' | 'archived';
  summary: string;
  client_name: string;
  industry: string;
  country: string;
  logo_url: string;
  body_rich: any;
  meta_title: string;
  meta_desc: string;
  og_image_url: string;
  featured_image_url: string;
  tags: string[];
  seo_score: number;
  group_id: string | null;
  // New SEO fields
  focus_keyword: string;
  canonical_url: string;
  robots_index: boolean;
  robots_follow: boolean;
  og_title: string;
  og_description: string;
  twitter_card_type: string;
  twitter_title: string;
  twitter_description: string;
  twitter_image_url: string;
  schema_type: string;
  schema_json_override: any;
  breadcrumbs_enabled: boolean;
  featured_image_alt: string;
}

const createEmptyVersion = (lang: Language): StoryVersion => ({
  title: '',
  slug: '',
  lang,
  status: 'draft',
  summary: '',
  client_name: '',
  industry: '',
  country: '',
  logo_url: '',
  body_rich: {},
  meta_title: '',
  meta_desc: '',
  og_image_url: '',
  featured_image_url: '',
  tags: [],
  seo_score: 0,
  group_id: null,
  // New SEO fields with defaults
  focus_keyword: '',
  canonical_url: '',
  robots_index: true,
  robots_follow: true,
  og_title: '',
  og_description: '',
  twitter_card_type: 'summary_large_image',
  twitter_title: '',
  twitter_description: '',
  twitter_image_url: '',
  schema_type: 'Article',
  schema_json_override: null,
  breadcrumbs_enabled: true,
  featured_image_alt: '',
});

export interface MultiLangStoryState {
  groupId: string | null;
  versions: Record<Language, StoryVersion>;
  isLoading: boolean;
  isSaving: boolean;
}

export function useMultiLangStory(groupId?: string) {
  const [state, setState] = useState<MultiLangStoryState>({
    groupId: groupId || null,
    versions: {
      pl: createEmptyVersion('pl'),
      en: createEmptyVersion('en'),
      cs: createEmptyVersion('cs'),
    },
    isLoading: !!groupId,
    isSaving: false,
  });

  const loadStoryGroup = useCallback(async (gId: string) => {
    setState(prev => ({ ...prev, isLoading: true }));
    try {
      const { data: stories, error } = await supabase
        .from('stories')
        .select('*')
        .eq('group_id', gId);

      if (error) throw error;

      const versions: Record<Language, StoryVersion> = {
        pl: createEmptyVersion('pl'),
        en: createEmptyVersion('en'),
        cs: createEmptyVersion('cs'),
      };

      stories?.forEach((story) => {
        const lang = story.lang as Language;
        if (['pl', 'en', 'cs'].includes(lang)) {
          versions[lang] = {
            id: story.id,
            title: story.title,
            slug: story.slug,
            lang,
            status: story.status,
            summary: story.summary || '',
            client_name: story.client_name || '',
            industry: story.industry || '',
            country: story.country || '',
            logo_url: story.logo_url || '',
            body_rich: story.body_rich || {},
            meta_title: story.meta_title || '',
            meta_desc: story.meta_desc || '',
            og_image_url: story.og_image_url || '',
            featured_image_url: story.featured_image_url || '',
            tags: story.tags || [],
            seo_score: story.seo_score || 0,
            group_id: story.group_id,
            // New SEO fields
            focus_keyword: story.focus_keyword || '',
            canonical_url: story.canonical_url || '',
            robots_index: story.robots_index !== false,
            robots_follow: story.robots_follow !== false,
            og_title: story.og_title || '',
            og_description: story.og_description || '',
            twitter_card_type: story.twitter_card_type || 'summary_large_image',
            twitter_title: story.twitter_title || '',
            twitter_description: story.twitter_description || '',
            twitter_image_url: story.twitter_image_url || '',
            schema_type: story.schema_type || 'Article',
            schema_json_override: story.schema_json_override || null,
            breadcrumbs_enabled: story.breadcrumbs_enabled !== false,
            featured_image_alt: story.featured_image_alt || '',
          };
        }
      });

      setState({
        groupId: gId,
        versions,
        isLoading: false,
        isSaving: false,
      });
    } catch (error) {
      console.error('Error loading story group:', error);
      toast.error('Błąd podczas wczytywania success story');
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  // Load by single story ID (legacy support)
  const loadByStoryId = useCallback(async (storyId: string) => {
    try {
      const { data: story, error } = await supabase
        .from('stories')
        .select('group_id')
        .eq('id', storyId)
        .maybeSingle();

      if (error) throw error;
      if (story?.group_id) {
        await loadStoryGroup(story.group_id);
      }
    } catch (error) {
      console.error('Error loading story by ID:', error);
      toast.error('Błąd podczas wczytywania success story');
    }
  }, [loadStoryGroup]);

  useEffect(() => {
    if (groupId) {
      loadStoryGroup(groupId);
    }
  }, [groupId, loadStoryGroup]);

  const updateVersion = useCallback((lang: Language, updates: Partial<StoryVersion>) => {
    setState(prev => ({
      ...prev,
      versions: {
        ...prev.versions,
        [lang]: { ...prev.versions[lang], ...updates },
      },
    }));
  }, []);

  const saveAllVersions = useCallback(async () => {
    setState(prev => ({ ...prev, isSaving: true }));
    
    try {
      let currentGroupId = state.groupId;

      // Create group if needed
      if (!currentGroupId) {
        const { data: newGroup, error: groupError } = await supabase
          .from('article_groups')
          .insert({ content_type: 'story' })
          .select('id')
          .single();

        if (groupError) throw groupError;
        currentGroupId = newGroup.id;
      }

      const versionsToSave: Language[] = [];
      const storyIds: string[] = [];

      // Save each version that has content
      for (const lang of ['pl', 'en', 'cs'] as Language[]) {
        const version = state.versions[lang];
        
        // Skip if no title (no content)
        if (!version.title.trim()) continue;

        versionsToSave.push(lang);

        const storyData = {
          title: version.title,
          slug: version.slug,
          lang,
          status: version.status,
          summary: version.summary,
          client_name: version.client_name,
          industry: version.industry,
          country: version.country,
          logo_url: version.logo_url,
          body_rich: version.body_rich,
          meta_title: version.meta_title,
          meta_desc: version.meta_desc,
          og_image_url: version.og_image_url,
          featured_image_url: version.featured_image_url,
          tags: version.tags,
          seo_score: version.seo_score,
          group_id: currentGroupId,
          updated_at: new Date().toISOString(),
          // New SEO fields
          focus_keyword: version.focus_keyword || null,
          canonical_url: version.canonical_url || null,
          robots_index: version.robots_index,
          robots_follow: version.robots_follow,
          og_title: version.og_title || null,
          og_description: version.og_description || null,
          twitter_card_type: version.twitter_card_type || null,
          twitter_title: version.twitter_title || null,
          twitter_description: version.twitter_description || null,
          twitter_image_url: version.twitter_image_url || null,
          schema_type: version.schema_type || null,
          schema_json_override: version.schema_json_override || null,
          breadcrumbs_enabled: version.breadcrumbs_enabled,
          featured_image_alt: version.featured_image_alt || null,
        };

        if (version.id) {
          // Update existing
          const { error } = await supabase
            .from('stories')
            .update(storyData)
            .eq('id', version.id);

          if (error) throw error;
          storyIds.push(version.id);
        } else {
          // Insert new
          const { data: newStory, error } = await supabase
            .from('stories')
            .insert(storyData)
            .select('id')
            .single();

          if (error) throw error;
          storyIds.push(newStory.id);

          // Update local state with new ID
          setState(prev => ({
            ...prev,
            versions: {
              ...prev.versions,
              [lang]: { ...prev.versions[lang], id: newStory.id, group_id: currentGroupId },
            },
          }));
        }
      }

      // Update alternates for SEO hreflang
      await updateAlternates(storyIds, 'story');

      setState(prev => ({ ...prev, groupId: currentGroupId, isSaving: false }));
      toast.success(`Zapisano ${versionsToSave.length} wersji językowych`);
      
      return currentGroupId;
    } catch (error: any) {
      console.error('Error saving stories:', error);
      toast.error(error.message || 'Błąd podczas zapisywania');
      setState(prev => ({ ...prev, isSaving: false }));
      return null;
    }
  }, [state]);

  const hasContent = useCallback((lang: Language) => {
    return !!state.versions[lang].title.trim();
  }, [state.versions]);

  const isPublished = useCallback((lang: Language) => {
    return state.versions[lang].status === 'published';
  }, [state.versions]);

  return {
    ...state,
    updateVersion,
    saveAllVersions,
    loadByStoryId,
    loadStoryGroup,
    hasContent,
    isPublished,
  };
}

async function updateAlternates(storyIds: string[], contentType: 'post' | 'story') {
  if (storyIds.length < 2) return;

  try {
    // Get language info for each story
    const { data: stories, error: fetchError } = await supabase
      .from('stories')
      .select('id, lang')
      .in('id', storyIds);

    if (fetchError) throw fetchError;
    if (!stories || stories.length < 2) return;

    // Delete old alternates
    await supabase
      .from('alternates')
      .delete()
      .eq('content_type', contentType)
      .in('primary_id', storyIds);

    // Create new alternates pairs
    const alternates: Array<{
      content_type: 'post' | 'story';
      primary_id: string;
      primary_lang: string;
      alternate_id: string;
      alternate_lang: string;
    }> = [];

    for (const primary of stories) {
      for (const alternate of stories) {
        if (primary.id !== alternate.id) {
          alternates.push({
            content_type: contentType,
            primary_id: primary.id,
            primary_lang: primary.lang,
            alternate_id: alternate.id,
            alternate_lang: alternate.lang,
          });
        }
      }
    }

    if (alternates.length > 0) {
      await supabase.from('alternates').insert(alternates);
    }
  } catch (error) {
    console.error('Error updating alternates:', error);
  }
}
