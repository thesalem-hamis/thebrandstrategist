-- Add selar_link to book_products for external store links

alter table public.book_products
  add column if not exists selar_link text;
