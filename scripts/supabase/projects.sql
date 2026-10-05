-- Portfolio projects shown on /work and /work/[slug].
-- Image columns hold object keys in the Storage bucket (e.g. 'work/sella.png'),
-- not URLs; the app turns them into public URLs.
create table if not exists public.projects (
  slug           text primary key,
  position       integer not null,
  title          text not null,
  summary        text not null,
  url            text not null,
  hide_site_link boolean not null default false,
  categories     text[] not null default '{}',
  image          text,
  video          text,
  gallery        text[] not null default '{}',
  -- [{ name, appStore?, googlePlay? }] for mobile app projects.
  apps           jsonb,
  -- CaseStudyContent; its `cover` is an object key like `image`.
  case_study     jsonb,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

create index if not exists projects_position_idx on public.projects (position);

-- The site reads through a direct Postgres connection, which bypasses RLS.
-- With RLS on and no policies, the public REST API can neither read nor write.
alter table public.projects enable row level security;

create or replace function public.touch_updated_at() returns trigger
language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists projects_touch_updated_at on public.projects;
create trigger projects_touch_updated_at
  before update on public.projects
  for each row execute function public.touch_updated_at();
