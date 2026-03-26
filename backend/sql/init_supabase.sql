create extension if not exists pgcrypto;

create table if not exists public.customers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  company_name text not null,
  phone text not null,
  email text not null unique,
  industry text not null,
  employee_count text not null,
  location text not null,
  status text not null default 'lead',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_customers_updated_at on public.customers;
create trigger trg_customers_updated_at
before update on public.customers
for each row
execute function public.set_updated_at();

create table if not exists public.emails (
  id bigint generated always as identity primary key,
  customer_id uuid references public.customers(id) on delete set null,
  to_email text not null,
  subject text not null,
  template text,
  context jsonb,
  status text not null,
  error_message text,
  type text,
  created_at timestamptz not null default now()
);

create index if not exists idx_customers_email on public.customers(email);
create index if not exists idx_emails_customer_id on public.emails(customer_id);
create index if not exists idx_emails_created_at on public.emails(created_at desc);
