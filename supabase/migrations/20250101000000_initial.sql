-- Players (one row per anonymous session, tied to auth.users.id)
create table players (
  id         uuid primary key references auth.users(id) on delete cascade,
  nickname   text not null,
  push_token text,
  created_at timestamptz default now()
);

-- Challenges (created after finishing a game) — declared before scores so scores can reference it
create table challenges (
  id         uuid primary key default gen_random_uuid(),
  code       text not null unique,  -- e.g. "KPOP-XK7P"
  game_id    text not null,
  created_by uuid not null references players(id),
  created_at timestamptz default now()
);

-- Scores
create table scores (
  id           uuid primary key default gen_random_uuid(),
  player_id    uuid not null references players(id) on delete cascade,
  game_id      text not null,
  score        int  not null,
  total        int  not null,
  duration     int  not null,  -- seconds
  challenge_id uuid references challenges(id),
  created_at   timestamptz default now()
);

-- Friendships
create table friendships (
  id           uuid primary key default gen_random_uuid(),
  requester_id uuid not null references players(id) on delete cascade,
  addressee_id uuid not null references players(id) on delete cascade,
  status       text not null default 'pending', -- 'pending' | 'accepted'
  created_at   timestamptz default now(),
  unique (requester_id, addressee_id)
);

-- App configuration table for version gating
create table app_config (
  key   text primary key,
  value text not null
);

-- Row Level Security
alter table players     enable row level security;
alter table scores      enable row level security;
alter table challenges  enable row level security;
alter table friendships enable row level security;
alter table app_config  enable row level security;

-- players: any authenticated user can read; only own row can be inserted/updated
create policy "players_read"   on players for select using (auth.role() = 'authenticated');
create policy "players_insert" on players for insert with check (auth.uid() = id);
create policy "players_update" on players for update using (auth.uid() = id);

-- scores: any authenticated user can read (global LB); only own rows can be inserted/updated
create policy "scores_read"       on scores for select using (auth.role() = 'authenticated');
create policy "scores_insert"     on scores for insert with check (auth.uid() = player_id);
create policy "scores_update_own" on scores for update using (auth.uid() = player_id);

-- challenges: any authenticated user can read; only own rows can be inserted
create policy "challenges_read"   on challenges for select using (auth.role() = 'authenticated');
create policy "challenges_insert" on challenges for insert with check (auth.uid() = created_by);

-- friendships: users can read rows where they are requester or addressee
create policy "friendships_read" on friendships for select
  using (auth.uid() = requester_id or auth.uid() = addressee_id);
create policy "friendships_insert" on friendships for insert
  with check (auth.uid() = requester_id);
create policy "friendships_update" on friendships for update
  using (auth.uid() = requester_id or auth.uid() = addressee_id);

-- app_config: anyone authenticated can read
create policy "app_config_read" on app_config for select using (true);

-- Seed with initial version values
insert into app_config (key, value) values ('min_version', '1.0.0');
insert into app_config (key, value) values ('latest_version', '1.0.0');
