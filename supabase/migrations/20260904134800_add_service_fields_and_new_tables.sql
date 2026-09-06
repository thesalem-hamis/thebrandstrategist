-- ============================================================
-- Migration: Add service_id to consultations + new tables
-- ============================================================
-- Safe to run multiple times.
-- Existing tables, columns, policies, indexes and seed data
-- will not cause duplicate-object errors.
-- ============================================================


-- ------------------------------------------------------------
-- 1. Create services table FIRST
-- ------------------------------------------------------------
create table if not exists public.services (
  id               text primary key,
  name             text not null,
  description      text,
  price            integer not null,
  currency         text not null default 'USD',
  payment_required boolean not null default false,
  active           boolean not null default true,
  sort_order       integer not null default 0,
  created_at       timestamptz not null default now()
);


-- ------------------------------------------------------------
-- 2. Add service_id to consultations if missing
-- ------------------------------------------------------------

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'consultations'
      AND column_name = 'service_id'
  ) THEN
    ALTER TABLE public.consultations
      ADD COLUMN service_id text;
  END IF;
END $$;


-- Add foreign key only if it does not already exist

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.table_constraints
    WHERE constraint_schema = 'public'
      AND table_name = 'consultations'
      AND constraint_name = 'consultations_service_id_fkey'
  ) THEN
    ALTER TABLE public.consultations
      ADD CONSTRAINT consultations_service_id_fkey
      FOREIGN KEY (service_id)
      REFERENCES public.services(id);
  END IF;
END $$;


-- ------------------------------------------------------------
-- 2b. Add client_phone to consultations if missing
-- ------------------------------------------------------------
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'consultations'
      AND column_name = 'client_phone'
  ) THEN
    ALTER TABLE public.consultations
      ADD COLUMN client_phone text;
  END IF;
END $$;


-- ------------------------------------------------------------
-- 3. Create service_requests table
-- ------------------------------------------------------------
create table if not exists public.service_requests (
  id              uuid primary key default gen_random_uuid(),
  service_id      text references public.services(id),
  client_name     text not null,
  client_email    text not null,
  client_phone    text,
  message         text,
  budget          text,
  request_status  text not null default 'new',
  email_sent      boolean not null default false,
  created_at      timestamptz not null default now()
);


-- ------------------------------------------------------------
-- 4. Create book_products table
-- ------------------------------------------------------------
create table if not exists public.book_products (
  id          uuid primary key default gen_random_uuid(),
  sku         text unique,
  title       text not null,
  author      text,
  description text,
  price       integer not null,
  currency    text not null default 'USD',
  image_url   text,
  pdf_url     text,
  stock_qty   integer,
  is_digital  boolean not null default false,
  active      boolean not null default true,
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now()
);


-- ------------------------------------------------------------
-- 4b. Add pdf_url & sort_order to book_products if table already existed
-- ------------------------------------------------------------
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
    AND table_name = 'book_products'
    AND column_name = 'pdf_url'
  ) THEN
    ALTER TABLE public.book_products ADD COLUMN pdf_url text;
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
    AND table_name = 'book_products'
    AND column_name = 'sort_order'
  ) THEN
    ALTER TABLE public.book_products ADD COLUMN sort_order integer not null default 0;
  END IF;
END $$;


-- ------------------------------------------------------------
-- 5. Create orders table
-- ------------------------------------------------------------
create table if not exists public.orders (
  id                uuid primary key default gen_random_uuid(),
  order_number      text unique not null,
  product_id        uuid references public.book_products(id),
  quantity          integer not null default 1,
  total_amount      integer not null,
  currency          text not null default 'USD',
  client_name       text not null,
  client_email      text not null,
  client_phone      text,
  delivery_info     jsonb,
  payment_status    text not null default 'pending',
  order_status      text not null default 'pending',
  paystack_reference text,
  email_sent        boolean not null default false,
  created_at        timestamptz not null default now(),
  paid_at           timestamptz
);


-- ------------------------------------------------------------
-- 6. Create email_log table
-- ------------------------------------------------------------
create table if not exists public.email_log (
  id                uuid primary key default gen_random_uuid(),
  reference_id      uuid,
  reference_type    text,
  to_email          text not null,
  subject           text,
  status            text not null default 'pending',
  provider_error    text,
  provider_response text,
  client_ip         text,
  sent_at           timestamptz,
  created_at        timestamptz not null default now()
);


-- ------------------------------------------------------------
-- 7. Seed default services
-- ------------------------------------------------------------
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


-- ------------------------------------------------------------
-- 8. Seed default site settings
-- ------------------------------------------------------------
insert into public.site_settings (key, value) values
  ('zoom_link', ''),
  ('consultation_fee_usd', '100'),
  ('contact_email', 'hello@thebrandstrategist.com')
on conflict (key) do nothing;


-- ------------------------------------------------------------
-- 9. Seed default book product
-- ------------------------------------------------------------
insert into public.book_products (sku, title, author, description, price, currency, is_digital, active, sort_order) values
  ('brand-strategist-book', 'The Brand Strategist', 'Bimpe Mohammed',
   'A practical guide to building a brand that matters — covering positioning, messaging, visual identity, and growth strategy.',
   3500, 'USD', true, true, 1)
on conflict (sku) do update set
  title = excluded.title,
  description = excluded.description,
  price = excluded.price,
  author = excluded.author;


-- ------------------------------------------------------------
-- 10. Enable RLS
-- ------------------------------------------------------------
alter table public.services enable row level security;
alter table public.consultations enable row level security;
alter table public.service_requests enable row level security;
alter table public.book_products enable row level security;
alter table public.orders enable row level security;
alter table public.email_log enable row level security;
alter table public.site_settings enable row level security;


-- ============================================================
-- 11. SERVICES POLICIES
-- ============================================================
create policy "Public can read active services"
  on public.services for select to anon, authenticated
  using (active = true);

create policy "Authenticated can manage services"
  on public.services for all to authenticated using (true) with check (true);


-- ============================================================
-- 12. CONSULTATIONS POLICIES
-- ============================================================
create policy "Anyone can create a consultation"
  on public.consultations for insert to anon
  with check (true);

create policy "Authenticated can read consultations"
  on public.consultations for select to authenticated using (true);

create policy "Authenticated can update consultations"
  on public.consultations for update to authenticated using (true) with check (true);


-- ============================================================
-- 13. SERVICE REQUESTS POLICIES
-- ============================================================
create policy "Anyone can create a service request"
  on public.service_requests for insert to anon with check (true);

create policy "Authenticated can read service requests"
  on public.service_requests for select to authenticated using (true);

create policy "Authenticated can update service requests"
  on public.service_requests for update to authenticated using (true) with check (true);


-- ============================================================
-- 14. BOOK PRODUCTS POLICIES
-- ============================================================
create policy "Public can read active book products"
  on public.book_products for select to anon, authenticated using (active = true);

create policy "Authenticated can manage book products"
  on public.book_products for all to authenticated using (true) with check (true);


-- ============================================================
-- 15. ORDERS POLICIES
-- ============================================================
create policy "Anyone can create an order"
  on public.orders for insert to anon with check (true);

create policy "Authenticated can read orders"
  on public.orders for select to authenticated using (true);

create policy "Authenticated can update orders"
  on public.orders for update to authenticated using (true) with check (true);


-- ============================================================
-- 16. EMAIL LOG POLICIES
-- ============================================================
create policy "Authenticated can read email log"
  on public.email_log for select to authenticated using (true);


-- ============================================================
-- 17. SITE SETTINGS POLICIES
-- ============================================================
create policy "Public can read non-secret settings"
  on public.site_settings for select to anon
  using (key in ('consultation_fee_usd', 'contact_email'));

create policy "Authenticated can read settings"
  on public.site_settings for select to authenticated using (true);

create policy "Authenticated can write settings"
  on public.site_settings for all to authenticated using (true) with check (true);


-- ============================================================
-- 18. INDEXES
-- ============================================================
create index if not exists idx_consultations_status on public.consultations (status);
create index if not exists idx_consultations_created on public.consultations (created_at desc);
create index if not exists idx_requests_status on public.service_requests (request_status, created_at desc);
create index if not exists idx_orders_status on public.orders (order_status, created_at desc);
create index if not exists idx_orders_number on public.orders (order_number);
create index if not exists idx_email_log_reference on public.email_log (reference_type, reference_id);


-- ============================================================
-- 19. STORAGE BUCKETS for book covers and PDFs
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
-- DONE
-- ============================================================
select 'Migration completed successfully' as result;
