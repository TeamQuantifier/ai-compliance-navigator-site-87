import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

type Post = Database['public']['Tables']['posts']['Row'];
type Story = Database['public']['Tables']['stories']['Row'];
type Category = Database['public']['Tables']['categories']['Row'];
type Author = Database['public']['Tables']['authors']['Row'];
type Alternate = Database['public']['Tables']['alternates']['Row'];

export interface PostWithRelations extends Post {
  category?: Category | null;
  alternate?: Alternate | null;
}

export interface StoryWithRelations extends Story {
  author?: Author | null;
  alternate?: Alternate | null;
}

export const usePosts = (lang: string, categoryId?: string) => {
  return useQuery({
    queryKey: ['posts', lang, categoryId],
    queryFn: async () => {
      let query = supabase
        .from('posts')
        .select(`*, category:categories(*)`)
        .eq('lang', lang)
        .eq('status', 'published')
        .order('published_at', { ascending: false });

      if (categoryId && categoryId !== 'all') {
        query = query.eq('category_id', categoryId);
      }

      const { data, error } = await query;
      if (error) throw error;

      // Fallback to English for Czech if no posts found
      if ((!data || data.length === 0) && lang === 'cs') {
        let fallbackQuery = supabase
          .from('posts')
          .select(`*, category:categories(*)`)
          .eq('lang', 'en')
          .eq('status', 'published')
          .order('published_at', { ascending: false });

        if (categoryId && categoryId !== 'all') {
          fallbackQuery = fallbackQuery.eq('category_id', categoryId);
        }

        const { data: fallbackData, error: fallbackError } = await fallbackQuery;
        if (fallbackError) throw fallbackError;
        return fallbackData as PostWithRelations[];
      }

      return data as PostWithRelations[];
    },
  });
};

export const usePost = (slug: string, lang: string) => {
  return useQuery({
    queryKey: ['post', slug, lang],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('posts')
        .select(`*, category:categories(*)`)
        .eq('slug', slug)
        .eq('lang', lang)
        .eq('status', 'published')
        .maybeSingle();

      if (error) throw error;

      // Fallback to English for Czech if post not found
      if (!data && lang === 'cs') {
        const { data: fallbackData, error: fallbackError } = await supabase
          .from('posts')
          .select(`*, category:categories(*)`)
          .eq('slug', slug)
          .eq('lang', 'en')
          .eq('status', 'published')
          .maybeSingle();

        if (fallbackError) throw fallbackError;

        if (fallbackData) {
          const { data: alternateData } = await supabase
            .from('alternates')
            .select('*')
            .eq('content_type', 'post')
            .or(`primary_id.eq.${fallbackData.id},alternate_id.eq.${fallbackData.id}`)
            .maybeSingle();

          return { ...fallbackData, alternate: alternateData } as PostWithRelations;
        }
        return null;
      }

      if (data) {
        const { data: alternateData } = await supabase
          .from('alternates')
          .select('*')
          .eq('content_type', 'post')
          .or(`primary_id.eq.${data.id},alternate_id.eq.${data.id}`)
          .maybeSingle();

        return { ...data, alternate: alternateData } as PostWithRelations;
      }

      return null;
    },
  });
};

export const useStory = (slug: string, lang: string) => {
  return useQuery({
    queryKey: ['story', slug, lang],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('stories')
        .select(`*, author:authors(*)`)
        .eq('slug', slug)
        .eq('lang', lang)
        .eq('status', 'published')
        .maybeSingle();

      if (error) throw error;

      // Fallback to English for Czech if story not found
      if (!data && lang === 'cs') {
        const { data: fallbackData, error: fallbackError } = await supabase
          .from('stories')
          .select(`*, author:authors(*)`)
          .eq('slug', slug)
          .eq('lang', 'en')
          .eq('status', 'published')
          .maybeSingle();

        if (fallbackError) throw fallbackError;

        if (fallbackData) {
          const { data: alternateData } = await supabase
            .from('alternates')
            .select('*')
            .eq('content_type', 'story')
            .or(`primary_id.eq.${fallbackData.id},alternate_id.eq.${fallbackData.id}`)
            .maybeSingle();

          return { ...fallbackData, alternate: alternateData } as StoryWithRelations;
        }
        return null;
      }

      if (data) {
        const { data: alternateData } = await supabase
          .from('alternates')
          .select('*')
          .eq('content_type', 'story')
          .or(`primary_id.eq.${data.id},alternate_id.eq.${data.id}`)
          .maybeSingle();

        return { ...data, alternate: alternateData } as StoryWithRelations;
      }

      return null;
    },
  });
};

export const useCategories = (lang: string) => {
  return useQuery({
    queryKey: ['categories', lang],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('lang', lang)
        .order('name');

      if (error) throw error;

      // Fallback to English for Czech if no categories found
      if ((!data || data.length === 0) && lang === 'cs') {
        const { data: fallbackData, error: fallbackError } = await supabase
          .from('categories')
          .select('*')
          .eq('lang', 'en')
          .order('name');

        if (fallbackError) throw fallbackError;
        return fallbackData as Category[];
      }

      return data as Category[];
    },
  });
};

export const useStories = (lang: string) => {
  return useQuery({
    queryKey: ['stories', lang],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('stories')
        .select(`*, author:authors(*)`)
        .eq('lang', lang)
        .eq('status', 'published')
        .order('published_at', { ascending: false });

      if (error) throw error;

      // Fallback to English for Czech if no stories found
      if ((!data || data.length === 0) && lang === 'cs') {
        const { data: fallbackData, error: fallbackError } = await supabase
          .from('stories')
          .select(`*, author:authors(*)`)
          .eq('lang', 'en')
          .eq('status', 'published')
          .order('published_at', { ascending: false });

        if (fallbackError) throw fallbackError;
        return fallbackData as StoryWithRelations[];
      }

      return data as StoryWithRelations[];
    },
  });
};

export const useAlternatePost = (postId: string) => {
  return useQuery({
    queryKey: ['alternate-post', postId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('alternates')
        .select('*')
        .eq('content_type', 'post')
        .or(`primary_id.eq.${postId},alternate_id.eq.${postId}`)
        .maybeSingle();
      
      if (error) throw error;
      
      if (!data) return null;
      
      // Fetch the alternate post
      const alternateId = data.primary_id === postId ? data.alternate_id : data.primary_id;
      
      const { data: alternatePost, error: alternateError } = await supabase
        .from('posts')
        .select('slug, lang')
        .eq('id', alternateId)
        .maybeSingle();
      
      if (alternateError) throw alternateError;
      
      return alternatePost;
    },
  });
};
