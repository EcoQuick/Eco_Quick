# EcoQuick Delivery Platform

EcoQuick is a comprehensive eco-friendly delivery platform built with modern web technologies. The platform features geographic service limitations, driver certification systems, advanced product management, flexible scheduling, and robust admin controls.

## Core Framework & Technologies

- **React 18**: Modern React with hooks and concurrent features
- **React Router 6**: Powers the client-side routing
- **TypeScript**: Type safety is built-in by default
- **Vite**: Fast bundling and development server
- **Vitest**: For testing
- **TailwindCSS 3**: For styling and responsive design

## Routing System

The routing system is powered by React Router 7:

- `src/pages/Index.tsx` represents the home page.
- Routes are defined in `src/App.tsx` using the `react-router-dom` import
- Route files are located in the `src/pages/` directory

For example, routes can be defined with:

```typescript
import { BrowserRouter, Routes, Route } from "react-router-dom";

<Routes>
  <Route path="/" element={<Index />} />
  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
  <Route path="*" element={<NotFound />} />
</Routes>;
```

## Styling System

The styling system combines several technologies:

- **TailwindCSS 3**: Used as the primary styling method with utility classes
- **tailwind.config.ts**: Used to describe the design system tokens, update this file to change the whole look and feel
- **CSS Imports**: Base styles are imported in `src/index.css`
- **UI Component Library**: A comprehensive set of pre-styled UI components in `src/components/ui/` built with:
  - Radix UI: For accessible UI primitives
  - Class Variance Authority: For component variants
  - TailwindCSS: For styling
  - Lucide React: For icons
  - Lots of utility components, like carousels, calendar, alerts...
- **Class Name Utility**: The codebase includes a `cn` utility function from `@/lib/utils` that combines the functionality of `clsx` and `tailwind-merge`. Here's how it's typically used:

  ```typescript
  // A complex example showing the power of the cn utility
  function CustomComponent(props) {
    return (
      <div
        className={cn(
          // Base styles always applied
          "flex items-center rounded-md transition-all duration-200",

          // Object syntax for conditional classes - keys are class names, values are boolean expressions
          {
            // Size-based classes
            "text-xs p-1.5 gap-1": props.size === "sm",
            "text-base p-3.5 gap-3": props.size === "lg",

            // Width control
            "w-full": isFullWidth,
            "w-auto": !isFullWidth,
          },

          // Error state overrides other states
          props.hasError && "border-red-500 text-red-700 bg-red-50",

          // User-provided className comes last for highest precedence
          props.className
        )}
      />
    );
  }
  ```

The styling system supports dark mode through CSS variables and media queries.

## Testing

- **Unit Testing Utilities**: Utility functions such as `cn` in `src/lib/utils.ts` are covered by dedicated unit tests in `src/lib/utils.spec.ts`.
- **Testing Framework**: Tests are written using [Vitest](https://vitest.dev/), which provides a Jest-like API and fast performance for Vite projects.
- **Adding More Tests**: Place new utility tests in the same directory as the utility, using the `.spec.ts` suffix.

## Development Workflow

- **Development**: `npm run dev` - Starts the development server with HMR
- **Production Build**: `npm run build` - Creates optimized production build
- **Type Checking**: `npm run typecheck` - Validates TypeScript types
- **Run tests**: `npm test` - Run all .spec tests

## 🌟 Key Features

### 📍 Geographic Service Area Management

- **Kingston upon Thames Focus**: Service limited to Kingston upon Thames and 5-mile radius
- **UK Postcode Validation**: Supports KT, SW, TW postcode areas
- **Real-time Location Verification**: Address validation during quote and signup process
- **Service Area Boundaries**: Automatic geographic boundary enforcement

### 🚗 Driver Certification System

- **Background Verification**: Mandatory criminal background checks and document verification
- **Green Rider Certification**: Environmental training and safety protocol certification
- **Vehicle Standards**: Green transportation requirements (bicycles, electric vehicles preferred)
- **Progressive Certification**: Step-by-step driver onboarding with progress tracking

### 📦 Advanced Product Management

- **Product Categories**: 9 distinct categories with detailed descriptions and icons
  - Documents & Papers (📄)
  - Electronics & Gadgets (📱)
  - Food & Beverages (🍔)
  - Clothing & Fashion (👕)
  - Books & Media (📚)
  - Gifts & Flowers (🎁)
  - Medical & Health (⚕️)
  - Household Items (🏠)
  - Other Items (📦)
- **Category-specific Pricing**: Different base prices and handling requirements
- **Optional Weight System**: Weight-based pricing only when provided
- **Driver Instructions**: Dedicated field for special delivery instructions

### ⏰ Flexible Scheduling System

- **Instant Delivery**: Traditional fast delivery (30-60 minutes)
- **Scheduled Delivery**: Customer-controlled pickup and dropoff times
- **Advanced Scheduling**: Date and time picker with validation
- **Smart Pricing**: Additional fees for scheduled deliveries

### 💰 Dynamic Pricing Engine

- **Base Pricing**: £6.00 standard delivery fee
- **Category-based Pricing**: £7-£13 based on product type
- **Weight Pricing**: £1.50 per kg over 2kg (optional)
- **Distance Pricing**: £0.80 per mile within service area
- **Premium Handling**: Additional £2 for medical/electronics
- **Scheduling Fee**: £1.00 for non-instant delivery

### 🎟️ Coupon Management System

- **Flexible Discounts**: Percentage and fixed amount coupons
- **Advanced Targeting**: Category-specific and order value-based rules
- **Usage Controls**: Limits, expiration dates, and activation status
- **Real-time Validation**: Automatic coupon code verification

### 🛡️ Admin Dashboard & Controls

- **System Monitoring**: Real-time health checks and performance metrics
- **Revenue Analytics**: Daily, weekly, monthly revenue tracking with category breakdowns
- **Pricing Management**: Dynamic pricing rule configuration and updates
- **Coupon Administration**: Create, edit, and manage promotional campaigns
- **User Management**: Driver approval workflows and customer support tools

## Architecture Overview

The architecture follows a modern React application structure optimized for delivery services:

```
src/
├── components/
│   ├── layout/           # Layout components (Header, Footer, Layout)
│   ├── ui/              # Core UI component library (shadcn/ui)
│   ├── AddressAutocomplete.tsx    # UK address autocomplete with validation
│   ├── ServiceAreaValidator.tsx   # Geographic service area validation
│   ├── DriverCertification.tsx    # Driver certification workflow
│   ├── QuoteCalculator.tsx        # Enhanced quote calculator
│   └── MapComponent.tsx           # Map integration (Mapbox ready)
├── pages/
│   ├── Index.tsx                  # Landing page with quote calculator
│   ├── DriverSignup.tsx           # Multi-step driver registration
│   ├── DriverCertification.tsx    # Certification process page
│   ├── DriverDashboard.tsx        # Driver interface and job management
│   ├── CustomerDashboard.tsx      # Customer order tracking
│   ├── AdminDashboard.tsx         # Comprehensive admin controls
│   ├── Checkout.tsx              # Enhanced checkout with scheduling
│   └── ...                       # Other application pages
├── lib/
│   ├── geographicService.ts       # Service area validation utilities
│   ├── backgroundCheck.ts         # Driver certification logic
│   ├── mockData.ts               # Enhanced mock data for UK operations
│   └── utils.ts                  # Utility functions
└── hooks/
    ├── use-toast.ts              # Toast notification system
    └── use-mobile.tsx            # Mobile responsiveness
```

This structure provides comprehensive separation of concerns with specialized modules for delivery operations, geographic validation, and driver management.

## 🔧 Geographic Service Integration

### Service Area Configuration

The platform enforces service boundaries through multiple validation layers:

```typescript
// Service area validation example
import {
  validateServiceArea,
  KINGSTON_SERVICE_AREA,
} from "@/lib/geographicService";

const validation = validateServiceArea(address, coordinates);
if (!validation.isValid) {
  // Handle out-of-area requests
  showNotification(validation.message);
}
```

### UK Address Support

- **Postcode Validation**: Comprehensive UK postcode pattern matching
- **Geographic Boundaries**: Automatic distance and postcode area validation
- **Mock Geocoding**: Ready for Google Maps API integration
- **Real-time Feedback**: Instant validation during address entry

## 🎓 Driver Certification Workflow

### Certification Requirements

1. **Background Verification**: Criminal history and document checks
2. **Green Rider Training**: Environmental impact and safety protocols
3. **Vehicle Inspection**: Green transportation standards compliance
4. **Geographic Validation**: Residence within service area

### Certification Tracking

```typescript
// Example certification status checking
import { getDriverCertificationStatus } from "@/lib/backgroundCheck";

const status = getDriverCertificationStatus(backgroundCheck, greenRiderCert);
const nextSteps = getNextSteps(status);
```

## 📊 Admin Dashboard Features

### Revenue Analytics

- **Real-time Metrics**: Live revenue tracking with growth indicators
- **Category Breakdown**: Revenue analysis by product category
- **Time-based Reports**: Daily, weekly, monthly revenue comparison
- **Export Functionality**: Data export for external analysis

### Pricing Management

- **Dynamic Rules**: Real-time pricing rule updates
- **Category-specific Pricing**: Different rates for different product types
- **Weight-based Pricing**: Optional weight-based fee calculations
- **Premium Handling**: Special pricing for fragile/urgent items

### Coupon System

- **Flexible Discounts**: Percentage and fixed amount options
- **Advanced Targeting**: Category and order value restrictions
- **Usage Analytics**: Track coupon performance and utilization
- **Expiration Management**: Automatic validation and deactivation

### System Monitoring

- **Health Checks**: Real-time system component monitoring
- **Performance Metrics**: Response times, uptime, and success rates
- **Alert System**: Automated notifications for system issues
- **Service Status**: Visual indicators for all platform services

## 🚀 Enhanced User Experience

### Smart Quote Calculator

- **Product Categories**: Visual category selection with detailed descriptions
- **Optional Weight**: Flexible weight input for accurate pricing
- **Driver Instructions**: Special handling requirements input
- **Service Validation**: Real-time service area checking

### Flexible Scheduling

- **Instant Delivery**: Traditional fast delivery option
- **Custom Scheduling**: Date and time picker for pickup/dropoff
- **Schedule Validation**: Prevents past scheduling and conflicts
- **Visual Timeline**: Clear scheduling summary and confirmation

### Payment Integration

- **Geographic Pricing**: Location-aware pricing calculations
- **Coupon Integration**: Automatic discount application
- **Schedule-based Pricing**: Additional fees for scheduled deliveries
- **Tax Calculation**: UK VAT integration ready

## 💳 Pricing Structure

### Base Pricing Components

- **Delivery Fee**: £6.00 base charge
- **Category Fee**: £3-£5 based on product type
- **Distance Fee**: £0.80 per mile within service area
- **Weight Fee**: £1.50 per kg over 2kg threshold
- **Premium Handling**: £2.00 for medical/electronics
- **Scheduling Fee**: £1.00 for non-instant delivery

### Discount System

- **Welcome Discount**: 10% for new customers
- **Category Discounts**: Specialized discounts by product type
- **Volume Discounts**: Order value-based reductions
- **Student Discounts**: Educational institution support

## 🌱 Environmental Focus

### Green Transportation Standards

- **Preferred Vehicles**: Bicycles, electric scooters, electric cars
- **Conventional Vehicle Requirements**: 2015+ for fuel efficiency
- **Sustainability Metrics**: Carbon footprint tracking ready
- **Environmental Training**: Mandatory eco-friendly delivery practices

### Green Rider Certification

- **Environmental Training**: 30-minute course with 80% passing score
- **Safety Protocols**: 45-minute comprehensive safety training
- **Vehicle Inspection**: Green vehicle standards compliance
- **Sustainability Commitment**: Pledge to eco-friendly practices

## 📱 Driver-Specific Features

### Driver Settings & Profile Management

- **User Type Detection**: Automatic detection of driver vs customer accounts
- **Driver Information Tab**: Vehicle details, working hours, earnings summary
- **Enhanced Personal Info**: Additional fields for driver verification
- **Banking Integration**: Bank account details for payouts instead of payment cards
- **Working Hours Management**: Configurable schedule for each day of the week

### Driver Notification System

- **Specialized Notifications**: Driver-specific notification types and priorities
- **Real-time Alerts**: New delivery requests, earnings updates, schedule changes
- **Safety Notifications**: Weather alerts and safety reminders
- **System Announcements**: Platform updates and important notices
- **Certification Reminders**: Training renewal and compliance notifications
- **Payout Notifications**: Earnings transfers and payment confirmations

### Notification Categories for Drivers

```typescript
// Driver notification types
{
  newDeliveryRequests: true,      // New delivery opportunities
  earningsUpdates: true,          // Payment and earnings notifications
  scheduleChanges: true,          // Delivery schedule modifications
  systemAnnouncements: true,      // Platform updates
  trainingReminders: true,        // Certification renewals
  weatherAlerts: true,           // Safety-related weather warnings
  // Communication channels
  emailNotifications: true,
  smsNotifications: true,
  pushNotifications: true,
  inAppNotifications: true
}
```

### Driver Privacy & Security

- **Required Location Sharing**: Mandatory for delivery tracking and customer updates
- **Earnings Data Control**: Option to share/restrict earnings analytics
- **Profile Visibility**: Control customer access to driver information
- **Rating Transparency**: Manage visibility of ratings and reviews

## 🗄️ Enhanced Database Schema

### Driver-Specific Tables

- **`driver_notifications`**: Comprehensive notification management for drivers
- **`notification_preferences`**: User-specific notification settings by type
- **`driver_working_hours`**: Configurable working schedule per driver
- **`driver_profiles`**: Extended driver information and certification status

### Notification Management Functions

```sql
-- Send targeted driver notifications
SELECT send_driver_notification(
  driver_id, 'new_delivery_request',
  'New Delivery Available', 'Pickup from Kingston High Street',
  'high', order_id, metadata, 2  -- expires in 2 hours
);

-- Mark notifications as read
SELECT mark_notifications_read(driver_id, notification_ids);

-- Clean up expired notifications
SELECT cleanup_expired_notifications();
```
