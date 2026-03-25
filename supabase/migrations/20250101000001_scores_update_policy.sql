-- Allow players to update their own scores (needed to link a challenge_id after creation)
create policy "scores_update_own" on scores for update using (auth.uid() = player_id);
