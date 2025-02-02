-- Create waitlist table
create table public.waitlist (
  id uuid default gen_random_uuid() primary key,
  email text unique,
  created_at timestamptz default now(),
  wallet_address text unique
);

-- Create a table to store the current count
create table public.waitlist_count (
    id int primary key default 1,
    count int default 0,
    constraint singleton check (id = 1)
);

-- Insert initial count
insert into public.waitlist_count (id, count) values (1, 0);

-- Enable RLS
alter table public.waitlist enable row level security;

-- Create realtime publication
create publication waitlist_changes for table waitlist;

-- Create counter function
create or replace function get_waitlist_count()
returns integer
language sql
security definer
as $$
  select count(*) from public.waitlist;
$$;

-- Create function to update count
create or replace function update_waitlist_count()
returns trigger as $$
begin
    if (TG_OP = 'INSERT') then
        update waitlist_count set count = count + 1 where id = 1;
    elsif (TG_OP = 'DELETE') then
        update waitlist_count set count = count - 1 where id = 1;
    end if;
    return new;
end;
$$ language plpgsql;

-- Create trigger
create trigger waitlist_count_trigger
after insert or delete on public.waitlist
for each row execute function update_waitlist_count();

-- Enable realtime for count updates
alter publication supabase_realtime add table waitlist_count;
