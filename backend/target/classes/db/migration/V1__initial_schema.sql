-- =============================================================================
-- Flyway Migration: V1__initial_schema.sql
-- Description: Core Schema for DriveEase Car Rental & Booking Platform
-- =============================================================================

-- 1. USERS TABLE
CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(120) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(60) NOT NULL,
    last_name VARCHAR(60) NOT NULL,
    phone VARCHAR(20),
    driving_license VARCHAR(50),
    role VARCHAR(20) NOT NULL DEFAULT 'ROLE_USER',
    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);

-- 2. REFRESH TOKENS TABLE
CREATE TABLE IF NOT EXISTS refresh_tokens (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token VARCHAR(255) NOT NULL UNIQUE,
    expiry_date TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_refresh_tokens_token ON refresh_tokens(token);
CREATE INDEX idx_refresh_tokens_user ON refresh_tokens(user_id);

-- 3. LOCATIONS TABLE
CREATE TABLE IF NOT EXISTS locations (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    city VARCHAR(60) NOT NULL,
    state VARCHAR(60),
    address TEXT NOT NULL,
    phone VARCHAR(20),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_locations_city ON locations(city);
CREATE INDEX idx_locations_active ON locations(is_active);

-- 4. CARS TABLE
CREATE TABLE IF NOT EXISTS cars (
    id BIGSERIAL PRIMARY KEY,
    brand VARCHAR(60) NOT NULL,
    model VARCHAR(60) NOT NULL,
    year INTEGER NOT NULL,
    category VARCHAR(40) NOT NULL,
    description TEXT,
    price_per_day NUMERIC(10, 2) NOT NULL,
    seats INTEGER NOT NULL DEFAULT 5,
    doors INTEGER NOT NULL DEFAULT 4,
    transmission VARCHAR(20) NOT NULL,
    fuel_type VARCHAR(20) NOT NULL,
    mileage VARCHAR(30),
    engine VARCHAR(50),
    air_conditioned BOOLEAN NOT NULL DEFAULT TRUE,
    luggage_capacity INTEGER NOT NULL DEFAULT 2,
    rating_avg NUMERIC(3, 2) NOT NULL DEFAULT 0.00,
    review_count INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    location_id BIGINT NOT NULL REFERENCES locations(id),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_cars_brand_model ON cars(brand, model);
CREATE INDEX idx_cars_category ON cars(category);
CREATE INDEX idx_cars_price ON cars(price_per_day);
CREATE INDEX idx_cars_location_active ON cars(location_id, is_active);

-- 5. CAR IMAGES TABLE
CREATE TABLE IF NOT EXISTS car_images (
    id BIGSERIAL PRIMARY KEY,
    car_id BIGINT NOT NULL REFERENCES cars(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    is_primary BOOLEAN NOT NULL DEFAULT FALSE,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_car_images_car ON car_images(car_id);

-- 6. ADDONS TABLE
CREATE TABLE IF NOT EXISTS addons (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(80) NOT NULL,
    description TEXT,
    price_per_day NUMERIC(10, 2) NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 7. BOOKINGS TABLE
CREATE TABLE IF NOT EXISTS bookings (
    id BIGSERIAL PRIMARY KEY,
    booking_number VARCHAR(32) NOT NULL UNIQUE,
    user_id BIGINT NOT NULL REFERENCES users(id),
    car_id BIGINT NOT NULL REFERENCES cars(id),
    pickup_location_id BIGINT NOT NULL REFERENCES locations(id),
    dropoff_location_id BIGINT NOT NULL REFERENCES locations(id),
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE NOT NULL,
    rental_days INTEGER NOT NULL,
    base_price_per_day NUMERIC(10, 2) NOT NULL,
    base_amount NUMERIC(10, 2) NOT NULL,
    addon_amount NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    tax_amount NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    total_amount NUMERIC(10, 2) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    customer_notes TEXT,
    cancellation_reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Composite Index for Fast Availability Overlap Query
CREATE INDEX idx_bookings_overlap_check ON bookings(car_id, status, start_time, end_time);
CREATE INDEX idx_bookings_user ON bookings(user_id);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_created ON bookings(created_at DESC);

-- 8. BOOKING ADDONS TABLE
CREATE TABLE IF NOT EXISTS booking_addons (
    id BIGSERIAL PRIMARY KEY,
    booking_id BIGINT NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
    addon_id BIGINT NOT NULL REFERENCES addons(id),
    price_at_booking NUMERIC(10, 2) NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_booking_addons_booking ON booking_addons(booking_id);

-- 9. PAYMENTS TABLE
CREATE TABLE IF NOT EXISTS payments (
    id BIGSERIAL PRIMARY KEY,
    booking_id BIGINT NOT NULL UNIQUE REFERENCES bookings(id) ON DELETE CASCADE,
    transaction_id VARCHAR(100) NOT NULL UNIQUE,
    amount NUMERIC(10, 2) NOT NULL,
    payment_method VARCHAR(30) NOT NULL,
    payment_status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    payment_gateway_response TEXT,
    payment_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_payments_booking ON payments(booking_id);
CREATE INDEX idx_payments_status ON payments(payment_status);

-- 10. REVIEWS TABLE
CREATE TABLE IF NOT EXISTS reviews (
    id BIGSERIAL PRIMARY KEY,
    car_id BIGINT NOT NULL REFERENCES cars(id) ON DELETE CASCADE,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    booking_id BIGINT NOT NULL UNIQUE REFERENCES bookings(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT NOT NULL,
    is_approved BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_reviews_car ON reviews(car_id);
CREATE INDEX idx_reviews_user ON reviews(user_id);

-- 11. WISHLISTS TABLE
CREATE TABLE IF NOT EXISTS wishlists (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    car_id BIGINT NOT NULL REFERENCES cars(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_user_car_wishlist UNIQUE (user_id, car_id)
);

CREATE INDEX idx_wishlists_user ON wishlists(user_id);
