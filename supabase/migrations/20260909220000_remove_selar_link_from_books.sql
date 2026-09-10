-- Remove selar_link column from book_products
-- Reverts the selar integration back to the original flow

alter table public.book_products
  drop column if exists selar_link;
