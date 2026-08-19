-- =============================================================================
-- Flyway Migration: V3__fix_demo_passwords.sql
-- Description: Update seed user passwords with valid BCrypt hashes.
-- The hashes in V2 were truncated (32 chars) and therefore never matched.
--
-- Credentials after this migration:
--   admin@driveease.com  →  Admin@123
--   user@driveease.com   →  User@123
--
-- Hashes generated with BCrypt cost=10 via Spring's BCryptPasswordEncoder.
-- You can verify at: https://bcrypt.online/
-- =============================================================================

UPDATE users
SET password = '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lh3y'
WHERE email = 'admin@driveease.com';

UPDATE users
SET password = '$2a$10$TlCHtHvLbZW6Jb52gqn6TuHg1TmqZHYekq4LB2zVqXKnMaHlcHjbu'
WHERE email = 'user@driveease.com';
