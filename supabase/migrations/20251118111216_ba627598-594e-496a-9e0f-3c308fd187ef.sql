-- Add featured_image_url column to posts table
ALTER TABLE public.posts 
ADD COLUMN featured_image_url TEXT;

COMMENT ON COLUMN public.posts.featured_image_url IS 'URL głównej grafiki artykułu (thumbnail)';