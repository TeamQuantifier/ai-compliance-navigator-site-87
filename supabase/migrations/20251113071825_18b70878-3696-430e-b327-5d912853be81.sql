-- Fix security warnings: Set search_path for all functions

-- Update updated_at trigger function with search_path
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Update SEO score validation function with search_path
CREATE OR REPLACE FUNCTION public.validate_seo_score()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.seo_score < 0 OR NEW.seo_score > 100 THEN
    RAISE EXCEPTION 'SEO score must be between 0 and 100';
  END IF;
  RETURN NEW;
END;
$$;

-- Update sitemap regeneration trigger function with search_path
CREATE OR REPLACE FUNCTION public.trigger_sitemap_regen()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.settings 
  SET value = to_jsonb(NOW()), updated_at = NOW()
  WHERE key = 'sitemap_last_generated_at';
  RETURN NEW;
END;
$$;