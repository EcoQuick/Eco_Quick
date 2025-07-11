import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotificationSystem from "./components/NotificationSystem";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import CustomerDashboard from "./pages/CustomerDashboard";
import DriverDashboard from "./pages/DriverDashboard";
import DriverProfile from "./pages/DriverProfile";
import AccountSettings from "./pages/AccountSettings";
import AdminDashboard from "./pages/AdminDashboard";
import ForgotPassword from "./pages/ForgotPassword";
import DriverSignup from "./pages/DriverSignup";
import DriverCertification from "./pages/DriverCertification";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import OrderConfirmation from "./pages/OrderConfirmation";
import Tracking from "./pages/Tracking";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import CookiePolicy from "./pages/CookiePolicy";
import HelpCenter from "./pages/HelpCenter";
import ContactUs from "./pages/ContactUs";
import Pricing from "./pages/Pricing";
import PlaceholderPage from "./pages/PlaceholderPage";
import NotFound from "./pages/NotFound";
import AboutUs from "./pages/AboutUs";
import BusinessSolutions from "./pages/BusinessSolutions";
import ApiDocs from "./pages/ApiDocs";
import Careers from "./pages/Careers";
import Blog from "./pages/Blog";
import PartnerProgram from "./pages/PartnerProgram";
import Security from "./pages/Security";
import InsuranceClaims from "./pages/InsuranceClaims";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <NotificationSystem />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/driver/signup" element={<DriverSignup />} />
          <Route
            path="/driver/certification"
            element={<DriverCertification />}
          />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/customer-dashboard" element={<CustomerDashboard />} />
          <Route path="/driver-dashboard" element={<DriverDashboard />} />
          <Route path="/driver-profile" element={<DriverProfile />} />
          <Route path="/settings" element={<AccountSettings />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/tracking/:orderId" element={<Tracking />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/cookies" element={<CookiePolicy />} />
          <Route path="/help" element={<HelpCenter />} />
          <Route path="/contact" element={<ContactUs />} />

          {/* New Pages */}
          <Route path="/about" element={<AboutUs />} />
          <Route path="/business" element={<BusinessSolutions />} />
          <Route path="/api-docs" element={<ApiDocs />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/partners" element={<PartnerProgram />} />
          <Route path="/security" element={<Security />} />
          <Route path="/insurance-claims" element={<InsuranceClaims />} />

          {/* Placeholder routes */}
          <Route path="/pricing" element={<Pricing />} />
          <Route
            path="/track"
            element={
              <PlaceholderPage
                title="Track Any Package"
                description="Enter your tracking number to track any package. This feature will connect to our tracking system."
              />
            }
          />
          <Route
            path="/driver"
            element={
              <PlaceholderPage
                title="Become a Driver"
                description="Join our driver network and start earning. Click the button below to get started!"
              />
            }
          />
          <Route
            path="/driver/requirements"
            element={
              <PlaceholderPage
                title="Driver Requirements"
                description="Learn about the requirements to become an EcoQuick driver."
              />
            }
          />
          <Route
            path="/driver/earnings"
            element={
              <PlaceholderPage
                title="Driver Earnings"
                description="Discover how much you can earn as an EcoQuick driver."
              />
            }
          />
          <Route
            path="/driver/support"
            element={
              <PlaceholderPage
                title="Driver Support"
                description="Get help and support specifically for drivers."
              />
            }
          />
          <Route path="/support" element={<ContactUs />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
