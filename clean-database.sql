-- Clean up the database
USE golf_diary;

-- Delete all existing data
DELETE FROM lessons;
DELETE FROM golf_rounds;
DELETE FROM users;

-- Reset auto-increment counters
ALTER TABLE lessons AUTO_INCREMENT = 1;
ALTER TABLE golf_rounds AUTO_INCREMENT = 1;
ALTER TABLE users AUTO_INCREMENT = 1;

-- Verify tables are empty
SELECT 'Users count:' as info, COUNT(*) as count FROM users
UNION ALL
SELECT 'Lessons count:', COUNT(*) FROM lessons
UNION ALL
SELECT 'Golf rounds count:', COUNT(*) FROM golf_rounds; 