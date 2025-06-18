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
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import OrderConfirmation from "./pages/OrderConfirmation";
import Tracking from "./pages/Tracking";
import PlaceholderPage from "./pages/PlaceholderPage";
import NotFound from "./pages/NotFound";

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
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/customer-dashboard" element={<CustomerDashboard />} />
          <Route path="/driver-dashboard" element={<DriverDashboard />} />
          <Route path="/driver-profile" element={<DriverProfile />} />
          <Route path="/settings" element={<AccountSettings />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/tracking/:orderId" element={<Tracking />} />

          {/* Placeholder routes */}
          <Route
            path="/pricing"
            element={
              <PlaceholderPage
                title="Pricing"
                description="Pricing information will be available soon."
              />
            }
          />
          <Route
            path="/track"
            element={
              <PlaceholderPage
                title="Track Package"
                description="Enter your tracking number to track any package."
              />
            }
          />
          <Route
            path="/driver"
            element={
              <PlaceholderPage
                title="Become a Driver"
                description="Join our driver network and start earning."
              />
            }
          />
          <Route
            path="/support"
            element={
              <PlaceholderPage
                title="Support"
                description="Get help with your delivery questions."
              />
            }
          />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
