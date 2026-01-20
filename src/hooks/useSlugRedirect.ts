import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

type ContentType = 'post' | 'story';

export function useSlugRedirect() {
  /**
   * Creates a 301 redirect when a slug changes
   * Should be called before saving the new slug
   */
  const createRedirect = useCallback(async (
    oldSlug: string,
    newSlug: string,
    lang: string,
    contentType: ContentType
  ) => {
    // Don't create redirect if slugs are the same or empty
    if (!oldSlug || !newSlug || oldSlug === newSlug) {
      return { success: true, skipped: true };
    }

    const basePath = contentType === 'post' ? 'blog' : 'success-stories';
    const fromPath = `/${lang}/${basePath}/${oldSlug}`;
    const toPath = `/${lang}/${basePath}/${newSlug}`;

    try {
      // Check if redirect already exists
      const { data: existing } = await supabase
        .from('redirects')
        .select('id')
        .eq('from_path', fromPath)
        .maybeSingle();

      if (existing) {
        // Update existing redirect
        const { error } = await supabase
          .from('redirects')
          .update({
            to_path: toPath,
            updated_at: new Date().toISOString(),
            is_active: true,
          })
          .eq('id', existing.id);

        if (error) throw error;
      } else {
        // Create new redirect
        const { error } = await supabase
          .from('redirects')
          .insert({
            from_path: fromPath,
            to_path: toPath,
            http_code: 301,
            is_active: true,
          });

        if (error) throw error;
      }

      console.log(`Created 301 redirect: ${fromPath} -> ${toPath}`);
      return { success: true, fromPath, toPath };
    } catch (error) {
      console.error('Error creating redirect:', error);
      return { success: false, error };
    }
  }, []);

  /**
   * Get existing slug for comparison before save
   */
  const getExistingSlug = useCallback(async (
    id: string,
    contentType: ContentType
  ): Promise<string | null> => {
    try {
      const table = contentType === 'post' ? 'posts' : 'stories';
      const { data, error } = await supabase
        .from(table)
        .select('slug')
        .eq('id', id)
        .maybeSingle();

      if (error) throw error;
      return data?.slug || null;
    } catch (error) {
      console.error('Error fetching existing slug:', error);
      return null;
    }
  }, []);

  /**
   * Check if a slug is unique within content type and language
   */
  const isSlugUnique = useCallback(async (
    slug: string,
    lang: string,
    contentType: ContentType,
    excludeId?: string
  ): Promise<boolean> => {
    try {
      const table = contentType === 'post' ? 'posts' : 'stories';
      let query = supabase
        .from(table)
        .select('id')
        .eq('slug', slug)
        .eq('lang', lang);

      if (excludeId) {
        query = query.neq('id', excludeId);
      }

      const { data, error } = await query.maybeSingle();

      if (error) throw error;
      return !data; // Unique if no result found
    } catch (error) {
      console.error('Error checking slug uniqueness:', error);
      return false;
    }
  }, []);

  return {
    createRedirect,
    getExistingSlug,
    isSlugUnique,
  };
}
