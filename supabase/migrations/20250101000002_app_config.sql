-- App configuration table for version gating
create table app_config (
  key   text primary key,
  value text not null
);

alter table app_config enable row level security;

-- Anyone authenticated can read config
create policy "app_config_read" on app_config
  for select using (true);

-- Seed with initial version values
insert into app_config (key, value) values ('min_version', '1.0.0');
insert into app_config (key, value) values ('latest_version', '1.0.0');
