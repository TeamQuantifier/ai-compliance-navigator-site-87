-- =====================================================
-- MIGRATION: Article Groups for Multi-Language CMS
-- This creates a grouping system for posts and stories
-- so that PL/EN/CS versions can be managed together
-- =====================================================

-- 1. Create article_groups table
CREATE TABLE public.article_groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_type public.content_type NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Add comment for documentation
COMMENT ON TABLE public.article_groups IS 'Groups language versions of posts and stories together for unified CMS management';

-- 2. Add group_id column to posts table
ALTER TABLE public.posts 
ADD COLUMN group_id UUID REFERENCES public.article_groups(id) ON DELETE SET NULL;

-- 3. Add group_id column to stories table  
ALTER TABLE public.stories
ADD COLUMN group_id UUID REFERENCES public.article_groups(id) ON DELETE SET NULL;

-- 4. Create indexes for performance
CREATE INDEX idx_posts_group_id ON public.posts(group_id);
CREATE INDEX idx_stories_group_id ON public.stories(group_id);
CREATE INDEX idx_article_groups_content_type ON public.article_groups(content_type);

-- 5. Enable RLS on article_groups
ALTER TABLE public.article_groups ENABLE ROW LEVEL SECURITY;

-- 6. RLS Policies for article_groups
CREATE POLICY "Public can view article_groups"
ON public.article_groups
FOR SELECT
USING (true);

CREATE POLICY "Admins can insert article_groups"
ON public.article_groups
FOR INSERT
WITH CHECK (is_admin(auth.uid()));

CREATE POLICY "Admins can update article_groups"
ON public.article_groups
FOR UPDATE
USING (is_admin(auth.uid()));

CREATE POLICY "Admins can delete article_groups"
ON public.article_groups
FOR DELETE
USING (is_admin(auth.uid()));

-- 7. Trigger to auto-update updated_at
CREATE TRIGGER update_article_groups_updated_at
BEFORE UPDATE ON public.article_groups
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- =====================================================
-- DATA MIGRATION: Link existing posts/stories to groups
-- =====================================================

-- 8. Create groups for POSTS and link them
-- First, create groups for all unique post slugs (normalized)
DO $$
DECLARE
  post_record RECORD;
  new_group_id UUID;
  slug_base TEXT;
  existing_group_id UUID;
BEGIN
  -- Process each post
  FOR post_record IN 
    SELECT id, slug, lang 
    FROM public.posts 
    WHERE group_id IS NULL
    ORDER BY created_at ASC
  LOOP
    -- Extract base slug (remove language prefixes/suffixes if any)
    slug_base := regexp_replace(post_record.slug, '^(pl-|en-|cs-)', '');
    slug_base := regexp_replace(slug_base, '(-pl|-en|-cs)$', '');
    
    -- Check if we already have a group for a similar post (different lang, same base content)
    SELECT p.group_id INTO existing_group_id
    FROM public.posts p
    WHERE p.group_id IS NOT NULL
      AND p.id != post_record.id
      AND (
        -- Match by similar slug pattern
        p.slug LIKE slug_base || '%' 
        OR post_record.slug LIKE regexp_replace(p.slug, '^(pl-|en-|cs-)', '') || '%'
      )
    LIMIT 1;
    
    IF existing_group_id IS NOT NULL THEN
      -- Link to existing group
      UPDATE public.posts SET group_id = existing_group_id WHERE id = post_record.id;
    ELSE
      -- Create new group
      INSERT INTO public.article_groups (content_type) VALUES ('post') RETURNING id INTO new_group_id;
      UPDATE public.posts SET group_id = new_group_id WHERE id = post_record.id;
    END IF;
  END LOOP;
END $$;

-- 9. Create groups for STORIES and link them
DO $$
DECLARE
  story_record RECORD;
  new_group_id UUID;
  slug_base TEXT;
  existing_group_id UUID;
BEGIN
  -- Process each story
  FOR story_record IN 
    SELECT id, slug, lang 
    FROM public.stories 
    WHERE group_id IS NULL
    ORDER BY created_at ASC
  LOOP
    -- Extract base slug
    slug_base := regexp_replace(story_record.slug, '^(case-study-)', '');
    slug_base := regexp_replace(slug_base, '(-pl|-en|-cs)$', '');
    
    -- Check if we have a group for similar story
    SELECT s.group_id INTO existing_group_id
    FROM public.stories s
    WHERE s.group_id IS NOT NULL
      AND s.id != story_record.id
      AND (
        s.slug LIKE '%' || slug_base || '%' 
        OR story_record.slug LIKE '%' || regexp_replace(s.slug, '^(case-study-)', '') || '%'
      )
    LIMIT 1;
    
    IF existing_group_id IS NOT NULL THEN
      -- Link to existing group
      UPDATE public.stories SET group_id = existing_group_id WHERE id = story_record.id;
    ELSE
      -- Create new group
      INSERT INTO public.article_groups (content_type) VALUES ('story') RETURNING id INTO new_group_id;
      UPDATE public.stories SET group_id = new_group_id WHERE id = story_record.id;
    END IF;
  END LOOP;
END $$;

-- 10. Ensure all posts and stories have a group
-- Create individual groups for any orphaned records
INSERT INTO public.article_groups (id, content_type)
SELECT gen_random_uuid(), 'post'
FROM public.posts
WHERE group_id IS NULL;

UPDATE public.posts p
SET group_id = (
  SELECT ag.id FROM public.article_groups ag 
  WHERE ag.content_type = 'post' 
  AND NOT EXISTS (SELECT 1 FROM public.posts p2 WHERE p2.group_id = ag.id)
  LIMIT 1
)
WHERE p.group_id IS NULL;

INSERT INTO public.article_groups (id, content_type)
SELECT gen_random_uuid(), 'story'
FROM public.stories
WHERE group_id IS NULL;

UPDATE public.stories s
SET group_id = (
  SELECT ag.id FROM public.article_groups ag 
  WHERE ag.content_type = 'story' 
  AND NOT EXISTS (SELECT 1 FROM public.stories s2 WHERE s2.group_id = ag.id)
  LIMIT 1
)
WHERE s.group_id IS NULL;