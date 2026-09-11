-- Re-add selar_link to book_products for optional external store links
-- This allows products to redirect to a Selar page instead of Paystack checkout

alter table public.book_products
  add column if not exists selar_link text;
