-- Create projects and testimonials tables for admin-managed content
-- Admins can create/edit/delete case studies and client testimonials

-- Projects (case studies)
create table if not exists public.projects (
  id          uuid  primary key default gen_random_uuid(),
  slug        text  unique not null,
  title       text  not null,
  subtitle    text,
  description text,
  overview    text,
  year        text,
  focus       text[] not null default '{}',
  process     text[] not null default '{}',
  outcome     text,
  banner_image text,
  link        text,
  sort_order  integer not null default 0,
  active      boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- Testimonials
create table if not exists public.testimonials (
  id           uuid  primary key default gen_random_uuid(),
  author       text  not null,
  role         text,
  quote        text  not null,
  avatar       text,
  company_logo text,
  bg_class     text,
  sort_order   integer not null default 0,
  active       boolean not null default true,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- Row Level Security
alter table public.projects enable row level security;
alter table public.testimonials enable row level security;

create policy "Public can read active projects"
  on public.projects for select to anon, authenticated using (active = true);

create policy "Authenticated can manage projects"
  on public.projects for all to authenticated using (true) with check (true);

create policy "Public can read active testimonials"
  on public.testimonials for select to anon, authenticated using (active = true);

create policy "Authenticated can manage testimonials"
  on public.testimonials for all to authenticated using (true) with check (true);

-- Auto-update updated_at on projects/testimonials
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger projects_updated_at
  before update on public.projects
  for each row execute function public.set_updated_at();

create trigger testimonials_updated_at
  before update on public.testimonials
  for each row execute function public.set_updated_at();