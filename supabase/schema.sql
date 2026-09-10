-- ============================================================
-- THE BRAND STRATEGIST — Supabase Schema (complete)
-- Run this in Supabase Dashboard → SQL Editor → New query
-- ============================================================

-- ------------------------------------------------------------
-- 1. SITE SERVICES (catalog of offerings)
-- ------------------------------------------------------------
create table if not exists public.services (
  id         text  primary key,                           -- consultation-100, strategy-1500, full-branding-2000, book-product
  name       text  not null,
  description text,
  price      integer not null,                            -- cents / kobo
  currency   text  not null default 'USD',
  payment_required boolean not null default false,        -- online payment?
  active     boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

-- ------------------------------------------------------------
-- 1b. CONSULTATIONS (paid 1-on-1 bookings via Paystack)
-- ------------------------------------------------------------
create table if not exists public.consultations (
  id             uuid  primary key default gen_random_uuid(),
  reference      text  unique not null,
  service_id     text  references public.services(id),
  client_name    text  not null,
  client_email   text  not null,
  client_phone   text,
  notes          text,
  session_date   date  not null,
  session_time   text  not null,
  amount         integer not null default 10000,
  currency       text  not null default 'USD',
  status         text  not null default 'pending',        -- pending | paid | failed | refunded
  paystack_channel text,
  zoom_link_sent boolean not null default false,
  paystack_data  jsonb,
  created_at     timestamptz not null default now(),
  paid_at        timestamptz
);

-- ------------------------------------------------------------
-- 2. SERVICE REQUESTS (strategy + branding, NO online payment)
-- ------------------------------------------------------------
create table if not exists public.service_requests (
  id          uuid  primary key default gen_random_uuid(),
  service_id  text  references public.services(id),
  client_name text  not null,
  client_email text not null,
  client_phone text,
  message     text,
  budget      text,
  request_status text not null default 'new',              -- new | contacted | confirmed | completed | cancelled
  email_sent  boolean not null default false,
  created_at  timestamptz not null default now()
);

-- ------------------------------------------------------------
-- 3. BOOK PRODUCTS
-- ------------------------------------------------------------
create table if not exists public.book_products (
  id          uuid  primary key default gen_random_uuid(),
  sku         text  unique,                                -- e.g. "brand-book-hardcover"
  title       text  not null,
  author      text,
  description text,
  price       integer not null,                            -- cents
  currency    text  not null default 'USD',
  image_url   text,
  pdf_url     text,
  stock_qty   integer,                                     -- null = unlimited (digital)
  is_digital  boolean not null default false,
  active      boolean not null default true,
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now()
);

-- ------------------------------------------------------------
-- 4. BOOK ORDERS
-- ------------------------------------------------------------
create table if not exists public.orders (
  id              uuid  primary key default gen_random_uuid(),
  order_number    text  unique not null,
  product_id      uuid  references public.book_products(id),
  quantity        integer not null default 1,
  total_amount    integer not null,                        -- cents
  currency        text  not null default 'USD',
  client_name     text  not null,
  client_email    text  not null,
  client_phone    text,
  delivery_info   jsonb,                                   -- {address, city, postcode, country, note}
  payment_status  text  not null default 'pending',        -- pending | paid | failed | refunded
  order_status    text  not null default 'pending',        -- pending | paid | processing | shipped | delivered | cancelled
  paystack_reference text,
  email_sent      boolean not null default false,
  created_at      timestamptz not null default now(),
  paid_at         timestamptz
);

-- ------------------------------------------------------------
-- 5. BLOG POSTS
-- ------------------------------------------------------------
create table if not exists public.blog_posts (
  id            uuid  primary key default gen_random_uuid(),
  title         text  not null,
  slug          text  unique not null,
  excerpt       text,
  content       text  not null default '',
  cover_image_url text,
  published     boolean not null default false,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- ------------------------------------------------------------
-- 6. SERVICE INQUIRIES (legacy — other services form)
-- ------------------------------------------------------------
create table if not exists public.service_inquiries (
  id      uuid  primary key default gen_random_uuid(),
  name    text  not null,
  email   text  not null,
  phone   text,
  service text  not null,
  budget  text,
  message text,
  status  text  not null default 'new',                    -- new | contacted | closed
  created_at timestamptz not null default now()
);

-- ------------------------------------------------------------
-- 7. SITE SETTINGS
-- ------------------------------------------------------------
create table if not exists public.site_settings (
  key          text primary key,
  value        text,
  updated_at   timestamptz not null default now()
);

-- ============================================================
-- SECURITY DEFINER for email sending (kept as a function)
-- ============================================================
create or replace function public.send_user_email(
  email_to text,
  email_subject text,
  email_html text
) returns boolean language plpgsql security definer as $$
declare
  payload jsonb;
begin
  payload := jsonb_build_object(
    'to',        email_to,
    'subject',   email_subject,
    'html',      email_html
  );
  perform
    net.http_post(
      uri    := 'https://api.resend.com/emails',
      data   := payload,
     headers := http_header_array(
    'Authorization' := 'Bearer ' || coalesce(current_setting('app.resend_api_key', true), ''),
    'Content-Type'  := 'application/json')
    );
  return true;
exception when others then
  return false;
end;
$$;

-- ============================================================
-- Default Services
-- ============================================================
insert into public.services (id, name, description, price, currency, payment_required, sort_order) values
  ('consultation-100', '1-on-1 Strategy Consultation', 'A 60-minute virtual strategy session covering brand assessment, opportunity identification, and next steps.', 10000, 'USD', true, 1),
  ('strategy-1500', 'Strategy / Setup', 'End-to-end strategic positioning, communication systems, and growth roadmap tailored to your business.', 150000, 'USD', false, 2),
  ('personal-brand', 'Personal Brand Strategy', 'Executive personal branding to position founders and leaders as industry authorities.', 150000, 'USD', false, 3),
  ('brand-identity', 'Brand Identity System', 'Complete visual identity, messaging architecture, and brand guidelines.', 200000, 'USD', false, 4),
  ('book-product', 'The Brand Strategist — Book', 'A practical guide to building a brand that matters.', 3500, 'USD', true, 5)
on conflict (id) do update set
  name = excluded.name,
  description = excluded.description,
  price = excluded.price,
  currency = excluded.currency,
  payment_required = excluded.payment_required;

-- ============================================================
-- Default Settings
-- ============================================================
insert into public.site_settings (key, value) values
  ('zoom_link', ''),
  ('consultation_fee_usd', '100'),
  ('contact_email', 'hello@thebrandstrategist.com')
on conflict (key) do nothing;

-- ============================================================
-- Row Level Security Policies
-- ============================================================

-- Services — public can read active; admin can manage
create policy "Public can read active services"
  on public.services for select to anon, authenticated
  using (active = true);

create policy "Authenticated can manage services"
  on public.services for all to authenticated using (true) with check (true);

-- Consultations
create policy "Anyone can create a consultation"
  on public.consultations for insert to anon
  with check (true);

create policy "Authenticated can read consultations"
  on public.consultations for select to authenticated using (true);

create policy "Authenticated can update consultations"
  on public.consultations for update to authenticated using (true) with check (true);

-- Service Requests
create policy "Anyone can create a service request"
  on public.service_requests for insert to anon with check (true);

create policy "Authenticated can read service requests"
  on public.service_requests for select to authenticated using (true);

create policy "Authenticated can update service requests"
  on public.service_requests for update to authenticated using (true) with check (true);

-- Book products — public reads active
create policy "Public can read active book products"
  on public.book_products for select to anon, authenticated using (active = true);

create policy "Authenticated can manage book products"
  on public.book_products for all to authenticated using (true) with check (true);

-- Orders — anyone creates pending; authenticated reads/updates
create policy "Anyone can create an order"
  on public.orders for insert to anon with check (true);

create policy "Authenticated can read orders"
  on public.orders for select to authenticated using (true);

create policy "Authenticated can update orders"
  on public.orders for update to authenticated using (true) with check (true);

-- Blog posts
create policy "Public can read published posts"
  on public.blog_posts for select to anon, authenticated using (published = true);

create policy "Authenticated can manage blog posts"
  on public.blog_posts for all to authenticated using (true) with check (true);

-- Service inquiries (legacy)
create policy "Anyone can submit an inquiry"
  on public.service_inquiries for insert to anon with check (true);

create policy "Authenticated can read inquiries"
  on public.service_inquiries for select to authenticated using (true);

create policy "Authenticated can update inquiries"
  on public.service_inquiries for update to authenticated using (true) with check (true);

-- Site settings
create policy "Authenticated can read settings"
  on public.site_settings for select to authenticated using (true);

create policy "Public can read non-secret settings"
  on public.site_settings for select to anon
  using (key in ('consultation_fee_usd', 'contact_email'));

create policy "Authenticated can write settings"
  on public.site_settings for all to authenticated using (true) with check (true);

-- ------------------------------------------------------------
-- 8. EMAIL LOG (delivery tracking for audits)
-- ------------------------------------------------------------
create table if not exists public.email_log (
  id            uuid primary key default gen_random_uuid(),
  reference_id  uuid,                                    -- the consultation / request / order
  reference_type text,                                   -- 'consultation' | 'service_request' | 'order'
  to_email      text not null,
  subject       text,
  status        text not null default 'pending',         -- pending | sent | failed
  provider_error text,
  provider_response text,
  client_ip     text,
  sent_at       timestamptz,
  created_at    timestamptz not null default now()
);

-- Only authenticated admins read
create policy "Authenticated can read email log"
  on public.email_log for select to authenticated using (true);

create index if not exists idx_email_log_reference on public.email_log (reference_type, reference_id);
insert into storage.buckets (id, name, public)
values ('blog-covers', 'blog-covers', true)
on conflict (id) do nothing;

create policy "Public can read blog covers"
  on storage.objects for select to anon, authenticated
  using (bucket_id = 'blog-covers');

create policy "Authenticated can upload blog covers"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'blog-covers');

create policy "Authenticated can update blog covers"
  on storage.objects for update to authenticated
  using (bucket_id = 'blog-covers') with check (bucket_id = 'blog-covers');

create policy "Authenticated can delete blog covers"
  on storage.objects for delete to authenticated
  using (bucket_id = 'blog-covers');

-- ============================================================
-- Storage: Book covers (public) and book files (authenticated only)
-- ============================================================
insert into storage.buckets (id, name, public)
values
  ('book-covers', 'book-covers', true),
  ('book-files', 'book-files', false)
on conflict (id) do nothing;

create policy "Public can read book covers"
  on storage.objects for select to anon, authenticated
  using (bucket_id = 'book-covers');

create policy "Authenticated can upload book covers"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'book-covers');

create policy "Authenticated can update book covers"
  on storage.objects for update to authenticated
  using (bucket_id = 'book-covers') with check (bucket_id = 'book-covers');

create policy "Authenticated can delete book covers"
  on storage.objects for delete to authenticated
  using (bucket_id = 'book-covers');

create policy "Authenticated can read book files"
  on storage.objects for select to authenticated
  using (bucket_id = 'book-files');

create policy "Authenticated can upload book files"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'book-files');

create policy "Authenticated can update book files"
  on storage.objects for update to authenticated
  using (bucket_id = 'book-files') with check (bucket_id = 'book-files');

create policy "Authenticated can delete book files"
  on storage.objects for delete to authenticated
  using (bucket_id = 'book-files');

-- ============================================================
-- Indexes
-- ============================================================
create index if not exists idx_consultations_status on public.consultations (status);
create index if not exists idx_consultations_created on public.consultations (created_at desc);
create index if not exists idx_blog_posts_published on public.blog_posts (published, created_at desc);
create index if not exists idx_inquiries_status on public.service_inquiries (status, created_at desc);
create index if not exists idx_requests_status on public.service_requests (request_status, created_at desc);
create index if not exists idx_orders_status on public.orders (order_status, created_at desc);
create index if not exists idx_orders_number on public.orders (order_number);
create index if not exists idx_email_log_reference on public.email_log (reference_type, reference_id);

-- ============================================================
-- Default book product
-- ============================================================
insert into public.book_products (sku, title, author, description, price, currency, is_digital, active, sort_order) values
  ('brand-strategist-book', 'The Brand Strategist', 'Bimpe Mohammed',
   'A practical guide to building a brand that matters — covering positioning, messaging, visual identity, and growth strategy.',
   3500, 'USD', true, true, 1)
on conflict (sku) do update set
  title = excluded.title,
  description = excluded.description,
  price = excluded.price,
  currency = excluded.currency;
