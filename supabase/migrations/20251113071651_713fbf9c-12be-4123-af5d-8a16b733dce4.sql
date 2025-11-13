-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types
CREATE TYPE post_status AS ENUM ('draft', 'scheduled', 'published', 'archived');
CREATE TYPE content_type AS ENUM ('post', 'story');

-- Authors table (shared across all content)
CREATE TABLE public.authors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(150) NOT NULL,
  slug VARCHAR(150) NOT NULL UNIQUE,
  bio TEXT,
  avatar_url TEXT,
  social JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Categories table (language-specific)
CREATE TABLE public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lang VARCHAR(5) NOT NULL CHECK (lang IN ('pl', 'en', 'de', 'es', 'fr')),
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(120) NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(lang, slug)
);

-- Topics table (for topic clusters and anti-cannibalization)
CREATE TABLE public.topics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lang VARCHAR(5) NOT NULL CHECK (lang IN ('pl', 'en', 'de', 'es', 'fr')),
  name VARCHAR(150) NOT NULL,
  target_keyword VARCHAR(200),
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Posts table (blog articles)
CREATE TABLE public.posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lang VARCHAR(5) NOT NULL CHECK (lang IN ('pl', 'en', 'de', 'es', 'fr')),
  topic_id UUID REFERENCES public.topics(id) ON DELETE SET NULL,
  title VARCHAR(200) NOT NULL,
  slug VARCHAR(250) NOT NULL,
  excerpt TEXT,
  body_rich JSONB NOT NULL DEFAULT '{}',
  meta_title VARCHAR(60),
  meta_desc VARCHAR(160),
  og_image_url TEXT,
  status post_status NOT NULL DEFAULT 'draft',
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  author_id UUID REFERENCES public.authors(id) ON DELETE SET NULL,
  tags TEXT[] DEFAULT '{}',
  related_post_ids UUID[] DEFAULT '{}',
  seo_score INTEGER DEFAULT 0,
  UNIQUE(lang, slug)
);

-- Stories table (success stories/case studies)
CREATE TABLE public.stories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lang VARCHAR(5) NOT NULL CHECK (lang IN ('pl', 'en', 'de', 'es', 'fr')),
  title VARCHAR(200) NOT NULL,
  slug VARCHAR(250) NOT NULL,
  summary TEXT,
  body_rich JSONB NOT NULL DEFAULT '{}',
  client_name VARCHAR(150),
  industry VARCHAR(100),
  country VARCHAR(100),
  logo_url TEXT,
  results_kpis JSONB DEFAULT '[]',
  meta_title VARCHAR(60),
  meta_desc VARCHAR(160),
  og_image_url TEXT,
  status post_status NOT NULL DEFAULT 'draft',
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  author_id UUID REFERENCES public.authors(id) ON DELETE SET NULL,
  tags TEXT[] DEFAULT '{}',
  seo_score INTEGER DEFAULT 0,
  UNIQUE(lang, slug)
);

-- Alternates table (language variants linking)
CREATE TABLE public.alternates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_type content_type NOT NULL,
  primary_id UUID NOT NULL,
  alternate_id UUID NOT NULL,
  primary_lang VARCHAR(5) NOT NULL,
  alternate_lang VARCHAR(5) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(content_type, primary_id, alternate_id)
);

-- Redirects table (301/308 redirects)
CREATE TABLE public.redirects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  from_path VARCHAR(500) NOT NULL UNIQUE,
  to_path VARCHAR(500) NOT NULL,
  http_code INTEGER NOT NULL DEFAULT 301 CHECK (http_code IN (301, 308)),
  is_active BOOLEAN NOT NULL DEFAULT true,
  hits INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Settings table (global site settings)
CREATE TABLE public.settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key VARCHAR(100) NOT NULL UNIQUE,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_posts_lang_status ON public.posts(lang, status);
CREATE INDEX idx_posts_published_at ON public.posts(published_at DESC NULLS LAST) WHERE status = 'published';
CREATE INDEX idx_posts_category ON public.posts(category_id) WHERE category_id IS NOT NULL;
CREATE INDEX idx_posts_author ON public.posts(author_id) WHERE author_id IS NOT NULL;
CREATE INDEX idx_posts_tags ON public.posts USING GIN(tags);
CREATE INDEX idx_posts_topic ON public.posts(topic_id) WHERE topic_id IS NOT NULL;

CREATE INDEX idx_stories_lang_status ON public.stories(lang, status);
CREATE INDEX idx_stories_published_at ON public.stories(published_at DESC NULLS LAST) WHERE status = 'published';
CREATE INDEX idx_stories_industry ON public.stories(industry) WHERE industry IS NOT NULL;
CREATE INDEX idx_stories_country ON public.stories(country) WHERE country IS NOT NULL;
CREATE INDEX idx_stories_author ON public.stories(author_id) WHERE author_id IS NOT NULL;

CREATE INDEX idx_alternates_primary ON public.alternates(content_type, primary_id);
CREATE INDEX idx_alternates_alternate ON public.alternates(content_type, alternate_id);

CREATE INDEX idx_redirects_active ON public.redirects(from_path) WHERE is_active = true;

CREATE INDEX idx_categories_lang_slug ON public.categories(lang, slug);
CREATE INDEX idx_topics_lang ON public.topics(lang);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at triggers
CREATE TRIGGER update_authors_updated_at BEFORE UPDATE ON public.authors
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON public.categories
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_topics_updated_at BEFORE UPDATE ON public.topics
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_posts_updated_at BEFORE UPDATE ON public.posts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_stories_updated_at BEFORE UPDATE ON public.stories
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_redirects_updated_at BEFORE UPDATE ON public.redirects
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_settings_updated_at BEFORE UPDATE ON public.settings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Validation trigger for SEO score
CREATE OR REPLACE FUNCTION public.validate_seo_score()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.seo_score < 0 OR NEW.seo_score > 100 THEN
    RAISE EXCEPTION 'SEO score must be between 0 and 100';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER validate_posts_seo_score BEFORE INSERT OR UPDATE ON public.posts
  FOR EACH ROW EXECUTE FUNCTION public.validate_seo_score();

CREATE TRIGGER validate_stories_seo_score BEFORE INSERT OR UPDATE ON public.stories
  FOR EACH ROW EXECUTE FUNCTION public.validate_seo_score();

-- Function to trigger sitemap regeneration
CREATE OR REPLACE FUNCTION public.trigger_sitemap_regen()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.settings 
  SET value = to_jsonb(NOW()), updated_at = NOW()
  WHERE key = 'sitemap_last_generated_at';
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger sitemap regeneration on post/story publish
CREATE TRIGGER on_post_publish
  AFTER UPDATE OF status ON public.posts
  FOR EACH ROW
  WHEN (NEW.status = 'published' AND OLD.status != 'published')
  EXECUTE FUNCTION public.trigger_sitemap_regen();

CREATE TRIGGER on_story_publish
  AFTER UPDATE OF status ON public.stories
  FOR EACH ROW
  WHEN (NEW.status = 'published' AND OLD.status != 'published')
  EXECUTE FUNCTION public.trigger_sitemap_regen();

-- Enable Row Level Security
ALTER TABLE public.authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alternates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.redirects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for public read access to published content
CREATE POLICY "Public can view published posts" ON public.posts
  FOR SELECT USING (status = 'published');

CREATE POLICY "Public can view published stories" ON public.stories
  FOR SELECT USING (status = 'published');

CREATE POLICY "Public can view authors" ON public.authors
  FOR SELECT USING (true);

CREATE POLICY "Public can view categories" ON public.categories
  FOR SELECT USING (true);

CREATE POLICY "Public can view topics" ON public.topics
  FOR SELECT USING (true);

CREATE POLICY "Public can view alternates" ON public.alternates
  FOR SELECT USING (true);

CREATE POLICY "Public can view active redirects" ON public.redirects
  FOR SELECT USING (is_active = true);

CREATE POLICY "Public can view settings" ON public.settings
  FOR SELECT USING (true);

-- Admin policies will be added in Phase 2 when we implement authentication
-- For now, all write operations are blocked by RLS

-- Insert default settings
INSERT INTO public.settings (key, value) VALUES
  ('site_name', '"Quantifier.ai"'),
  ('default_lang', '"en"'),
  ('supported_langs', '["en", "pl"]'),
  ('base_url', '"https://quantifier.ai"'),
  ('sitemap_last_generated_at', 'null');

-- Create storage buckets for blog images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('blog-images', 'blog-images', true, 2097152, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/avif']),
  ('stories-images', 'stories-images', true, 2097152, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/avif'])
ON CONFLICT (id) DO NOTHING;

-- Storage policies for public read access
CREATE POLICY "Public can view blog images" ON storage.objects
  FOR SELECT USING (bucket_id = 'blog-images');

CREATE POLICY "Public can view story images" ON storage.objects
  FOR SELECT USING (bucket_id = 'stories-images');