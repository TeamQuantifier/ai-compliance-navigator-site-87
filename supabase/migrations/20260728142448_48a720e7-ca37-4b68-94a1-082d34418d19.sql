ALTER TABLE public.submissions ADD COLUMN IF NOT EXISTS source_url text;
ALTER TABLE public.event_registrations ADD COLUMN IF NOT EXISTS source_url text;
