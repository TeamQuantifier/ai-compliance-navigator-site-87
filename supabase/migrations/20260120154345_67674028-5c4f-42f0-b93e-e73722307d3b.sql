-- Add SEO fields to posts table
ALTER TABLE public.posts 
ADD COLUMN IF NOT EXISTS focus_keyword VARCHAR(100),
ADD COLUMN IF NOT EXISTS canonical_url TEXT,
ADD COLUMN IF NOT EXISTS robots_index BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS robots_follow BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS og_title VARCHAR(100),
ADD COLUMN IF NOT EXISTS og_description VARCHAR(300),
ADD COLUMN IF NOT EXISTS twitter_card_type VARCHAR(30) DEFAULT 'summary_large_image',
ADD COLUMN IF NOT EXISTS twitter_title VARCHAR(100),
ADD COLUMN IF NOT EXISTS twitter_description VARCHAR(300),
ADD COLUMN IF NOT EXISTS twitter_image_url TEXT,
ADD COLUMN IF NOT EXISTS schema_type VARCHAR(30) DEFAULT 'BlogPosting',
ADD COLUMN IF NOT EXISTS schema_json_override JSONB,
ADD COLUMN IF NOT EXISTS breadcrumbs_enabled BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS featured_image_alt VARCHAR(255),
ADD COLUMN IF NOT EXISTS seo_score INTEGER DEFAULT 0;

-- Add SEO fields to stories table (seo_score already exists)
ALTER TABLE public.stories
ADD COLUMN IF NOT EXISTS focus_keyword VARCHAR(100),
ADD COLUMN IF NOT EXISTS canonical_url TEXT,
ADD COLUMN IF NOT EXISTS robots_index BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS robots_follow BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS og_title VARCHAR(100),
ADD COLUMN IF NOT EXISTS og_description VARCHAR(300),
ADD COLUMN IF NOT EXISTS twitter_card_type VARCHAR(30) DEFAULT 'summary_large_image',
ADD COLUMN IF NOT EXISTS twitter_title VARCHAR(100),
ADD COLUMN IF NOT EXISTS twitter_description VARCHAR(300),
ADD COLUMN IF NOT EXISTS twitter_image_url TEXT,
ADD COLUMN IF NOT EXISTS schema_type VARCHAR(30) DEFAULT 'Article',
ADD COLUMN IF NOT EXISTS schema_json_override JSONB,
ADD COLUMN IF NOT EXISTS breadcrumbs_enabled BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS featured_image_alt VARCHAR(255);

-- Insert default SEO settings
INSERT INTO public.settings (key, value) VALUES
  ('seo_brand_name', '"Quantifier.ai"'),
  ('seo_brand_url', '"https://quantifier.ai"'),
  ('seo_default_title_template', '"{title} | {brand}"'),
  ('seo_default_meta_template', '"{excerpt}"'),
  ('seo_default_og_image', '"/og-image.png"'),
  ('seo_min_words_blog', '600'),
  ('seo_min_words_story', '800'),
  ('seo_title_min', '45'),
  ('seo_title_max', '60'),
  ('seo_description_min', '120'),
  ('seo_description_max', '160'),
  ('seo_default_robots_index', 'true'),
  ('seo_default_robots_follow', 'true'),
  ('seo_breadcrumbs_enabled', 'true'),
  ('seo_faq_schema_enabled', 'false')
ON CONFLICT (key) DO NOTHING;