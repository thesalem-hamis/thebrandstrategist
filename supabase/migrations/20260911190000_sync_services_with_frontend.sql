-- Sync services table with frontend PRICING_TIERS in ServicesPage.tsx
-- strategy-1500 was renamed to strategy-setup (Personal Brand Strategy, $2,000)
-- brand-identity price updated from $2,000 to $1,500

-- Rename strategy-1500 -> strategy-setup and update its data
update public.services
  set id = 'strategy-setup',
      name = 'Personal Brand Strategy',
      description = 'End-to-end strategic positioning, communication systems, and a 90-day growth roadmap tailored to your business.',
      price = 200000,
      currency = 'USD',
      payment_required = false
where id = 'strategy-1500';

-- If the rename didn't match (service doesn't exist yet), insert it
insert into public.services (id, name, description, price, currency, payment_required, sort_order)
values
  ('strategy-setup', 'Personal Brand Strategy', 'End-to-end strategic positioning, communication systems, and a 90-day growth roadmap tailored to your business.', 200000, 'USD', false, 2)
on conflict (id) do update set
  name = excluded.name,
  description = excluded.description,
  price = excluded.price,
  currency = excluded.currency,
  payment_required = excluded.payment_required;

-- Update brand-identity to match frontend (name + price)
insert into public.services (id, name, description, price, currency, payment_required, sort_order)
values
  ('brand-identity', 'Brand Identity', 'Complete visual identity system, messaging architecture, and brand guidelines.', 150000, 'USD', false, 4)
on conflict (id) do update set
  name = excluded.name,
  description = excluded.description,
  price = excluded.price,
  currency = excluded.currency,
  payment_required = excluded.payment_required;
