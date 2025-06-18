# 🚀 EcoQuick Production Deployment Guide

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Environment Setup](#environment-setup)
3. [Backend Integration](#backend-integration)
4. [Service Integrations](#service-integrations)
5. [Testing Guide](#testing-guide)
6. [Deployment Steps](#deployment-steps)
7. [Production Checklist](#production-checklist)
8. [Monitoring & Maintenance](#monitoring--maintenance)

---

## 📋 Prerequisites

### System Requirements

- **Node.js**: v18 or higher
- **npm**: v8 or higher (or yarn/pnpm)
- **Git**: Latest version
- **Domain**: Custom domain for production

### Required Service Accounts

- **Supabase**: Database and authentication
- **Stripe**: Payment processing
- **Mapbox**: Maps and geocoding
- **Google**: Places API (address autocomplete) and Maps API for driver navigation
- **Vercel/Netlify**: Hosting platform
- **Email Service**: SendGrid/AWS SES for notifications

---

## 🛠 Environment Setup

### 1. Clone and Install Dependencies

```bash
# Clone the repository
git clone <your-repo-url>
cd ecoquick-app

# Install dependencies
npm install

# Run development server
npm run dev

# Type check
npm run typecheck
```

### 2. Environment Variables

Create `.env.local` file in the root directory:

```env
# Database & Authentication
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Payment Processing
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Maps & Location Services
VITE_MAPBOX_ACCESS_TOKEN=pk.your_mapbox_token
VITE_GOOGLE_PLACES_API_KEY=your_google_places_key

# Email & Notifications
SENDGRID_API_KEY=your_sendgrid_key
FROM_EMAIL=noreply@ecoquick.com

# App Configuration
VITE_APP_URL=https://your-domain.com
NODE_ENV=production
```

---

## 🗄 Backend Integration

### 1. Supabase Database Setup

#### A. Create Tables

```sql
-- Users table (Enhanced)
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR UNIQUE NOT NULL,
  first_name VARCHAR NOT NULL,
  last_name VARCHAR NOT NULL,
  phone VARCHAR,
  date_of_birth DATE,
  address TEXT,
  city VARCHAR,
  state_county VARCHAR,
  postal_code VARCHAR,
  user_type VARCHAR CHECK (user_type IN ('customer', 'driver', 'admin')) NOT NULL,
  is_active BOOLEAN DEFAULT true,
  email_verified BOOLEAN DEFAULT false,
  phone_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Driver profiles table (New)
CREATE TABLE driver_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  license_number VARCHAR,
  vehicle_type VARCHAR CHECK (vehicle_type IN ('bicycle', 'electric_scooter', 'electric_car', 'hybrid', 'electric_motorcycle', 'car', 'motorcycle')),
  vehicle_make VARCHAR,
  vehicle_model VARCHAR,
  vehicle_year INTEGER,
  vehicle_color VARCHAR,
  license_plate VARCHAR,
  insurance_company VARCHAR,
  insurance_policy_number VARCHAR,
  background_check_status VARCHAR CHECK (background_check_status IN ('pending', 'approved', 'rejected', 'expired')) DEFAULT 'pending',
  background_check_date TIMESTAMP,
  green_rider_certified BOOLEAN DEFAULT false,
  certification_date TIMESTAMP,
  certification_expiry TIMESTAMP,
  is_approved BOOLEAN DEFAULT false,
  approval_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Service areas table (New)
CREATE TABLE service_areas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR NOT NULL,
  center_latitude DECIMAL(10, 8) NOT NULL,
  center_longitude DECIMAL(11, 8) NOT NULL,
  radius_miles DECIMAL(4, 2) NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Supported postcodes table (New)
CREATE TABLE supported_postcodes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  service_area_id UUID REFERENCES service_areas(id),
  postcode_area VARCHAR(4) NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Product categories table (New)
CREATE TABLE product_categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category_key VARCHAR UNIQUE NOT NULL,
  name VARCHAR NOT NULL,
  description TEXT,
  icon_emoji VARCHAR(10),
  base_price DECIMAL(6, 2) NOT NULL,
  premium_handling BOOLEAN DEFAULT false,
  premium_amount DECIMAL(6, 2) DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Delivery orders table (Enhanced)
CREATE TABLE delivery_orders (
  id VARCHAR PRIMARY KEY,
  customer_id UUID REFERENCES users(id),
  driver_id UUID REFERENCES users(id),
  pickup_address TEXT NOT NULL,
  pickup_postcode VARCHAR,
  pickup_latitude DECIMAL(10, 8),
  pickup_longitude DECIMAL(11, 8),
  delivery_address TEXT NOT NULL,
  delivery_postcode VARCHAR,
  delivery_latitude DECIMAL(10, 8),
  delivery_longitude DECIMAL(11, 8),
  product_category VARCHAR REFERENCES product_categories(category_key),
  weight DECIMAL(6, 2),
  driver_instructions TEXT,
  scheduling_type VARCHAR CHECK (scheduling_type IN ('instant', 'scheduled')) DEFAULT 'instant',
  pickup_date DATE,
  pickup_time TIME,
  dropoff_date DATE,
  dropoff_time TIME,
  base_price DECIMAL(8, 2) NOT NULL,
  category_fee DECIMAL(6, 2) DEFAULT 0,
  weight_fee DECIMAL(6, 2) DEFAULT 0,
  distance_fee DECIMAL(6, 2) DEFAULT 0,
  premium_fee DECIMAL(6, 2) DEFAULT 0,
  scheduling_fee DECIMAL(6, 2) DEFAULT 0,
  discount_amount DECIMAL(6, 2) DEFAULT 0,
  coupon_code VARCHAR,
  total_price DECIMAL(8, 2) NOT NULL,
  distance_miles DECIMAL(6, 2),
  status VARCHAR CHECK (status IN ('pending', 'confirmed', 'picked_up', 'in_transit', 'delivered', 'cancelled')) DEFAULT 'pending',
  estimated_pickup TIMESTAMP,
  estimated_delivery TIMESTAMP,
  actual_pickup TIMESTAMP,
  actual_delivery TIMESTAMP,
  cancellation_reason TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Pricing rules table (New)
CREATE TABLE pricing_rules (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  rule_key VARCHAR UNIQUE NOT NULL,
  name VARCHAR NOT NULL,
  description TEXT,
  rule_type VARCHAR CHECK (rule_type IN ('fixed', 'per_mile', 'per_kg', 'percentage')) NOT NULL,
  value DECIMAL(8, 4) NOT NULL,
  is_active BOOLEAN DEFAULT true,
  applies_to VARCHAR, -- 'all', specific category, etc.
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Coupons table (New)
CREATE TABLE coupons (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  code VARCHAR UNIQUE NOT NULL,
  description TEXT,
  discount_type VARCHAR CHECK (discount_type IN ('percentage', 'fixed')) NOT NULL,
  discount_value DECIMAL(6, 2) NOT NULL,
  min_order_value DECIMAL(6, 2) DEFAULT 0,
  max_discount DECIMAL(6, 2),
  usage_limit INTEGER,
  used_count INTEGER DEFAULT 0,
  valid_from DATE,
  valid_to DATE,
  applicable_categories TEXT, -- JSON array or comma-separated
  is_active BOOLEAN DEFAULT true,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Coupon usage tracking table (New)
CREATE TABLE coupon_usage (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  coupon_id UUID REFERENCES coupons(id),
  order_id VARCHAR REFERENCES delivery_orders(id),
  user_id UUID REFERENCES users(id),
  discount_applied DECIMAL(6, 2),
  used_at TIMESTAMP DEFAULT NOW()
);

-- Driver locations table (Enhanced)
CREATE TABLE driver_locations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  driver_id UUID REFERENCES users(id),
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  is_online BOOLEAN DEFAULT false,
  last_ping TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Driver certifications table (New)
CREATE TABLE driver_certifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  driver_id UUID REFERENCES users(id),
  certification_type VARCHAR CHECK (certification_type IN ('environmental_training', 'safety_training', 'vehicle_inspection', 'green_transport_commitment')) NOT NULL,
  status VARCHAR CHECK (status IN ('pending', 'completed', 'expired')) DEFAULT 'pending',
  test_score INTEGER,
  passing_score INTEGER DEFAULT 80,
  completed_at TIMESTAMP,
  expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Background checks table (New)
CREATE TABLE background_checks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  driver_id UUID REFERENCES users(id),
  check_type VARCHAR CHECK (check_type IN ('criminal', 'driving', 'identity', 'employment')) NOT NULL,
  status VARCHAR CHECK (status IN ('pending', 'approved', 'rejected', 'expired')) DEFAULT 'pending',
  provider VARCHAR, -- Third-party service used
  external_reference VARCHAR, -- Provider's reference ID
  results JSONB, -- Detailed results
  completed_at TIMESTAMP,
  expires_at TIMESTAMP,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Payment records table (Enhanced)
CREATE TABLE payments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id VARCHAR REFERENCES delivery_orders(id),
  stripe_payment_intent_id VARCHAR,
  amount DECIMAL(8, 2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'GBP',
  payment_method VARCHAR,
  status VARCHAR CHECK (status IN ('pending', 'processing', 'succeeded', 'failed', 'cancelled', 'refunded')) DEFAULT 'pending',
  refund_amount DECIMAL(8, 2) DEFAULT 0,
  refund_reason TEXT,
  processor_fee DECIMAL(6, 2),
  net_amount DECIMAL(8, 2),
  processed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Reviews and ratings table (Enhanced)
CREATE TABLE reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id VARCHAR REFERENCES delivery_orders(id),
  customer_id UUID REFERENCES users(id),
  driver_id UUID REFERENCES users(id),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  delivery_rating INTEGER CHECK (delivery_rating >= 1 AND delivery_rating <= 5),
  communication_rating INTEGER CHECK (communication_rating >= 1 AND communication_rating <= 5),
  professionalism_rating INTEGER CHECK (professionalism_rating >= 1 AND professionalism_rating <= 5),
  would_recommend BOOLEAN,
  created_at TIMESTAMP DEFAULT NOW()
);

-- System health monitoring table (New)
CREATE TABLE system_health_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  service_name VARCHAR NOT NULL,
  status VARCHAR CHECK (status IN ('healthy', 'degraded', 'down')) NOT NULL,
  response_time_ms INTEGER,
  error_message TEXT,
  checked_at TIMESTAMP DEFAULT NOW()
);

-- Admin activity logs table (New)
CREATE TABLE admin_activity_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  admin_id UUID REFERENCES users(id),
  action_type VARCHAR NOT NULL, -- 'pricing_update', 'coupon_create', 'user_action', etc.
  target_type VARCHAR, -- 'user', 'order', 'coupon', 'pricing_rule'
  target_id VARCHAR,
  details JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Revenue analytics table (New)
CREATE TABLE revenue_analytics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL,
  total_orders INTEGER DEFAULT 0,
  completed_orders INTEGER DEFAULT 0,
  cancelled_orders INTEGER DEFAULT 0,
  total_revenue DECIMAL(10, 2) DEFAULT 0,
  gross_revenue DECIMAL(10, 2) DEFAULT 0,
  discount_amount DECIMAL(8, 2) DEFAULT 0,
  refund_amount DECIMAL(8, 2) DEFAULT 0,
  average_order_value DECIMAL(8, 2) DEFAULT 0,
  category_breakdown JSONB, -- Revenue by category
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(date)
);

-- Driver notifications table (New)
CREATE TABLE driver_notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  driver_id UUID REFERENCES users(id) ON DELETE CASCADE,
  notification_type VARCHAR CHECK (notification_type IN (
    'new_delivery_request', 'earnings_update', 'schedule_change',
    'system_announcement', 'training_reminder', 'weather_alert',
    'certification_expiry', 'payout_processed', 'rating_received'
  )) NOT NULL,
  title VARCHAR NOT NULL,
  message TEXT NOT NULL,
  priority VARCHAR CHECK (priority IN ('low', 'medium', 'high', 'urgent')) DEFAULT 'medium',
  is_read BOOLEAN DEFAULT false,
  order_id VARCHAR REFERENCES delivery_orders(id),
  metadata JSONB, -- Additional notification data
  expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Notification preferences table (New)
CREATE TABLE notification_preferences (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  user_type VARCHAR CHECK (user_type IN ('customer', 'driver')) NOT NULL,

  -- Driver notification preferences
  new_delivery_requests BOOLEAN DEFAULT true,
  earnings_updates BOOLEAN DEFAULT true,
  schedule_changes BOOLEAN DEFAULT true,
  system_announcements BOOLEAN DEFAULT true,
  training_reminders BOOLEAN DEFAULT true,
  weather_alerts BOOLEAN DEFAULT true,

  -- Customer notification preferences
  order_updates BOOLEAN DEFAULT true,
  driver_updates BOOLEAN DEFAULT true,
  promotions BOOLEAN DEFAULT false,

  -- Communication channels
  email_notifications BOOLEAN DEFAULT true,
  sms_notifications BOOLEAN DEFAULT true,
  push_notifications BOOLEAN DEFAULT true,
  in_app_notifications BOOLEAN DEFAULT true,

  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Driver working hours table (New)
CREATE TABLE driver_working_hours (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  driver_id UUID REFERENCES users(id) ON DELETE CASCADE,
  day_of_week INTEGER CHECK (day_of_week >= 0 AND day_of_week <= 6), -- 0 = Sunday, 6 = Saturday
  is_working BOOLEAN DEFAULT false,
  start_time TIME,
  end_time TIME,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(driver_id, day_of_week)
);
```

#### B. Set Up Row Level Security (RLS)

```sql
-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE delivery_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE driver_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Example RLS policies
CREATE POLICY "Users can view their own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own data" ON users
  FOR UPDATE USING (auth.uid() = id);
```

#### C. Database Functions

```sql
-- Function to calculate delivery price with new pricing structure
CREATE OR REPLACE FUNCTION calculate_delivery_price(
  product_category VARCHAR,
  weight DECIMAL DEFAULT NULL,
  distance DECIMAL DEFAULT 3.0,
  is_scheduled BOOLEAN DEFAULT FALSE
) RETURNS JSONB AS $$
DECLARE
  base_price DECIMAL := 6.00;
  category_fee DECIMAL := 0;
  weight_fee DECIMAL := 0;
  distance_fee DECIMAL := 0;
  premium_fee DECIMAL := 0;
  scheduling_fee DECIMAL := 0;
  total_price DECIMAL;
  pricing_breakdown JSONB;
BEGIN
  -- Get category-specific pricing
  SELECT base_price, premium_amount INTO category_fee, premium_fee
  FROM product_categories
  WHERE category_key = product_category AND is_active = true;

  IF category_fee IS NULL THEN
    category_fee := 9.00; -- Default for unknown categories
  END IF;

  -- Weight-based pricing (optional)
  IF weight IS NOT NULL AND weight > 2 THEN
    weight_fee := (weight - 2) * 1.50;
  END IF;

  -- Distance-based pricing
  distance_fee := distance * 0.80;

  -- Scheduling fee for non-instant delivery
  IF is_scheduled THEN
    scheduling_fee := 1.00;
  END IF;

  -- Calculate total
  total_price := base_price + category_fee + weight_fee + distance_fee + premium_fee + scheduling_fee;

  -- Create breakdown JSON
  pricing_breakdown := jsonb_build_object(
    'base_price', base_price,
    'category_fee', category_fee,
    'weight_fee', weight_fee,
    'distance_fee', distance_fee,
    'premium_fee', premium_fee,
    'scheduling_fee', scheduling_fee,
    'total_price', total_price
  );

  RETURN pricing_breakdown;
END;
$$ LANGUAGE plpgsql;

-- Function to validate service area
CREATE OR REPLACE FUNCTION validate_service_area(
  latitude DECIMAL,
  longitude DECIMAL
) RETURNS BOOLEAN AS $$
DECLARE
  is_valid BOOLEAN := FALSE;
  service_area RECORD;
  distance_miles DECIMAL;
BEGIN
  -- Check against active service areas
  FOR service_area IN
    SELECT center_latitude, center_longitude, radius_miles
    FROM service_areas
    WHERE is_active = true
  LOOP
    -- Calculate distance using Haversine formula (simplified)
    distance_miles := 3959 * acos(
      cos(radians(service_area.center_latitude)) *
      cos(radians(latitude)) *
      cos(radians(longitude) - radians(service_area.center_longitude)) +
      sin(radians(service_area.center_latitude)) *
      sin(radians(latitude))
    );

    IF distance_miles <= service_area.radius_miles THEN
      is_valid := TRUE;
      EXIT;
    END IF;
  END LOOP;

  RETURN is_valid;
END;
$$ LANGUAGE plpgsql;

-- Function to apply coupon discount
CREATE OR REPLACE FUNCTION apply_coupon_discount(
  coupon_code_input VARCHAR,
  order_total DECIMAL,
  product_category VARCHAR DEFAULT NULL,
  user_id_input UUID DEFAULT NULL
) RETURNS JSONB AS $$
DECLARE
  coupon_record RECORD;
  discount_amount DECIMAL := 0;
  is_valid BOOLEAN := FALSE;
  error_message TEXT := '';
  result JSONB;
BEGIN
  -- Get coupon details
  SELECT * INTO coupon_record
  FROM coupons
  WHERE code = coupon_code_input
    AND is_active = true
    AND (valid_from IS NULL OR valid_from <= CURRENT_DATE)
    AND (valid_to IS NULL OR valid_to >= CURRENT_DATE);

  IF NOT FOUND THEN
    error_message := 'Invalid or expired coupon code';
  ELSIF coupon_record.usage_limit IS NOT NULL AND coupon_record.used_count >= coupon_record.usage_limit THEN
    error_message := 'Coupon usage limit exceeded';
  ELSIF order_total < coupon_record.min_order_value THEN
    error_message := 'Order total below minimum required for this coupon';
  ELSE
    -- Check category restrictions
    IF coupon_record.applicable_categories != 'all'
       AND product_category IS NOT NULL
       AND coupon_record.applicable_categories NOT LIKE '%' || product_category || '%' THEN
      error_message := 'Coupon not applicable to this product category';
    ELSE
      is_valid := TRUE;

      -- Calculate discount
      IF coupon_record.discount_type = 'percentage' THEN
        discount_amount := order_total * (coupon_record.discount_value / 100);
        IF coupon_record.max_discount IS NOT NULL THEN
          discount_amount := LEAST(discount_amount, coupon_record.max_discount);
        END IF;
      ELSE
        discount_amount := coupon_record.discount_value;
      END IF;

      -- Ensure discount doesn't exceed order total
      discount_amount := LEAST(discount_amount, order_total);
    END IF;
  END IF;

  result := jsonb_build_object(
    'is_valid', is_valid,
    'discount_amount', discount_amount,
    'error_message', error_message,
    'coupon_id', coupon_record.id
  );

  RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Function to update revenue analytics
CREATE OR REPLACE FUNCTION update_daily_revenue_analytics(
  analytics_date DATE DEFAULT CURRENT_DATE
) RETURNS VOID AS $$
DECLARE
  analytics_data RECORD;
BEGIN
  -- Calculate daily analytics
  SELECT
    COUNT(*) as total_orders,
    COUNT(*) FILTER (WHERE status = 'delivered') as completed_orders,
    COUNT(*) FILTER (WHERE status = 'cancelled') as cancelled_orders,
    COALESCE(SUM(total_price) FILTER (WHERE status = 'delivered'), 0) as total_revenue,
    COALESCE(SUM(total_price + discount_amount) FILTER (WHERE status = 'delivered'), 0) as gross_revenue,
    COALESCE(SUM(discount_amount) FILTER (WHERE status = 'delivered'), 0) as discount_amount,
    COALESCE(AVG(total_price) FILTER (WHERE status = 'delivered'), 0) as average_order_value
  INTO analytics_data
  FROM delivery_orders
  WHERE DATE(created_at) = analytics_date;

  -- Insert or update analytics
  INSERT INTO revenue_analytics (
    date, total_orders, completed_orders, cancelled_orders,
    total_revenue, gross_revenue, discount_amount, average_order_value
  ) VALUES (
    analytics_date, analytics_data.total_orders, analytics_data.completed_orders,
    analytics_data.cancelled_orders, analytics_data.total_revenue,
    analytics_data.gross_revenue, analytics_data.discount_amount,
    analytics_data.average_order_value
  )
  ON CONFLICT (date) DO UPDATE SET
    total_orders = EXCLUDED.total_orders,
    completed_orders = EXCLUDED.completed_orders,
    cancelled_orders = EXCLUDED.cancelled_orders,
    total_revenue = EXCLUDED.total_revenue,
    gross_revenue = EXCLUDED.gross_revenue,
    discount_amount = EXCLUDED.discount_amount,
    average_order_value = EXCLUDED.average_order_value;
END;
$$ LANGUAGE plpgsql;

-- Function to send driver notification
CREATE OR REPLACE FUNCTION send_driver_notification(
  driver_id_input UUID,
  notification_type_input VARCHAR,
  title_input VARCHAR,
  message_input TEXT,
  priority_input VARCHAR DEFAULT 'medium',
  order_id_input VARCHAR DEFAULT NULL,
  metadata_input JSONB DEFAULT NULL,
  expires_hours INTEGER DEFAULT NULL
) RETURNS UUID AS $$
DECLARE
  notification_id UUID;
  user_preferences RECORD;
  expires_timestamp TIMESTAMP;
BEGIN
  -- Check if driver has enabled this notification type
  SELECT * INTO user_preferences
  FROM notification_preferences
  WHERE user_id = driver_id_input;

  -- If no preferences found, create default preferences
  IF NOT FOUND THEN
    INSERT INTO notification_preferences (user_id, user_type)
    VALUES (driver_id_input, 'driver');
    user_preferences.new_delivery_requests := true;
    user_preferences.earnings_updates := true;
    user_preferences.schedule_changes := true;
    user_preferences.system_announcements := true;
    user_preferences.training_reminders := true;
    user_preferences.weather_alerts := true;
    user_preferences.in_app_notifications := true;
  END IF;

  -- Check if this notification type is enabled
  IF (notification_type_input = 'new_delivery_request' AND NOT user_preferences.new_delivery_requests) OR
     (notification_type_input = 'earnings_update' AND NOT user_preferences.earnings_updates) OR
     (notification_type_input = 'schedule_change' AND NOT user_preferences.schedule_changes) OR
     (notification_type_input = 'system_announcement' AND NOT user_preferences.system_announcements) OR
     (notification_type_input = 'training_reminder' AND NOT user_preferences.training_reminders) OR
     (notification_type_input = 'weather_alert' AND NOT user_preferences.weather_alerts) THEN
    RETURN NULL; -- User has disabled this notification type
  END IF;

  -- Calculate expiration timestamp
  IF expires_hours IS NOT NULL THEN
    expires_timestamp := NOW() + (expires_hours || ' hours')::INTERVAL;
  END IF;

  -- Insert notification
  INSERT INTO driver_notifications (
    driver_id, notification_type, title, message, priority,
    order_id, metadata, expires_at
  ) VALUES (
    driver_id_input, notification_type_input, title_input, message_input,
    priority_input, order_id_input, metadata_input, expires_timestamp
  ) RETURNING id INTO notification_id;

  RETURN notification_id;
END;
$$ LANGUAGE plpgsql;

-- Function to mark notifications as read
CREATE OR REPLACE FUNCTION mark_notifications_read(
  driver_id_input UUID,
  notification_ids UUID[] DEFAULT NULL
) RETURNS INTEGER AS $$
DECLARE
  updated_count INTEGER;
BEGIN
  IF notification_ids IS NULL THEN
    -- Mark all unread notifications as read for the driver
    UPDATE driver_notifications
    SET is_read = true
    WHERE driver_id = driver_id_input AND is_read = false;
    GET DIAGNOSTICS updated_count = ROW_COUNT;
  ELSE
    -- Mark specific notifications as read
    UPDATE driver_notifications
    SET is_read = true
    WHERE driver_id = driver_id_input
      AND id = ANY(notification_ids)
      AND is_read = false;
    GET DIAGNOSTICS updated_count = ROW_COUNT;
  END IF;

  RETURN updated_count;
END;
$$ LANGUAGE plpgsql;

-- Function to clean up expired notifications
CREATE OR REPLACE FUNCTION cleanup_expired_notifications() RETURNS INTEGER AS $$
DECLARE
  deleted_count INTEGER;
BEGIN
  DELETE FROM driver_notifications
  WHERE expires_at IS NOT NULL AND expires_at < NOW();

  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;
```

#### D. Initial Data Setup

```sql
-- Insert Kingston upon Thames service area
INSERT INTO service_areas (name, center_latitude, center_longitude, radius_miles)
VALUES ('Kingston upon Thames', 51.4085, -0.3064, 5.0);

-- Insert supported postcodes for Kingston area
INSERT INTO supported_postcodes (service_area_id, postcode_area)
SELECT
  (SELECT id FROM service_areas WHERE name = 'Kingston upon Thames'),
  unnest(ARRAY['KT1', 'KT2', 'KT3', 'KT4', 'KT5', 'KT6', 'KT7', 'KT8', 'KT9',
                'SW15', 'SW16', 'SW19', 'SW20', 'TW1', 'TW2', 'TW9', 'TW10',
                'TW11', 'TW12', 'CR0', 'CR4', 'CR5', 'SM1', 'SM2', 'SM3', 'SM4', 'SM5', 'SM6']);

-- Insert product categories
INSERT INTO product_categories (category_key, name, description, icon_emoji, base_price, premium_handling, premium_amount) VALUES
('documents', 'Documents & Papers', 'Legal documents, contracts, certificates, letters', '📄', 8.00, false, 0),
('electronics', 'Electronics & Gadgets', 'Phones, tablets, laptops, cameras, accessories', '📱', 12.00, true, 2.00),
('food', 'Food & Beverages', 'Restaurant orders, groceries, fresh produce', '🍔', 10.00, false, 0),
('clothing', 'Clothing & Fashion', 'Apparel, shoes, accessories, textiles', '👕', 9.00, false, 0),
('books', 'Books & Media', 'Books, DVDs, CDs, magazines, educational materials', '📚', 7.00, false, 0),
('gifts', 'Gifts & Flowers', 'Birthday gifts, flowers, greeting cards, presents', '🎁', 11.00, false, 0),
('medical', 'Medical & Health', 'Prescriptions, medical supplies, health products', '⚕️', 13.00, true, 2.00),
('household', 'Household Items', 'Small appliances, home decor, cleaning supplies', '🏠', 10.00, false, 0),
('other', 'Other Items', 'Miscellaneous items not listed above', '📦', 9.00, false, 0);

-- Insert default pricing rules
INSERT INTO pricing_rules (rule_key, name, description, rule_type, value, applies_to) VALUES
('base_delivery', 'Base Delivery Fee', 'Standard delivery fee for all orders', 'fixed', 6.00, 'all'),
('distance_rate', 'Distance Rate', 'Cost per mile within service area', 'per_mile', 0.80, 'all'),
('weight_premium', 'Weight Premium', 'Additional cost per kg over 2kg', 'per_kg', 1.50, 'all'),
('scheduled_delivery', 'Scheduled Delivery Fee', 'Additional fee for non-instant deliveries', 'fixed', 1.00, 'scheduled');

-- Insert sample coupons
INSERT INTO coupons (code, description, discount_type, discount_value, min_order_value, max_discount, usage_limit, valid_from, valid_to, applicable_categories) VALUES
('WELCOME10', 'Welcome discount for new customers', 'percentage', 10, 15, 5, 1000, '2024-01-01', '2024-12-31', 'all'),
('MEDICAL15', 'Discount on medical deliveries', 'percentage', 15, 10, 10, 500, '2024-01-01', '2024-06-30', 'medical'),
('STUDENT5', 'Student discount', 'fixed', 5, 20, 5, 2000, '2024-01-01', '2024-12-31', 'books,documents');

-- Create admin user (update with actual details)
INSERT INTO users (email, first_name, last_name, user_type, password_hash, is_active)
VALUES ('admin@ecoquick.com', 'Admin', 'User', 'admin', crypt('admin123', gen_salt('bf')), true);

-- Create demo admin user for development
INSERT INTO users (email, first_name, last_name, user_type, password_hash, is_active)
VALUES ('admin@demo.com', 'Admin', 'User', 'admin', crypt('admin123', gen_salt('bf')), true);

-- Insert default working hours for drivers (Monday to Sunday, 0=Sunday)
-- This would typically be done when a driver signs up
INSERT INTO driver_working_hours (driver_id, day_of_week, is_working, start_time, end_time)
SELECT
  (SELECT id FROM users WHERE email = 'sarah.thompson@ecoquick.com' LIMIT 1),
  generate_series(0, 6) AS day_of_week,
  CASE
    WHEN generate_series(0, 6) = 0 THEN false  -- Sunday
    WHEN generate_series(0, 6) = 6 THEN true   -- Saturday (partial)
    ELSE true                                   -- Monday-Friday
  END AS is_working,
  CASE
    WHEN generate_series(0, 6) = 0 THEN NULL   -- Sunday
    WHEN generate_series(0, 6) = 6 THEN '10:00'::TIME  -- Saturday
    ELSE '09:00'::TIME                          -- Monday-Friday
  END AS start_time,
  CASE
    WHEN generate_series(0, 6) = 0 THEN NULL   -- Sunday
    WHEN generate_series(0, 6) = 6 THEN '16:00'::TIME  -- Saturday
    ELSE '18:00'::TIME                          -- Monday-Friday
  END AS end_time;

-- Sample driver notification preferences
INSERT INTO notification_preferences (user_id, user_type, new_delivery_requests, earnings_updates, schedule_changes, system_announcements, training_reminders, weather_alerts)
SELECT id, 'driver', true, true, true, true, true, true
FROM users WHERE user_type = 'driver';

-- Sample customer notification preferences
INSERT INTO notification_preferences (user_id, user_type, order_updates, driver_updates, promotions)
SELECT id, 'customer', true, true, false
FROM users WHERE user_type = 'customer';
```

````

### 2. API Integration Points

#### A. Update Mock Data Files

Replace mock data in `src/lib/mockData.ts` with actual API calls:

```typescript
// src/lib/api.ts
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
);

export const api = {
  // Orders
  async createOrder(orderData: any) {
    const { data, error } = await supabase
      .from("delivery_orders")
      .insert(orderData)
      .select();
    return { data, error };
  },

  async getOrders(userId: string) {
    const { data, error } = await supabase
      .from("delivery_orders")
      .select("*")
      .eq("customer_id", userId);
    return { data, error };
  },

  // Driver functions
  async updateDriverLocation(driverId: string, lat: number, lng: number) {
    const { data, error } = await supabase.from("driver_locations").upsert({
      driver_id: driverId,
      latitude: lat,
      longitude: lng,
      updated_at: new Date().toISOString(),
    });
    return { data, error };
  },

  // Payments
  async createPaymentIntent(amount: number, orderId: string) {
    // Call your backend API to create Stripe payment intent
    const response = await fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount, orderId }),
    });
    return response.json();
  },
};
````

---

## 🔗 Service Integrations

### 1. Stripe Payment Setup

#### A. Backend Stripe Integration

```javascript
// api/create-payment-intent.js (Vercel function)
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { amount, orderId } = req.body;

      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Convert to cents
        currency: "usd",
        metadata: {
          orderId: orderId,
        },
      });

      res.status(200).json({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
```

#### B. Frontend Stripe Integration

```typescript
// src/lib/stripe.ts
import { loadStripe } from "@stripe/stripe-js";

export const stripe = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
```

### 2. Mapbox Integration

#### A. Map Component Setup

```typescript
// src/components/MapComponent.tsx - Replace mock with real Mapbox
import mapboxgl from 'mapbox-gl';
import { useEffect, useRef } from 'react';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

export const MapComponent = ({ locations, onLocationSelect }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-122.4194, 37.7749], // San Francisco
      zoom: 13
    });

    // Add markers for locations
    locations.forEach(location => {
      new mapboxgl.Marker()
        .setLngLat([location.lng, location.lat])
        .addTo(map.current);
    });
  }, [locations]);

  return <div ref={mapContainer} className="map-container" />;
};
```

### 3. Google Maps Integration

#### A. Driver Navigation Integration

The driver dashboard includes automatic Google Maps navigation when accepting deliveries:

```typescript
// src/pages/DriverDashboard.tsx - Driver Navigation
const handleAcceptDelivery = (deliveryId: string) => {
  const delivery = availableDeliveries.find((d) => d.id === deliveryId);

  if (delivery) {
    // Create Google Maps URL with navigation
    const pickupAddress = encodeURIComponent(delivery.pickupAddress);
    const deliveryAddress = encodeURIComponent(delivery.deliveryAddress);
    const googleMapsUrl = `https://www.google.com/maps/dir/${pickupAddress}/${deliveryAddress}`;

    // Open navigation in new tab
    window.open(googleMapsUrl, "_blank");

    // Update delivery status via API
    updateDeliveryStatus(deliveryId, "accepted");
  }
};
```

#### B. Quote Calculator Map Integration

The quote calculator now includes visual route display:

```typescript
// src/components/QuoteCalculator.tsx - Route Visualization
const updateMapLocations = () => {
  const locations = [];
  if (pickupAddress) {
    locations.push(geocodeAddress(pickupAddress, 'pickup'));
  }
  if (deliveryAddress) {
    locations.push(geocodeAddress(deliveryAddress, 'delivery'));
  }
  setMapLocations(locations);
};

// Render map component with route
{mapLocations.length > 0 && (
  <MapComponent
    locations={mapLocations}
    showRoute={mapLocations.length === 2}
    className="h-64"
  />
)}
```

### 4. Google Places API Integration

#### A. Address Autocomplete

```typescript
// src/lib/places.ts
export const getPlacePredictions = async (input: string) => {
  const response = await fetch(
    `/api/places/autocomplete?input=${encodeURIComponent(input)}`,
  );
  return response.json();
};

// api/places/autocomplete.js
export default async function handler(req, res) {
  const { input } = req.query;

  const response = await fetch(
    `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=${process.env.VITE_GOOGLE_PLACES_API_KEY}`,
  );

  const data = await response.json();
  res.status(200).json(data);
}
```

---

## 🧪 Testing Guide

### 1. Manual Testing Checklist

#### **User Registration & Authentication**

- [ ] Customer signup with email/password
- [ ] Driver signup with additional verification
- [ ] Login/logout functionality
- [ ] Password reset flow
- [ ] Demo account access

#### **Customer Flow Testing**

- [ ] Homepage quote calculator
- [ ] Address autocomplete functionality
- [ ] Package size and weight selection
- [ ] Price calculation accuracy
- [ ] Checkout process completion
- [ ] Payment processing (use Stripe test cards)
- [ ] Order confirmation display
- [ ] Order tracking functionality
- [ ] Customer dashboard navigation
- [ ] Order history viewing
- [ ] Rating system after delivery

#### **Driver Flow Testing**

- [ ] Driver profile setup
- [ ] Vehicle information entry
- [ ] Document upload process
- [ ] Dashboard online/offline toggle
- [ ] Available delivery requests display
- [ ] Order acceptance/rejection
- [ ] Delivery status updates
- [ ] Earnings tracking
- [ ] Navigation integration

#### **Admin Features Testing**

- [ ] Admin dashboard access
- [ ] System health monitoring
- [ ] User management overview
- [ ] Revenue tracking
- [ ] Order management

### 2. Test Payment Cards (Stripe)

```
Successful Payment: 4242 4242 4242 4242
Declined Payment: 4000 0000 0000 0002
Insufficient Funds: 4000 0000 0000 9995
Expired Card: 4000 0000 0000 0069
```

### 3. Browser Testing

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile browsers (iOS Safari, Chrome Mobile)

### 4. Device Testing

- [ ] Desktop (1920x1080, 1366x768)
- [ ] Tablet (iPad, Android tablets)
- [ ] Mobile (iPhone, Android phones)

#### **Admin Panel Testing**

- [ ] Admin dashboard access via `/admin` route
- [ ] System health monitoring display
- [ ] Revenue analytics and reporting
- [ ] Pricing rule management (view, edit, toggle)
- [ ] Coupon creation and management
- [ ] Order overview and filtering
- [ ] Real-time stats updates
- [ ] Export functionality testing

### 5. Performance Testing

```bash
# Lighthouse audit
npm install -g lighthouse
lighthouse https://your-domain.com --output html

# Load testing
npm install -g artillery
artillery quick --count 100 --num 10 https://your-domain.com
```

---

## 🚀 Deployment Steps

### 1. Vercel Deployment

#### A. Connect Repository

1. Push code to GitHub repository
2. Import project in Vercel dashboard
3. Configure environment variables
4. Deploy

#### B. Vercel Configuration

```json
// vercel.json
{
  "build": {
    "env": {
      "NODE_ENV": "production"
    }
  },
  "functions": {
    "app/api/**": {
      "runtime": "nodejs18.x"
    }
  },
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/api/$1"
    }
  ]
}
```

### 2. Domain Setup

1. Configure custom domain in Vercel
2. Set up SSL certificate (automatic with Vercel)
3. Configure DNS records

### 3. Environment Variables Setup

Add all environment variables in Vercel dashboard under Settings > Environment Variables.

---

## ✅ Production Checklist

### **Security**

- [ ] Environment variables properly configured
- [ ] API keys secured and not exposed to frontend
- [ ] HTTPS enabled
- [ ] CORS properly configured
- [ ] Database RLS policies implemented
- [ ] Input validation on all forms
- [ ] File upload restrictions

### **Performance**

- [ ] Image optimization
- [ ] Code splitting implemented
- [ ] Bundle size optimized
- [ ] CDN configured for static assets
- [ ] Database indexes created
- [ ] API response caching

### **Monitoring**

- [ ] Error tracking (Sentry)
- [ ] Analytics (Google Analytics)
- [ ] Uptime monitoring
- [ ] Performance monitoring
- [ ] Database monitoring

### **Legal & Compliance**

- [ ] Privacy policy implemented
- [ ] Terms of service
- [ ] Cookie consent
- [ ] GDPR compliance (if applicable)
- [ ] Business license and insurance

### **Operational**

- [ ] Customer support system
- [ ] Admin dashboard access configured (`/admin` route)
- [ ] Admin user accounts created in database
- [ ] Pricing rules configured and tested
- [ ] Coupon system tested and validated
- [ ] Revenue analytics data pipeline
- [ ] System monitoring alerts configured
- [ ] Backup procedures
- [ ] Incident response plan
- [ ] Documentation updated

### **Admin Panel Configuration**

#### **Authentication Setup**

- [ ] Production admin user created: `INSERT INTO users (email, first_name, last_name, user_type, password_hash, is_active) VALUES ('admin@yourdomain.com', 'Admin', 'User', 'admin', crypt('your_secure_password', gen_salt('bf')), true);`
- [ ] Demo admin user configured: `admin@demo.com` with password `admin123`
- [ ] Admin authentication flow tested

#### **Admin Dashboard Features**

- [ ] Quick Actions functionality:
  - [ ] Analytics Report (switches to revenue tab)
  - [ ] User Management (placeholder notification)
  - [ ] Driver Approvals (shows pending applications)
  - [ ] Payment Issues (displays transaction problems)
  - [ ] Support Tickets (ticket queue access)
- [ ] Order management with functional buttons:
  - [ ] View Details (order information display)
  - [ ] Eye icon (real-time tracking)
  - [ ] Filter options (status, date, customer type, amount)

#### **Data Configuration**

- [ ] Initial pricing rules loaded
- [ ] Sample coupons configured
- [ ] Service area boundaries defined (Kingston upon Thames + 5-mile radius)
- [ ] Product categories populated (Documents, Electronics, Food, etc.)
- [ ] System health monitoring active
- [ ] Revenue analytics tracking enabled

---

## 📊 Monitoring & Maintenance

### 1. Essential Monitoring

```javascript
// Error tracking with Sentry
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  integrations: [new Sentry.BrowserTracing()],
  tracesSampleRate: 1.0,
});
```

### 2. Analytics Setup

```javascript
// Google Analytics
import { Analytics } from "@vercel/analytics/react";

export default function App() {
  return (
    <>
      <YourApp />
      <Analytics />
    </>
  );
}
```

### 3. Health Checks

```javascript
// api/health.js
export default function handler(req, res) {
  res.status(200).json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version,
  });
}
```

---

## 🆘 Common Issues & Solutions

### Issue: Stripe webhook verification fails

**Solution**: Ensure webhook endpoint URL is correct and secret is properly configured.

### Issue: Maps not loading

**Solution**: Check Mapbox access token and billing account status.

### Issue: Real-time updates not working

**Solution**: Verify Supabase realtime is enabled and RLS policies allow subscriptions.

### Issue: Performance issues

**Solution**: Implement proper code splitting and lazy loading.

---

## 📞 Support & Resources

- **Supabase Docs**: https://supabase.com/docs
- **Stripe Docs**: https://stripe.com/docs
- **Mapbox Docs**: https://docs.mapbox.com
- **Vercel Docs**: https://vercel.com/docs
- **React Docs**: https://react.dev

---

**This guide provides everything needed to deploy EcoQuick to production successfully!** 🎉

For additional support or questions, refer to the documentation of each service or create an issue in the project repository.
