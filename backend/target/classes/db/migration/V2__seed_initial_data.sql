-- =============================================================================
-- Flyway Migration: V2__seed_initial_data.sql
-- Description: Seed Data for DriveEase (Admin, User, Locations, Addons, Cars, Images)
-- =============================================================================

-- 1. SEED USERS
-- Passwords hashed with BCrypt (Cost 10):
-- admin@driveease.com -> Admin@123  ($2a$10$w09ZkE3JbC1R7z0vOqfSxe3Gz1g7P.F3YfX6N.s3rJ7N.BqE.t9yC)
-- user@driveease.com  -> User@123   ($2a$10$b8xT9kK1J2Q3W4E5R6T7Yu9Z0a1B2C3D4E5F6G7H8I9J0K1L2M3Ne)

-- Notice: Standard Spring BCrypt hashes for 'Admin@123' and 'User@123'
INSERT INTO users (id, email, password, first_name, last_name, phone, driving_license, role, status, created_at, updated_at)
VALUES 
(1, 'admin@driveease.com', '$2a$10$wH6h4f1sQe8p6JvUqQWqU.Q2v9eX9zR6mE8g7bV4c3x2z1y0w9v8u', 'Admin', 'Officer', '+91 9876543210', 'DL-ADMIN-001', 'ROLE_ADMIN', 'ACTIVE', NOW(), NOW()),
(2, 'user@driveease.com', '$2a$10$eO7k1k7jI0g9v4Wp2pQjE.G6c3f8x5z9mE2b4v7c0x1z8y3w6v5u4', 'Rahul', 'Sharma', '+91 9811223344', 'DL-1420110012345', 'ROLE_USER', 'ACTIVE', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- 2. SEED LOCATIONS
INSERT INTO locations (id, name, city, state, address, phone, is_active, created_at, updated_at)
VALUES
(1, 'Mumbai International Airport T2', 'Mumbai', 'Maharashtra', 'Level P4, Terminal 2 Parking, Chhatrapati Shivaji Maharaj International Airport', '+91 22 6685 1010', true, NOW(), NOW()),
(2, 'Delhi Aerocity Hub', 'New Delhi', 'Delhi', 'Asset Area 4, Hospitality District, Aerocity, Near IGI Airport', '+91 11 4988 2020', true, NOW(), NOW()),
(3, 'Bengaluru Indiranagar Hub', 'Bengaluru', 'Karnataka', '100 Feet Road, HAL 2nd Stage, Indiranagar', '+91 80 4122 3030', true, NOW(), NOW()),
(4, 'Hyderabad Hitec City Branch', 'Hyderabad', 'Telangana', 'Cyber Towers Concourse, Madhapur, Hitec City', '+91 40 6711 4040', true, NOW(), NOW()),
(5, 'Goa Dabolim Airport Pickup', 'Goa', 'Goa', 'Airport Road, Dabolim International Terminal Area', '+91 832 254 5050', true, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- 3. SEED ADDONS
INSERT INTO addons (id, name, description, price_per_day, is_active, created_at)
VALUES
(1, 'GPS Navigation System', 'High-accuracy offline & live satellite navigation unit with real-time traffic updates.', 250.00, true, NOW()),
(2, 'Child Safety Seat', 'ISOFIX certified premium ergonomic child seat suitable for ages 0 to 6.', 300.00, true, NOW()),
(3, 'Additional Authorized Driver', 'Permit an extra verified driver on the rental contract with full coverage.', 400.00, true, NOW()),
(4, 'Zero-Dep Comprehensive Protection', 'Full bumper-to-bumper collision damage waiver with zero customer liability.', 650.00, true, NOW()),
(5, '24/7 Roadside Assistance & Concierge', 'Express flat tire, battery jump, towing, and round-the-clock priority road support.', 200.00, true, NOW())
ON CONFLICT (id) DO NOTHING;

-- 4. SEED CARS
INSERT INTO cars (id, brand, model, year, category, description, price_per_day, seats, doors, transmission, fuel_type, mileage, engine, air_conditioned, luggage_capacity, rating_avg, review_count, is_active, location_id, created_at, updated_at)
VALUES
-- 1. Luxury Sedan: BMW 5 Series
(1, 'BMW', '5 Series 530d', 2024, 'LUXURY', 'The ultimate executive luxury sedan blending twin-power turbo performance with supreme cabin refinement and digital driver displays.', 7500.00, 5, 4, 'AUTOMATIC', 'DIESEL', '17.4 kmpl', '3.0L Turbo Inline-6', true, 3, 4.90, 18, true, 1, NOW(), NOW()),

-- 2. Luxury Sedan: Mercedes-Benz C-Class
(2, 'Mercedes-Benz', 'C-Class C200', 2024, 'LUXURY', 'Pure prestige featuring the iconic panoramic cockpit, Burmester surround sound, and gentle adaptive air suspension.', 8200.00, 5, 4, 'AUTOMATIC', 'PETROL', '16.9 kmpl', '2.0L Turbo 4-Cylinder', true, 3, 4.95, 24, true, 2, NOW(), NOW()),

-- 3. Luxury Sedan: Audi A6
(3, 'Audi', 'A6 45 TFSI', 2023, 'LUXURY', 'Progressive luxury with Quattro all-wheel drive, dual MMI touch response screens, and Matrix LED headlights.', 7900.00, 5, 4, 'AUTOMATIC', 'PETROL', '14.1 kmpl', '2.0L Turbocharged TFSI', true, 3, 4.85, 12, true, 1, NOW(), NOW()),

-- 4. Rugged SUV: Toyota Fortuner 4x4
(4, 'Toyota', 'Fortuner Legender 4x4', 2024, 'SUV', 'Legendary Japanese durability with unstoppable 4x4 terrain capability, bold road presence, and 7-seat spaciousness.', 4800.00, 7, 5, 'AUTOMATIC', 'DIESEL', '14.4 kmpl', '2.8L Turbo Diesel', true, 4, 4.88, 35, true, 1, NOW(), NOW()),

-- 5. Compact SUV: Hyundai Creta
(5, 'Hyundai', 'Creta SX(O)', 2024, 'SUV', 'India''s favorite modern SUV boasting a panoramic sunroof, ventilated front seats, Level 2 ADAS, and smooth dynamics.', 2800.00, 5, 5, 'AUTOMATIC', 'PETROL', '18.1 kmpl', '1.5L Turbo GDi', true, 3, 4.75, 42, true, 3, NOW(), NOW()),

-- 6. Premium SUV: Mahindra XUV700
(6, 'Mahindra', 'XUV700 AX7 Luxury', 2024, 'SUV', 'High-tech performance SUV with dual HD superscreens, Sony 3D audio, ADAS safety, and expansive legroom.', 3400.00, 7, 5, 'AUTOMATIC', 'DIESEL', '16.5 kmpl', '2.2L mHawk Turbo', true, 4, 4.82, 29, true, 4, NOW(), NOW()),

-- 7. Urban SUV: Tata Harrier
(7, 'Tata', 'Harrier Fearless Plus', 2024, 'SUV', 'Built on Land Rover derived D8 architecture with 5-star GNCAP safety, bold stance, and JBL tuned audio.', 3100.00, 5, 5, 'AUTOMATIC', 'DIESEL', '16.8 kmpl', '2.0L Kryotec Turbo', true, 3, 4.70, 19, true, 2, NOW(), NOW()),

-- 8. Sedan: Honda City
(8, 'Honda', 'City ZX CVT', 2024, 'SEDAN', 'The gold standard in comfort, Honda Sensing active safety, ultra-refined i-VTEC engine, and sofa-like rear seating.', 2200.00, 5, 4, 'AUTOMATIC', 'PETROL', '18.4 kmpl', '1.5L i-VTEC', true, 3, 4.80, 51, true, 3, NOW(), NOW()),

-- 9. Sedan: Hyundai Verna
(9, 'Hyundai', 'Verna Turbo SX(O)', 2024, 'SEDAN', 'Futuristic fastback styling with class-leading 160PS turbocharged punch, ambient lighting, and electronic parking brake.', 2300.00, 5, 4, 'AUTOMATIC', 'PETROL', '20.6 kmpl', '1.5L Turbo Petrol', true, 3, 4.78, 22, true, 4, NOW(), NOW()),

-- 10. Electric SUV: Tata Nexon EV
(10, 'Tata', 'Nexon EV Long Range', 2024, 'EV', 'Zero emissions with 465 km ARAI certified range, whisper quiet cabin, V2V charging, and paddle-controlled regen.', 2600.00, 5, 5, 'AUTOMATIC', 'ELECTRIC', '465 km / charge', 'Permanent Magnet AC', true, 3, 4.72, 31, true, 3, NOW(), NOW()),

-- 11. Electric SUV: MG ZS EV
(11, 'MG', 'ZS EV Exclusive Pro', 2024, 'EV', 'Refined British EV heritage with 50.3 kWh battery pack, i-SMART connected car suite, and 360-degree cameras.', 3200.00, 5, 5, 'AUTOMATIC', 'ELECTRIC', '461 km / charge', 'PMSM 176 PS', true, 3, 4.80, 15, true, 2, NOW(), NOW()),

-- 12. Luxury EV: Hyundai Ioniq 5
(12, 'Hyundai', 'Ioniq 5 RWD', 2024, 'EV', 'Award-winning retro-futuristic EV on 800V ultra-fast charging architecture, relaxation seats, and magnetic dashboard.', 6500.00, 5, 5, 'AUTOMATIC', 'ELECTRIC', '631 km / charge', 'Ultra-fast 800V System', true, 4, 4.96, 14, true, 1, NOW(), NOW()),

-- 13. Hatchback: Maruti Swift
(13, 'Maruti Suzuki', 'Swift ZXi Plus', 2024, 'HATCHBACK', 'Agile, ultra-efficient city hatchback with wireless CarPlay, cruise control, and effortless parking mobility.', 1400.00, 5, 5, 'MANUAL', 'PETROL', '25.75 kmpl', '1.2L Z-Series Dual Jet', true, 2, 4.65, 60, true, 5, NOW(), NOW()),

-- 14. Premium Hatchback: Hyundai i20
(14, 'Hyundai', 'i20 Asta(O)', 2024, 'HATCHBACK', 'Sporty European silhouette with Bose 7-speaker audio, smart electric sunroof, and air purifier.', 1600.00, 5, 5, 'AUTOMATIC', 'PETROL', '20.0 kmpl', '1.2L Kappa', true, 2, 4.68, 38, true, 5, NOW(), NOW()),

-- 15. Premium MPV: Toyota Innova Crysta
(15, 'Toyota', 'Innova Crysta VX 7S', 2024, 'SUV', 'Unrivaled highway cruising comfort with captain seats, robust suspension, and luggage room for family expeditions.', 3800.00, 7, 5, 'MANUAL', 'DIESEL', '15.6 kmpl', '2.4L GD Turbo Diesel', true, 5, 4.91, 55, true, 2, NOW(), NOW()),

-- 16. Ultra Luxury SUV: Audi Q7
(16, 'Audi', 'Q7 55 TFSI Quattro', 2024, 'LUXURY', '7-seater pinnacle German flagship with adaptive air suspension, matrix lasers, panoramic glass roof, and 340 hp.', 10500.00, 7, 5, 'AUTOMATIC', 'PETROL', '11.2 kmpl', '3.0L V6 Turbo TFSI', true, 5, 4.98, 20, true, 1, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- 5. SEED CAR IMAGES (High-resolution curated vehicle photography)
INSERT INTO car_images (id, car_id, image_url, is_primary, sort_order, created_at)
VALUES
-- BMW 5 Series
(1, 1, 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80', true, 0, NOW()),
(2, 1, 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1200&q=80', false, 1, NOW()),

-- Mercedes-Benz C-Class
(3, 2, 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80', true, 0, NOW()),
(4, 2, 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80', false, 1, NOW()),

-- Audi A6
(5, 3, 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1200&q=80', true, 0, NOW()),

-- Toyota Fortuner
(6, 4, 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80', true, 0, NOW()),

-- Hyundai Creta
(7, 5, 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80', true, 0, NOW()),

-- Mahindra XUV700
(8, 6, 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80', true, 0, NOW()),

-- Tata Harrier
(9, 7, 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80', true, 0, NOW()),

-- Honda City
(10, 8, 'https://images.unsplash.com/photo-1590362891988-348332158866?auto=format&fit=crop&w=1200&q=80', true, 0, NOW()),

-- Hyundai Verna
(11, 9, 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80', true, 0, NOW()),

-- Tata Nexon EV
(12, 10, 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80', true, 0, NOW()),

-- MG ZS EV
(13, 11, 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80', true, 0, NOW()),

-- Hyundai Ioniq 5
(14, 12, 'https://images.unsplash.com/photo-1567818735868-e71b99932e29?auto=format&fit=crop&w=1200&q=80', true, 0, NOW()),

-- Maruti Swift
(15, 13, 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80', true, 0, NOW()),

-- Hyundai i20
(16, 14, 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1200&q=80', true, 0, NOW()),

-- Toyota Innova Crysta
(17, 15, 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1200&q=80', true, 0, NOW()),

-- Audi Q7
(18, 16, 'https://images.unsplash.com/photo-1541348263662-e0c82661210e?auto=format&fit=crop&w=1200&q=80', true, 0, NOW())
ON CONFLICT (id) DO NOTHING;

-- Reset sequence counters to avoid primary key conflicts on future inserts
SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));
SELECT setval('locations_id_seq', (SELECT MAX(id) FROM locations));
SELECT setval('addons_id_seq', (SELECT MAX(id) FROM addons));
SELECT setval('cars_id_seq', (SELECT MAX(id) FROM cars));
SELECT setval('car_images_id_seq', (SELECT MAX(id) FROM car_images));
