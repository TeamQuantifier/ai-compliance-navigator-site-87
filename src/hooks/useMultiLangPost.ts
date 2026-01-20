import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import type { Language } from '@/components/admin/LanguageTabs';

export interface PostVersion {
  id?: string;
  title: string;
  slug: string;
  lang: Language;
  status: 'draft' | 'published' | 'scheduled' | 'archived';
  body_rich: any;
  excerpt: string;
  category_id: string | null;
  meta_title: string;
  meta_desc: string;
  og_image_url: string;
  featured_image_url: string;
  tags: string[];
  related_post_ids: string[];
  published_at: string | null;
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
  seo_score: number;
}

const createEmptyVersion = (lang: Language): PostVersion => ({
  title: '',
  slug: '',
  lang,
  status: 'draft',
  body_rich: {},
  excerpt: '',
  category_id: null,
  meta_title: '',
  meta_desc: '',
  og_image_url: '',
  featured_image_url: '',
  tags: [],
  related_post_ids: [],
  published_at: null,
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
  schema_type: 'BlogPosting',
  schema_json_override: null,
  breadcrumbs_enabled: true,
  featured_image_alt: '',
  seo_score: 0,
});

export interface MultiLangPostState {
  groupId: string | null;
  versions: Record<Language, PostVersion>;
  isLoading: boolean;
  isSaving: boolean;
}

export function useMultiLangPost(groupId?: string) {
  const [state, setState] = useState<MultiLangPostState>({
    groupId: groupId || null,
    versions: {
      pl: createEmptyVersion('pl'),
      en: createEmptyVersion('en'),
      cs: createEmptyVersion('cs'),
    },
    isLoading: !!groupId,
    isSaving: false,
  });

  const loadPostGroup = useCallback(async (gId: string) => {
    setState(prev => ({ ...prev, isLoading: true }));
    try {
      const { data: posts, error } = await supabase
        .from('posts')
        .select('*')
        .eq('group_id', gId);

      if (error) throw error;

      const versions: Record<Language, PostVersion> = {
        pl: createEmptyVersion('pl'),
        en: createEmptyVersion('en'),
        cs: createEmptyVersion('cs'),
      };

      posts?.forEach((post) => {
        const lang = post.lang as Language;
        if (['pl', 'en', 'cs'].includes(lang)) {
          versions[lang] = {
            id: post.id,
            title: post.title,
            slug: post.slug,
            lang,
            status: post.status,
            body_rich: post.body_rich || {},
            excerpt: post.excerpt || '',
            category_id: post.category_id,
            meta_title: post.meta_title || '',
            meta_desc: post.meta_desc || '',
            og_image_url: post.og_image_url || '',
            featured_image_url: post.featured_image_url || '',
            tags: post.tags || [],
            related_post_ids: post.related_post_ids || [],
            published_at: post.published_at,
            group_id: post.group_id,
            // New SEO fields
            focus_keyword: post.focus_keyword || '',
            canonical_url: post.canonical_url || '',
            robots_index: post.robots_index !== false,
            robots_follow: post.robots_follow !== false,
            og_title: post.og_title || '',
            og_description: post.og_description || '',
            twitter_card_type: post.twitter_card_type || 'summary_large_image',
            twitter_title: post.twitter_title || '',
            twitter_description: post.twitter_description || '',
            twitter_image_url: post.twitter_image_url || '',
            schema_type: post.schema_type || 'BlogPosting',
            schema_json_override: post.schema_json_override || null,
            breadcrumbs_enabled: post.breadcrumbs_enabled !== false,
            featured_image_alt: post.featured_image_alt || '',
            seo_score: post.seo_score || 0,
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
      console.error('Error loading post group:', error);
      toast.error('Błąd podczas wczytywania artykułu');
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  // Load by single post ID (legacy support)
  const loadByPostId = useCallback(async (postId: string) => {
    try {
      const { data: post, error } = await supabase
        .from('posts')
        .select('group_id')
        .eq('id', postId)
        .maybeSingle();

      if (error) throw error;
      if (post?.group_id) {
        await loadPostGroup(post.group_id);
      }
    } catch (error) {
      console.error('Error loading post by ID:', error);
      toast.error('Błąd podczas wczytywania artykułu');
    }
  }, [loadPostGroup]);

  useEffect(() => {
    if (groupId) {
      loadPostGroup(groupId);
    }
  }, [groupId, loadPostGroup]);

  const updateVersion = useCallback((lang: Language, updates: Partial<PostVersion>) => {
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
          .insert({ content_type: 'post' })
          .select('id')
          .single();

        if (groupError) throw groupError;
        currentGroupId = newGroup.id;
      }

      const versionsToSave: Language[] = [];
      const postIds: string[] = [];

      // Save each version that has content
      for (const lang of ['pl', 'en', 'cs'] as Language[]) {
        const version = state.versions[lang];
        
        // Skip if no title (no content)
        if (!version.title.trim()) continue;

        versionsToSave.push(lang);

        const postData = {
          title: version.title,
          slug: version.slug,
          lang,
          status: version.status,
          body_rich: version.body_rich,
          excerpt: version.excerpt,
          category_id: version.category_id,
          meta_title: version.meta_title,
          meta_desc: version.meta_desc,
          og_image_url: version.og_image_url,
          featured_image_url: version.featured_image_url,
          tags: version.tags,
          related_post_ids: version.related_post_ids,
          published_at: version.published_at,
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
          seo_score: version.seo_score || 0,
        };

        if (version.id) {
          // Update existing
          const { error } = await supabase
            .from('posts')
            .update(postData)
            .eq('id', version.id);

          if (error) throw error;
          postIds.push(version.id);
        } else {
          // Insert new
          const { data: newPost, error } = await supabase
            .from('posts')
            .insert(postData)
            .select('id')
            .single();

          if (error) throw error;
          postIds.push(newPost.id);

          // Update local state with new ID
          setState(prev => ({
            ...prev,
            versions: {
              ...prev.versions,
              [lang]: { ...prev.versions[lang], id: newPost.id, group_id: currentGroupId },
            },
          }));
        }
      }

      // Update alternates for SEO hreflang
      await updateAlternates(postIds, 'post');

      setState(prev => ({ ...prev, groupId: currentGroupId, isSaving: false }));
      toast.success(`Zapisano ${versionsToSave.length} wersji językowych`);
      
      return currentGroupId;
    } catch (error: any) {
      console.error('Error saving posts:', error);
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
    loadByPostId,
    loadPostGroup,
    hasContent,
    isPublished,
  };
}

async function updateAlternates(postIds: string[], contentType: 'post' | 'story') {
  if (postIds.length < 2) return;

  try {
    // Get language info for each post
    const { data: posts, error: fetchError } = await supabase
      .from(contentType === 'post' ? 'posts' : 'stories')
      .select('id, lang')
      .in('id', postIds);

    if (fetchError) throw fetchError;
    if (!posts || posts.length < 2) return;

    // Delete old alternates
    await supabase
      .from('alternates')
      .delete()
      .eq('content_type', contentType)
      .in('primary_id', postIds);

    // Create new alternates pairs
    const alternates: Array<{
      content_type: 'post' | 'story';
      primary_id: string;
      primary_lang: string;
      alternate_id: string;
      alternate_lang: string;
    }> = [];

    for (const primary of posts) {
      for (const alternate of posts) {
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
