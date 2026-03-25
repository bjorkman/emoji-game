-- Add seed column to challenges for deterministic question selection.
-- Nullable so existing challenges (created before this migration) still work.
ALTER TABLE challenges ADD COLUMN seed integer;
