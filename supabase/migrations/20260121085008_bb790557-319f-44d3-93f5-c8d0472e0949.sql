-- Drop existing constraints
ALTER TABLE posts DROP CONSTRAINT IF EXISTS posts_lang_check;
ALTER TABLE stories DROP CONSTRAINT IF EXISTS stories_lang_check;
ALTER TABLE categories DROP CONSTRAINT IF EXISTS categories_lang_check;
ALTER TABLE topics DROP CONSTRAINT IF EXISTS topics_lang_check;

-- Add new constraints with Czech language support
ALTER TABLE posts ADD CONSTRAINT posts_lang_check 
  CHECK (lang IN ('pl', 'en', 'de', 'es', 'fr', 'cs'));

ALTER TABLE stories ADD CONSTRAINT stories_lang_check 
  CHECK (lang IN ('pl', 'en', 'de', 'es', 'fr', 'cs'));

ALTER TABLE categories ADD CONSTRAINT categories_lang_check 
  CHECK (lang IN ('pl', 'en', 'de', 'es', 'fr', 'cs'));

ALTER TABLE topics ADD CONSTRAINT topics_lang_check 
  CHECK (lang IN ('pl', 'en', 'de', 'es', 'fr', 'cs'));