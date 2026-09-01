-- ============================================================
-- THE BRAND STRATEGIST — Supabase Schema
-- Run this in Supabase Dashboard → SQL Editor → New query
-- ============================================================

-- ------------------------------------------------------------
-- 1. CONSULTATIONS (1-on-1 bookings + Paystack payments)
-- ------------------------------------------------------------
create table if not exists public.consultations (
  id uuid primary key default gen_random_uuid(),
  reference text unique not null,
  client_name text not null,
  client_email text not null,
  notes text,
  session_date date not null,
  session_time text not null,
  amount integer not null default 10000, -- in subunits (cents for USD): 10000 = $100.00
  currency text not null default 'USD',
  status text not null default 'pending', -- pending | paid | failed
  paystack_channel text,
  zoom_link_sent boolean not null default false,
  paystack_data jsonb,
  created_at timestamptz not null default now(),
  paid_at timestamptz
);

-- Anyone can create a pending booking (pre-payment record)
create policy "Anyone can create a consultation"
  on public.consultations for insert
  to anon
  with check (status = 'pending');

-- Only authenticated dashboard users can read/update
create policy "Authenticated can read consultations"
  on public.consultations for select
  to authenticated
  using (true);

create policy "Authenticated can update consultations"
  on public.consultations for update
  to authenticated
  using (true)
  with check (true);

-- ------------------------------------------------------------
-- 2. BLOG POSTS
-- ------------------------------------------------------------
create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  excerpt text,
  content text not null default '',
  cover_image_url text,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Public can read published posts only
create policy "Public can read published posts"
  on public.blog_posts for select
  to anon, authenticated
  using (published = true);

-- Authenticated dashboard users manage everything
create policy "Authenticated can manage blog posts"
  on public.blog_posts for all
  to authenticated
  using (true)
  with check (true);

-- ------------------------------------------------------------
-- 3. SERVICE INQUIRIES (other services contact form)
-- ------------------------------------------------------------
create table if not exists public.service_inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  service text not null,
  budget text,
  message text,
  status text not null default 'new', -- new | contacted | closed
  created_at timestamptz not null default now()
);

-- Anyone can submit an inquiry
create policy "Anyone can submit an inquiry"
  on public.service_inquiries for insert
  to anon
  with check (true);

-- Authenticated dashboard users can read & update status
create policy "Authenticated can read inquiries"
  on public.service_inquiries for select
  to authenticated
  using (true);

create policy "Authenticated can update inquiries"
  on public.service_inquiries for update
  to authenticated
  using (true)
  with check (true);

-- ------------------------------------------------------------
-- 4. SITE SETTINGS (Zoom link, fee, email sender, etc.)
-- ------------------------------------------------------------
create table if not exists public.site_settings (
  key text primary key,
  value text,
  updated_at timestamptz not null default now()
);

-- Authenticated dashboard users can read & write settings
create policy "Authenticated can read settings"
  on public.site_settings for select
  to authenticated
  using (true);

-- Public (anon) may read ONLY non-secret keys (fee, contact email).
-- zoom_link stays private — it is only read by Edge Functions (service role).
create policy "Public can read non-secret settings"
  on public.site_settings for select
  to anon
  using (key in ('consultation_fee_usd', 'contact_email'));

create policy "Authenticated can write settings"
  on public.site_settings for all
  to authenticated
  using (true)
  with check (true);

-- Default settings
insert into public.site_settings (key, value) values
  ('zoom_link', ''),
  ('consultation_fee_usd', '100'),
  ('contact_email', 'hello@thebrandstrategist.com')
on conflict (key) do nothing;

-- ------------------------------------------------------------
-- Indexes
-- ------------------------------------------------------------
create index if not exists idx_consultations_status on public.consultations (status);
create index if not exists idx_consultations_created on public.consultations (created_at desc);
create index if not exists idx_blog_posts_published on public.blog_posts (published, created_at desc);
create index if not exists idx_inquiries_status on public.service_inquiries (status, created_at desc);

-- ------------------------------------------------------------
-- 5. STORAGE — Blog cover image uploads
-- ------------------------------------------------------------
-- A public bucket so cover images can be read on the public blog.
-- Only authenticated dashboard users may upload/update/delete.
insert into storage.buckets (id, name, public)
values ('blog-covers', 'blog-covers', true)
on conflict (id) do nothing;

create policy "Public can read blog covers"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'blog-covers');

create policy "Authenticated can upload blog covers"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'blog-covers');

create policy "Authenticated can update blog covers"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'blog-covers')
  with check (bucket_id = 'blog-covers');

create policy "Authenticated can delete blog covers"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'blog-covers');