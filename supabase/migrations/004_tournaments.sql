-- Tournaments: global time-bound challenges anyone can join.
CREATE TABLE tournaments (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title      text NOT NULL,
  game_id    text NOT NULL,
  seed       integer NOT NULL,
  starts_at  timestamptz NOT NULL,
  ends_at    timestamptz NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE tournaments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "tournaments_read" ON tournaments
  FOR SELECT USING (auth.role() = 'authenticated');

-- Link scores to tournaments (nullable — most scores aren't tournament scores).
ALTER TABLE scores ADD COLUMN tournament_id uuid REFERENCES tournaments(id);
