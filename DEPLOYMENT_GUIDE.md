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
- **Google**: Places API (address autocomplete)
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
-- Users table
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR UNIQUE NOT NULL,
  name VARCHAR NOT NULL,
  phone VARCHAR,
  user_type VARCHAR CHECK (user_type IN ('customer', 'driver')) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Delivery orders table
CREATE TABLE delivery_orders (
  id VARCHAR PRIMARY KEY,
  customer_id UUID REFERENCES users(id),
  driver_id UUID REFERENCES users(id),
  pickup_address TEXT NOT NULL,
  delivery_address TEXT NOT NULL,
  package_size VARCHAR CHECK (package_size IN ('small', 'medium', 'large')),
  weight DECIMAL,
  price DECIMAL NOT NULL,
  status VARCHAR CHECK (status IN ('pending', 'confirmed', 'picked_up', 'in_transit', 'delivered', 'cancelled')) DEFAULT 'pending',
  estimated_delivery TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Driver locations table
CREATE TABLE driver_locations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  driver_id UUID REFERENCES users(id),
  latitude DECIMAL NOT NULL,
  longitude DECIMAL NOT NULL,
  is_online BOOLEAN DEFAULT false,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Payment records table
CREATE TABLE payments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id VARCHAR REFERENCES delivery_orders(id),
  stripe_payment_intent_id VARCHAR,
  amount DECIMAL NOT NULL,
  status VARCHAR CHECK (status IN ('pending', 'succeeded', 'failed')) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Reviews and ratings table
CREATE TABLE reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id VARCHAR REFERENCES delivery_orders(id),
  customer_id UUID REFERENCES users(id),
  driver_id UUID REFERENCES users(id),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP DEFAULT NOW()
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
-- Function to calculate delivery price
CREATE OR REPLACE FUNCTION calculate_delivery_price(
  package_size VARCHAR,
  weight DECIMAL,
  distance DECIMAL
) RETURNS DECIMAL AS $$
BEGIN
  DECLARE
    base_price DECIMAL := 5.00;
    size_fee DECIMAL := 0;
    weight_fee DECIMAL := 0;
    distance_fee DECIMAL;
  BEGIN
    -- Size-based pricing
    CASE package_size
      WHEN 'small' THEN size_fee := 3.00;
      WHEN 'medium' THEN size_fee := 8.00;
      WHEN 'large' THEN size_fee := 15.00;
    END CASE;

    -- Weight-based pricing
    IF weight > 5 THEN
      weight_fee := (weight - 5) * 2.00;
    END IF;

    -- Distance-based pricing
    distance_fee := distance * 1.50;

    RETURN base_price + size_fee + weight_fee + distance_fee;
  END;
END;
$$ LANGUAGE plpgsql;
```

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
```

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

### 3. Google Places API Integration

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
- [ ] Admin dashboard access
- [ ] Backup procedures
- [ ] Incident response plan
- [ ] Documentation updated

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
