-- Create app_role enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'editor', 'viewer');

-- Create user_roles table for role management
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, role)
);

-- Create index for performance
CREATE INDEX idx_user_roles_user_id ON public.user_roles(user_id);
CREATE INDEX idx_user_roles_role ON public.user_roles(role);

-- Enable RLS
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- RLS policy: users can view their own roles
CREATE POLICY "Users can view their own roles" ON public.user_roles
  FOR SELECT USING (auth.uid() = user_id);

-- Security definer function to check if user has role
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Security definer function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = 'admin'
  )
$$;

-- Update RLS policies for admin access

-- Posts: admins can do everything
CREATE POLICY "Admins can view all posts" ON public.posts
  FOR SELECT USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can insert posts" ON public.posts
  FOR INSERT WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update posts" ON public.posts
  FOR UPDATE USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can delete posts" ON public.posts
  FOR DELETE USING (public.is_admin(auth.uid()));

-- Stories: admins can do everything
CREATE POLICY "Admins can view all stories" ON public.stories
  FOR SELECT USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can insert stories" ON public.stories
  FOR INSERT WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update stories" ON public.stories
  FOR UPDATE USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can delete stories" ON public.stories
  FOR DELETE USING (public.is_admin(auth.uid()));

-- Categories: admins can manage
CREATE POLICY "Admins can insert categories" ON public.categories
  FOR INSERT WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update categories" ON public.categories
  FOR UPDATE USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can delete categories" ON public.categories
  FOR DELETE USING (public.is_admin(auth.uid()));

-- Topics: admins can manage
CREATE POLICY "Admins can view all topics" ON public.topics
  FOR SELECT USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can insert topics" ON public.topics
  FOR INSERT WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update topics" ON public.topics
  FOR UPDATE USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can delete topics" ON public.topics
  FOR DELETE USING (public.is_admin(auth.uid()));

-- Authors: admins can manage
CREATE POLICY "Admins can insert authors" ON public.authors
  FOR INSERT WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update authors" ON public.authors
  FOR UPDATE USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can delete authors" ON public.authors
  FOR DELETE USING (public.is_admin(auth.uid()));

-- Alternates: admins can manage
CREATE POLICY "Admins can insert alternates" ON public.alternates
  FOR INSERT WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update alternates" ON public.alternates
  FOR UPDATE USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can delete alternates" ON public.alternates
  FOR DELETE USING (public.is_admin(auth.uid()));

-- Redirects: admins can manage
CREATE POLICY "Admins can view all redirects" ON public.redirects
  FOR SELECT USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can insert redirects" ON public.redirects
  FOR INSERT WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update redirects" ON public.redirects
  FOR UPDATE USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can delete redirects" ON public.redirects
  FOR DELETE USING (public.is_admin(auth.uid()));

-- Settings: admins can manage
CREATE POLICY "Admins can insert settings" ON public.settings
  FOR INSERT WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update settings" ON public.settings
  FOR UPDATE USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can delete settings" ON public.settings
  FOR DELETE USING (public.is_admin(auth.uid()));

-- Storage: admins can upload
CREATE POLICY "Admins can upload blog images" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'blog-images' AND 
    public.is_admin(auth.uid())
  );

CREATE POLICY "Admins can update blog images" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'blog-images' AND 
    public.is_admin(auth.uid())
  );

CREATE POLICY "Admins can delete blog images" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'blog-images' AND 
    public.is_admin(auth.uid())
  );

CREATE POLICY "Admins can upload story images" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'stories-images' AND 
    public.is_admin(auth.uid())
  );

CREATE POLICY "Admins can update story images" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'stories-images' AND 
    public.is_admin(auth.uid())
  );

CREATE POLICY "Admins can delete story images" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'stories-images' AND 
    public.is_admin(auth.uid())
  );

-- Trigger for updated_at on user_roles
CREATE TRIGGER update_user_roles_updated_at BEFORE UPDATE ON public.user_roles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();